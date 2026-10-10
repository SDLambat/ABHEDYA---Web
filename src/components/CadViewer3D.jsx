import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Sliders,
  Box,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

const MODEL_PATH = '/models/cad/Qudraped/glb/Quadruped_Assembly_draco.glb';

// Explosive displacement vectors in native assembly coordinate space
const SUBASSEMBLY_EXPLODE_VECTORS = {
  Main_Bodystep: [0, 0, 0.06],
  Front_Bodystep: [0, 0.18, 0.02],
  Back_Bodystep: [0, -0.18, 0.02],
  Leg_Front_Leftstep: [-0.15, 0.09, -0.05],
  Leg_Front_Rightstep: [0.15, 0.09, -0.05],
  Leg_Back_Leftstep: [-0.15, -0.09, -0.05],
  Leg_Back_Rightstep: [0.15, -0.09, -0.05],
};

const DEFAULT_CAMERA_POS = [0.46, 0.32, 0.52];
const DEFAULT_TARGET = [0, 0.11, 0];

export default function CadViewer3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // States
  const [viewMode, setViewMode] = useState('assembly'); // 'assembly' | 'exploded'
  const [explodeFactor, setExplodeFactor] = useState(0.5);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadingState, setLoadingState] = useState({
    isLoading: true,
    progress: 0,
    loadedMB: 0,
    totalMB: 0,
    error: null,
  });

  // Three.js instance refs
  const threeRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    modelRoot: null,
    subassemblies: new Map(), // name -> { object, originalPos: Vector3 }
    animFrameId: null,
  });

  // Initialize Scene, Camera, Lighting, Controls
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 580;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0b0f17');

    // CAMERA
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.02, 50);
    camera.position.set(...DEFAULT_CAMERA_POS);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 0.15;
    controls.maxDistance = 2.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.08; // Allow viewing slightly from below ground
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
    controls.target.set(...DEFAULT_TARGET);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(0.8, 1.2, 0.9);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 4;
    keyLight.shadow.camera.left = -0.5;
    keyLight.shadow.camera.right = 0.5;
    keyLight.shadow.camera.top = 0.5;
    keyLight.shadow.camera.bottom = -0.5;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Fill Light (Warm golden reflection)
    const fillLight = new THREE.DirectionalLight(0xfef08a, 1.0);
    fillLight.position.set(-0.8, -0.2, -0.8);
    scene.add(fillLight);

    // Rim Light (Cyan metallic edge highlight)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(0, 0.8, -1.0);
    scene.add(rimLight);

    // Ground Grid Helper
    const grid = new THREE.GridHelper(1.6, 32, 0xf59e0b, 0x1e293b);
    grid.position.y = 0;
    scene.add(grid);

    threeRef.current = {
      scene,
      camera,
      renderer,
      controls,
      modelRoot: null,
      subassemblies: new Map(),
      animFrameId: null,
    };

    // Render loop
    const animate = () => {
      threeRef.current.animFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handling
    let resizeFrameId = null;
    const handleResize = () => {
      if (resizeFrameId) cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      });
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      if (resizeFrameId) cancelAnimationFrame(resizeFrameId);
      cancelAnimationFrame(threeRef.current.animFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  // Load GLB Model
  const loadModel = () => {
    const { scene } = threeRef.current;
    if (!scene) return;

    setLoadingState({
      isLoading: true,
      progress: 0,
      loadedMB: 0,
      totalMB: 0,
      error: null,
    });

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      MODEL_PATH,
      (gltf) => {
        const root = gltf.scene;

        // Rotate so that Z-up CAD model is Y-up in Three.js
        root.rotation.x = -Math.PI / 2;
        root.updateMatrixWorld(true);

        // Compute bounding box after rotation to align ground plane and center
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());

        // Offset root so bottom feet rest directly on y = 0 and centered horizontally
        root.position.x = -center.x;
        root.position.z = -center.z;
        root.position.y = -box.min.y;

        // Traverse meshes, enable shadows, tune PBR materials
        root.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child.material) {
              child.material = child.material.clone();
              const name = (child.name || '').toLowerCase();
              const parentName = (child.parent?.name || '').toLowerCase();

              if (
                name.includes('screw') ||
                name.includes('iso') ||
                name.includes('standoff') ||
                name.includes('ball_bearing') ||
                name.includes('6800') ||
                name.includes('insert')
              ) {
                // Precision stainless steel / brass hardware
                child.material.metalness = 0.85;
                child.material.roughness = 0.22;
              } else if (name.includes('servo') || parentName.includes('servo')) {
                // High-torque digital servomotors
                child.material.metalness = 0.35;
                child.material.roughness = 0.35;
              } else if (name.includes('foot') || parentName.includes('foot')) {
                // High traction TPU ground dampers
                child.material.metalness = 0.1;
                child.material.roughness = 0.7;
              } else {
                // Lightweight composite plates & chassis
                child.material.metalness = 0.3;
                child.material.roughness = 0.38;
              }
            }
          }
        });

        // Cache subassembly references and their baseline positions
        const subMap = new Map();
        const stepRoot = root.getObjectByName('Quadruped_Assembly_STEPstep') || root;

        Object.keys(SUBASSEMBLY_EXPLODE_VECTORS).forEach((subName) => {
          const subObj = stepRoot.getObjectByName(subName);
          if (subObj) {
            subMap.set(subName, {
              object: subObj,
              originalPos: subObj.position.clone(),
            });
          }
        });

        scene.add(root);

        threeRef.current.modelRoot = root;
        threeRef.current.subassemblies = subMap;

        setLoadingState({
          isLoading: false,
          progress: 100,
          loadedMB: 28.3,
          totalMB: 28.3,
          error: null,
        });

        dracoLoader.dispose();
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          const loadedMB = +(xhr.loaded / (1024 * 1024)).toFixed(1);
          const totalMB = +(xhr.total / (1024 * 1024)).toFixed(1);
          const percent = Math.min(100, Math.round((xhr.loaded / xhr.total) * 100));
          setLoadingState((prev) => ({
            ...prev,
            progress: percent,
            loadedMB,
            totalMB,
          }));
        } else if (xhr.loaded > 0) {
          const loadedMB = +(xhr.loaded / (1024 * 1024)).toFixed(1);
          const percent = Math.min(99, Math.round((loadedMB / 28.3) * 100));
          setLoadingState((prev) => ({
            ...prev,
            progress: percent,
            loadedMB,
            totalMB: 28.3,
          }));
        }
      },
      (err) => {
        console.error('Failed to load GLB quadruped model:', err);
        const detail = err?.message || 'Network or parser error';
        setLoadingState({
          isLoading: false,
          progress: 0,
          loadedMB: 0,
          totalMB: 0,
          error: `Failed to load 3D CAD model file (${detail}). Please check connection and retry.`,
        });
      }
    );
  };

  useEffect(() => {
    loadModel();
    return () => {
      const { modelRoot, scene } = threeRef.current;
      if (modelRoot && scene) {
        scene.remove(modelRoot);
        modelRoot.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m?.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      }
    };
  }, []);

  // Update Exploded vs Assembly View
  useEffect(() => {
    const { subassemblies } = threeRef.current;
    if (!subassemblies || subassemblies.size === 0) return;

    if (viewMode === 'exploded') {
      subassemblies.forEach(({ object, originalPos }, name) => {
        const explodeDir = SUBASSEMBLY_EXPLODE_VECTORS[name] || [0, 0, 0];
        object.position.set(
          originalPos.x + explodeDir[0] * explodeFactor,
          originalPos.y + explodeDir[1] * explodeFactor,
          originalPos.z + explodeDir[2] * explodeFactor
        );
      });
    } else {
      // Revert to pristine assembled positions
      subassemblies.forEach(({ object, originalPos }) => {
        object.position.copy(originalPos);
      });
    }
  }, [viewMode, explodeFactor]);

  // Update Auto-Rotate
  useEffect(() => {
    if (threeRef.current.controls) {
      threeRef.current.controls.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Reset Camera View
  const resetCamera = () => {
    const { camera, controls } = threeRef.current;
    if (!camera || !controls) return;
    camera.position.set(...DEFAULT_CAMERA_POS);
    controls.target.set(...DEFAULT_TARGET);
    controls.update();
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-[#0b0f17] text-white shadow-xl flex flex-col transition-all ${
        isFullscreen ? 'h-screen w-screen rounded-none' : 'h-[520px] sm:h-[600px] lg:h-[660px]'
      }`}
    >
      {/* PROFESSIONAL MINIMAL HEADER */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 z-10">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25">
            <Box className="w-4 h-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-100">
            Interactive 3D CAD Model
          </span>
        </div>

        {/* ONLY 2 VIEW MODES: ASSEMBLED & EXPLODED VIEW */}
        <div className="flex items-center bg-slate-800/80 p-0.5 rounded-xl border border-slate-700/70 text-xs">
          <button
            type="button"
            onClick={() => setViewMode('assembly')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              viewMode === 'assembly'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Assembled
          </button>
          <button
            type="button"
            onClick={() => setViewMode('exploded')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              viewMode === 'exploded'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Exploded View
          </button>
        </div>

        {/* ESSENTIAL CONTROLS: AUTO-ROTATE, RESET CAMERA, FULLSCREEN */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              autoRotate
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={resetCamera}
            title="Reset Camera View"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:text-white transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3D CANVAS VIEWPORT */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

        {/* LOADING OVERLAY WITH PROGRESS BAR */}
        {loadingState.isLoading && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 z-20 pointer-events-none">
            <div className="w-full max-w-sm flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-amber-500/30 border-t-amber-400 rounded-full animate-spin" />
              <div className="text-center space-y-1">
                <p className="text-sm font-semibold text-slate-200">
                  Loading Quadruped CAD Assembly
                </p>
                <p className="text-xs text-slate-400">
                  {loadingState.progress >= 100
                    ? 'Rendering and positioning 520 CAD components...'
                    : loadingState.totalMB > 0
                    ? `${loadingState.loadedMB} MB / ${loadingState.totalMB} MB (${loadingState.progress}%)`
                    : 'Parsing mechanical components...'}
                </p>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-200 ease-out"
                  style={{ width: `${Math.max(4, loadingState.progress)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ERROR STATE OVERLAY */}
        {loadingState.error && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-6 z-20 text-center gap-3">
            <AlertCircle className="w-8 h-8 text-rose-400" />
            <p className="text-sm text-rose-300 max-w-md">{loadingState.error}</p>
            <button
              type="button"
              onClick={loadModel}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Loading
            </button>
          </div>
        )}

        {/* EXPLODE DISTANCE SLIDER (ONLY IN EXPLODED VIEW) */}
        {!loadingState.isLoading && viewMode === 'exploded' && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-72 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 z-10 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Explode Distance
              </span>
              <span className="font-mono text-amber-400">{Math.round(explodeFactor * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodeFactor}
              onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}

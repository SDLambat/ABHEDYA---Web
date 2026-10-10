import React from 'react';
import {
  Activity,
  Shield,
  ExternalLink,
} from 'lucide-react';
import PageHeader, { Reveal } from '../components/PageHeader';
import CadViewer3D from '../components/CadViewer3D';
import { SIH } from '../config/site';

// Public assets served from /models/cad/
const cadRenderIsometric = '/models/cad/Quadruped_Assembly_Final_2021-Nov-13_02-47-56PM-000_CustomizedView8868019943_png.png';
const cadRenderSide = '/models/cad/Quadruped_Assembly_Final_2021-Nov-13_02-48-26PM-000_CustomizedView377387ggggg3239_png.png';
const cadRenderTop = '/models/cad/Quadruped_Assembly_Final_2021-Nov-13_03-01-22PM-000_CustomizedView4040064277_png.png';
const cadRenderFront = '/models/cad/Quadruped_Assembly_Final_2021-Nov-13_03-02-40PM-000_CustomizedView13845978548_png.png';
const wireDiagram = '/models/cad/Wire_Diagram/Wire_Diagram.png';
const photoBuild1 = '/models/cad/P1010463.JPG';
const photoBuild2 = '/models/cad/P1010458.JPG';
const photoBuild3 = '/models/cad/P1010449.JPG';

const KINEMATICS_SPECS = [
  { label: 'Degrees of Freedom', val: '12 DOF (3 DOF / leg)', desc: 'Hip Yaw, Hip Pitch, Knee Pitch for omnidirectional agility' },
  { label: 'Primary Servos', val: '12× SPT5435LV (35 kg·cm)', desc: 'High-torque metal gear digital servos @ 6.0V - 7.4V' },
  { label: 'Payload Capacity', val: '1.2 kg Nominal', desc: 'Sufficient to carry the miniaturized Raman optical probe' },
  { label: 'Power Supply', val: '2S 2200 mAh LiPo (7.4V)', desc: 'Dedicated 5V / 15A step-down buck converter for servo bus' },
  { label: 'Microcontroller', val: 'ESP32 Dual-Core (240 MHz)', desc: 'Real-time gait inverse kinematics calculation & telemetry' },
  { label: 'PWM Expander', val: 'PCA9685 (16-channel, 12-bit)', desc: 'I2C communication offloading pulse generation from CPU' },
  { label: 'Bearings', val: '16× 6800 Sealed (10×19×7 mm)', desc: 'Deep-groove & thrust ball bearings at each high-stress pivot' },
  { label: 'Structural Material', val: 'Carbon Fiber + PETG / TPU', desc: 'Rigid composite base plates with impact-resistant housings' },
];

export default function CadPage() {
  return (
    <div className="space-y-12 sm:space-y-16 max-w-6xl mx-auto pb-12">
      {/* PAGE HEADER */}
      <PageHeader title="CAD Module — Quadruped Robot">
        Mechanical 3D model, engineering blueprints, kinematics, and hardware fabrication gallery for the <strong>ABHEDYA</strong> quadruped inspection platform ({SIH.problemId}).
      </PageHeader>

      {/* 3D INTERACTIVE VIEWER */}
      <Reveal className="space-y-4">
        <CadViewer3D />
      </Reveal>

      {/* BLUEPRINTS & BUILD GALLERY SECTION (DIRECTLY BELOW 3D VIEWER) */}
      <Reveal className="space-y-10 border-t border-gray-200 pt-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">Blueprints & Build Gallery</h2>
          <p className="text-sm text-gray-600 mt-1">
            Official engineering drawings, circuit wiring schematics, and prototype build photographs.
          </p>
        </div>

        {/* CAD ENGINEERING VIEWS */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-950">Engineering Blueprints & CAD Renders</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Isometric Assembly', img: cadRenderIsometric },
              { title: 'Side Elevation View', img: cadRenderSide },
              { title: 'Top Plan View', img: cadRenderTop },
              { title: 'Front View', img: cadRenderFront },
            ].map((render) => (
              <div
                key={render.title}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs group"
              >
                <div className="aspect-4/3 bg-slate-900 overflow-hidden flex items-center justify-center">
                  <img
                    src={render.img}
                    alt={render.title}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-900">{render.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WIRING DIAGRAM */}
        <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-950">Electronics & Servomotor Wiring Schematic</h3>
              <p className="text-xs text-gray-600">
                Interfacing ESP32, PCA9685 16-channel servo driver, buck converter, and LiPo battery.
              </p>
            </div>
            <a
              href={wireDiagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>View Fullscreen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-slate-950 flex items-center justify-center p-2">
            <img
              src={wireDiagram}
              alt="Quadruped electronics wiring diagram"
              loading="lazy"
              className="max-h-[460px] w-auto object-contain"
            />
          </div>
        </div>

        {/* PHYSICAL PROTOTYPE BUILD PHOTOS */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-950">Hardware Fabrication Gallery</h3>
          <p className="text-xs text-gray-600">
            Physical photographs of the 3D-printed chassis components, electronics bay, and leg linkage assemblies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Chassis & Leg Linkage Integration', img: photoBuild1 },
              { title: 'Internal Electronics & Battery Bay', img: photoBuild2 },
              { title: 'Full Hardware Assembly Test', img: photoBuild3 },
            ].map((photo) => (
              <div
                key={photo.title}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs group"
              >
                <div className="aspect-4/3 bg-slate-900 overflow-hidden flex items-center justify-center">
                  <img
                    src={photo.img}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-900">{photo.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* KINEMATICS & TECHNICAL SPECIFICATIONS */}
      <Reveal className="space-y-10 border-t border-gray-200 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-4 shadow-xs">
            <div className="flex items-center gap-2.5 text-amber-600">
              <Activity className="w-5 h-5" />
              <h3 className="font-bold text-gray-950 text-lg">Locomotion & Inverse Kinematics</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              The ABHEDYA quadruped utilizes a <strong>symmetric 3-DOF per limb</strong> kinematic structure.
              The hip yaw servo controls heading orientation, while parallel coxa and tibia linkages create a closed
              mechanical vector loop. This architecture allows:
            </p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>Dynamic diagonal trot gait with 50% duty factor for rapid platform transit</li>
              <li>Static crawl gait with continuous 3-point polygon of support across railway tracks</li>
              <li>Pitch and roll body stabilization to hold the Raman probe at fixed standoff distance</li>
              <li>Obstacle step-over height up to 65 mm for railway platform sills</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-4 shadow-xs">
            <div className="flex items-center gap-2.5 text-amber-600">
              <Shield className="w-5 h-5" />
              <h3 className="font-bold text-gray-950 text-lg">Hardware Architecture & Reliability</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              To withstand operational vibration on active railway platforms, structural pivots are reinforced:
            </p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>16 dual-sealed <strong>6800 deep-groove ball bearings</strong> isolate radial servo shaft forces</li>
              <li>High-friction thermoplastic polyurethane (TPU 95A) foot pads dampen shock on ground impact</li>
              <li>M3 brass threaded heat-set inserts ensure threads cannot strip out during maintenance</li>
              <li>Optically isolated 16-channel PCA9685 eliminates microcontroller brownout spikes</li>
            </ul>
          </div>
        </div>

        {/* SPECIFICATIONS TABLE */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-950">Mechanical & Electrical Specifications</h3>
          <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              <div className="divide-y divide-gray-200">
                {KINEMATICS_SPECS.slice(0, 4).map((spec) => (
                  <div key={spec.label} className="p-4 space-y-1">
                    <span className="text-xs text-gray-500 font-medium">{spec.label}</span>
                    <p className="text-sm font-bold text-gray-950 font-mono">{spec.val}</p>
                    <p className="text-xs text-gray-600">{spec.desc}</p>
                  </div>
                ))}
              </div>
              <div className="divide-y divide-gray-200">
                {KINEMATICS_SPECS.slice(4).map((spec) => (
                  <div key={spec.label} className="p-4 space-y-1">
                    <span className="text-xs text-gray-500 font-medium">{spec.label}</span>
                    <p className="text-sm font-bold text-gray-950 font-mono">{spec.val}</p>
                    <p className="text-xs text-gray-600">{spec.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

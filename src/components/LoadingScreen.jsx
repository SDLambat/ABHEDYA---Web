import React, { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png';

const VISIBLE_MS = 700;
const FADE_MS = 250;

export default function LoadingScreen({ onDone }) {
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const tick = setInterval(() => setProgress((p) => (p < 90 ? p + 14 : p)), 90);
    const t1 = setTimeout(() => {
      setProgress(100);
      setFading(true);
    }, VISIBLE_MS);
    const t2 = setTimeout(() => onDone?.(), VISIBLE_MS + FADE_MS);
    return () => { clearInterval(tick); clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity"
      style={{ opacity: fading ? 0 : 1, transitionDuration: `${FADE_MS}ms`, pointerEvents: fading ? 'none' : 'auto' }}
    >
      <img src={logo} alt="ABHEDYA" width="160" height="156" className="w-28 sm:w-36 h-auto object-contain" />
      <div className="mt-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 beam-pulse" />
        <span className="text-sm text-gray-600 tracking-wide">Scanning at 785 nm</span>
      </div>
      <p className="absolute bottom-8 italic text-xs sm:text-sm text-gray-500">The Un-Breachable Shield</p>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-100 overflow-hidden">
        <div className="h-full transition-all duration-200" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#111 0%,#B45309 60%,#FBBF24 100%)' }} />
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, Lightbulb } from 'lucide-react';
import PageHeader, { Reveal } from '../components/PageHeader';
import opticalLayout from '../assets/images/optical-layout.png';
import blockDiagram from '../assets/images/block-diagram.png';
import prototype from '../assets/images/prototype.jpg';

const PRINCIPLE = [
  { title: 'Illuminate', text: 'A 785 nm laser illuminates the suspicious material without touching it.' },
  { title: 'Reject Rayleigh light', text: 'Light that scatters elastically (Rayleigh scattering) is rejected by an edge / long-pass filter.' },
  { title: 'Collect Raman shifts', text: 'A small portion scatters inelastically. Its wavelength shifts match the material\'s molecular vibrations.' },
  { title: 'Disperse', text: 'Collecting optics pass the Raman-shifted light through the spectrometer, which converts it into a Raman spectrum.' },
];

function RamanDiagram() {
  return (
    <svg viewBox="0 0 640 300" className="w-full h-auto" role="img" aria-label="Raman effect: excitation laser hits the sample, Rayleigh light is filtered out, Raman-shifted light reaches the grating and detector">
      <defs>
        <marker id="ar" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1L10 5L0 9z" fill="#B45309" /></marker>
        <marker id="ag" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1L10 5L0 9z" fill="#6B7280" /></marker>
      </defs>
      <text x="20" y="28" fontSize="14" fill="#374151">Excitation laser (785 nm)</text>
      <path d="M50 40 L50 40" stroke="#B45309" />
      <line x1="90" y1="44" x2="90" y2="112" stroke="#B45309" strokeWidth="3" markerEnd="url(#ar)" className="beam-pulse" />
      <circle cx="90" cy="135" r="24" fill="#FEF3C7" stroke="#B45309" strokeWidth="2" />
      <text x="90" y="139" fontSize="11" textAnchor="middle" fill="#451A03">Sample</text>
      {/* Rayleigh */}
      <line x1="114" y1="145" x2="300" y2="145" stroke="#6B7280" strokeWidth="2.5" strokeDasharray="5 4" markerEnd="url(#ag)" />
      <text x="140" y="138" fontSize="12" fill="#6B7280">Rayleigh (same wavelength)</text>
      {/* Raman */}
      <line x1="112" y1="158" x2="420" y2="190" stroke="#B45309" strokeWidth="2.5" markerEnd="url(#ar)" />
      <line x1="112" y1="168" x2="420" y2="218" stroke="#D99B26" strokeWidth="2.5" markerEnd="url(#ar)" />
      <text x="140" y="228" fontSize="12" fill="#92400E">Raman (shifted wavelengths)</text>
      {/* filter */}
      <rect x="300" y="105" width="14" height="140" rx="3" fill="#111" opacity=".85" />
      <text x="307" y="262" fontSize="12" textAnchor="middle" fill="#374151">Edge / long-pass filter</text>
      {/* grating */}
      <rect x="430" y="150" width="14" height="90" rx="3" fill="#D99B26" transform="rotate(20 437 195)" />
      <text x="440" y="262" fontSize="12" textAnchor="middle" fill="#374151">Diffraction grating</text>
      {/* detector */}
      <rect x="560" y="120" width="12" height="130" rx="3" fill="#111" />
      <text x="566" y="112" fontSize="12" textAnchor="middle" fill="#374151">Detector</text>
      <line x1="450" y1="190" x2="556" y2="150" stroke="#B45309" strokeWidth="2" markerEnd="url(#ar)" />
      <line x1="450" y1="200" x2="556" y2="190" stroke="#D99B26" strokeWidth="2" markerEnd="url(#ar)" />
      <line x1="450" y1="210" x2="556" y2="230" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#ar)" />
    </svg>
  );
}

// Illustrative peaks only; not measured data.
function SpectrumSketch() {
  const d = 'M0 150 L40 148 L70 146 L90 110 L100 146 L150 144 L185 60 L195 144 L250 142 L290 96 L300 142 L350 140 L380 120 L390 140 L440 138 L470 40 L482 138 L540 136 L600 134';
  return (
    <svg viewBox="0 0 600 190" className="w-full h-auto" role="img" aria-label="Illustrative Raman spectrum sketch">
      <line x1="0" y1="160" x2="600" y2="160" stroke="#9CA3AF" />
      <line x1="0" y1="10" x2="0" y2="160" stroke="#9CA3AF" />
      <path d={d} fill="none" stroke="#B45309" strokeWidth="2.5" className="spectrum-draw" />
      <text x="300" y="182" fontSize="12" textAnchor="middle" fill="#6B7280">Raman shift</text>
      <text x="8" y="22" fontSize="12" fill="#6B7280">Intensity</text>
    </svg>
  );
}

function Figure({ src, alt, caption, onZoom }) {
  return (
    <figure className="space-y-2">
      <button onClick={() => onZoom({ src, alt })} className="relative w-full rounded-2xl border border-gray-200 bg-white p-3 hover:border-amber-300 hover:shadow-xs cursor-zoom-in group">
        <img src={src} alt={alt} loading="lazy" className="w-full h-auto object-contain rounded-lg" />
        <span className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/90 border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn className="w-4 h-4 text-gray-700" /></span>
      </button>
      <figcaption className="text-sm text-gray-600">{caption}</figcaption>
    </figure>
  );
}

export default function OpticsPage() {
  const [zoom, setZoom] = useState(null);

  return (
    <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto">
      <PageHeader title="Raman Optics & Design">
        How a 785 nm laser, a filter, a grating and a small sensor turn a sealed, untouched sample into a molecular fingerprint.
      </PageHeader>

      <Reveal className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Principle of the Raman effect in ABHEDYA</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-2xs"><RamanDiagram /></div>
          <ol className="space-y-3">
            {PRINCIPLE.map((s, i) => (
              <li key={s.title} className="flex gap-3 p-4 rounded-xl border border-gray-200 bg-white">
                <span className="shrink-0 w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-sans font-bold text-sm flex items-center justify-center">{i + 1}</span>
                <div>
                  <h3 className="font-bold text-gray-950">{s.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6"><SpectrumSketch /></div>
          <div className="space-y-2 text-gray-700">
            <p className="flex items-start gap-2 text-sm"><Lightbulb className="w-4 h-4 mt-1 text-amber-700 shrink-0" /><span>The sketch shows the idea of a spectrum: each peak is a molecular vibration. It is an illustration, not measured data.</span></p>
            <p className="text-base">On the Raspberry Pi the spectrum goes through dark correction, baseline correction, noise reduction and feature extraction. It is then compared with the reference spectral library using PCA and ML analysis.</p>
          </div>
        </div>
      </Reveal>

      <Reveal className="space-y-6 border-t border-gray-200 pt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Optical component layout</h2>
        <Figure src={opticalLayout} alt="Optical component layout: LD module, collimating lens, filter, beam splitter, objective lens, condenser lens, input slit, transmission grating, focus lens and image sensor" onZoom={setZoom}
          caption="Laser diode module, collimating lens and filter feed a beam splitter and objective lens. Returning light passes a second filter, condenser lens and input slit, then a transmission grating and focus lens onto the image sensor." />
      </Reveal>

      <Reveal className="space-y-6 border-t border-gray-200 pt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">System block diagram</h2>
        <div className="max-w-3xl">
          <Figure src={blockDiagram} alt="Block diagram: Raspberry Pi compute, touch screen, laser and TE-cooler control circuit, DC jack, TE-cooled laser diode, lens unit, beam splitter and spectrometer" onZoom={setZoom}
            caption="A 5 V DC supply powers the Raspberry Pi and the laser / TE-cooler control circuit. The TE-cooled laser diode sends excitation light through the lens unit and beam splitter; Raman-scattered light goes to the spectrometer in the main unit." />
        </div>
      </Reveal>

      <Reveal className="space-y-6 border-t border-gray-200 pt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Prototype version</h2>
        <div className="max-w-3xl">
          <Figure src={prototype} alt="ABHEDYA prototype: a vial sample lit by the excitation laser beside the spectrometer" onZoom={setZoom}
            caption="Bench prototype of the self-developed Raman unit, with a liquid sample in a vial in the excitation path." />
        </div>
      </Reveal>

      <AnimatePresence>
        {zoom && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoom(null)}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 cursor-zoom-out" role="dialog" aria-modal="true">
            <button className="absolute top-4 right-4 p-2 rounded-lg bg-white text-gray-900" aria-label="Close image" onClick={() => setZoom(null)}><X className="w-5 h-5" /></button>
            <img src={zoom.src} alt={zoom.alt} className="max-w-full max-h-full object-contain bg-white rounded-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

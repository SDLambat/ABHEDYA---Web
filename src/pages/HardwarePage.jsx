import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Monitor, Zap, Thermometer, Crosshair, Layers, Scan, Aperture, Lightbulb, Grid3x3 } from 'lucide-react';
import PageHeader, { Reveal } from '../components/PageHeader';

const COMPONENTS = [
  { name: 'Raspberry Pi compute module', type: 'Compute', icon: Cpu, role: 'Runs spectral pre-processing, PCA and lightweight ML classification at the edge, and logs every measurement.' },
  { name: 'Touch screen', type: 'Compute', icon: Monitor, role: 'Shows the spectrum and the CLEAR / REPEAT / ESCALATE result to the operator.' },
  { name: 'DC 5 V jack', type: 'Power', icon: Zap, role: 'Single 5 V DC input that powers the compute and laser control circuit.' },
  { name: 'Laser / TE-cooler control circuit', type: 'Power', icon: Thermometer, role: 'Drives the laser diode and regulates its thermoelectric cooler for a stable excitation wavelength.' },
  { name: '785 nm laser diode (TE-cooled)', type: 'Optics', icon: Lightbulb, role: 'Excitation source for the Raman effect.' },
  { name: 'Lens unit and beam splitter', type: 'Optics', icon: Aperture, role: 'Focus excitation light onto the sample and direct the Raman-scattered light back toward the spectrometer.' },
  { name: 'Edge / long-pass filters', type: 'Optics', icon: Layers, role: 'Reject Rayleigh-scattered light at the laser wavelength.' },
  { name: 'Input slit, collimating and focus lenses', type: 'Spectrometer', icon: Crosshair, role: 'Shape and collimate the collected light before and after dispersion.' },
  { name: 'Transmission grating', type: 'Spectrometer', icon: Grid3x3, role: 'Disperses the light by wavelength into a spectrum.' },
  { name: 'Image sensor', type: 'Spectrometer', icon: Scan, role: 'Records the dispersed spectrum for the Raspberry Pi to process.' },
];

const CATS = ['All', 'Compute', 'Power', 'Optics', 'Spectrometer'];

export default function HardwarePage() {
  const [cat, setCat] = useState('All');
  const list = COMPONENTS.filter((c) => cat === 'All' || c.type === cat);

  return (
    <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto">
      <PageHeader title="Components & Block Diagram">
        The parts of the self-developed Raman unit, grouped by the job they do. Part numbers and costs will be added once the bill of materials is final.
      </PageHeader>

      <Reveal className="space-y-6">
        <div role="tablist" aria-label="Filter components" className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={`px-3.5 py-1.5 rounded-lg text-sm cursor-pointer border ${cat === c ? 'bg-gray-950 text-amber-300 border-gray-950' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>
              {c}
            </button>
          ))}
        </div>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {list.map(({ name, type, icon: Icon, role }) => (
              <motion.div layout key={name} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-amber-300 hover:shadow-xs space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-200"><Icon className="w-5 h-5" /></div>
                  <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 border border-gray-200">{type}</span>
                </div>
                <h3 className="font-bold text-gray-950 text-lg">{name}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{role}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Reveal>
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader, { Reveal } from '../components/PageHeader';

const FEASIBILITY = [
  ['Detection', 'Provides 785 nm Raman spectroscopic molecular fingerprints from materials without physical contact.'],
  ['Compact hardware', 'A single portable unit that can also be carried by a mobile quadruped.'],
  ['Edge AI', 'Spectral preprocessing, PCA and lightweight ML classification run locally.'],
  ['Deployment', 'The core can be integrated into a handheld device or a quadruped platform.'],
  ['Cost', 'A custom compact architecture significantly reduces system cost compared with laboratory Raman instruments.'],
  ['Scalability', 'The spectral library and ML model improve with validated real-world field data, enabling periodic retraining and adaptation to new materials and operating conditions.'],
];

const APPROACHES = [
  { approach: 'Contact-based testing', why: 'Simple presumptive testing', limit: 'Physical contact, consumables and sample handling', fix: 'Non-contact Raman screening' },
  { approach: 'LFA / immunoassay strips', why: 'Target-specific presumptive detection', limit: 'Consumables, short shelf life, recurring cost and physical contact', fix: 'Reusable optical sensing architecture' },
  { approach: 'Gas sensor array', why: 'Low-cost, compact embedded sensing', limit: 'Low vapour pressure of many narcotics; diesel / perfume interference', fix: 'Molecular spectral sensing instead of vapour-dependent detection' },
  { approach: 'ATR-FTIR', why: 'Chemically informative molecular spectra', limit: 'Contact and sample constraints', fix: 'Non-contact Raman workflow' },
  { approach: 'AS7265x multispectral sensor', why: 'Low-cost, compact, contactless sensing', limit: 'Broad spectral signatures are less molecularly specific', fix: 'Raman molecular fingerprinting' },
  { approach: 'Field deployment', why: 'Real-world screening capability', limit: 'Changing environmental and sample conditions', fix: 'Calibration checks, REPEAT state, periodic model / library updates' },
  { approach: 'Safety & high-stakes decisions', why: 'Railway security application', limit: 'Laser safety and consequences of incorrect classification', fix: 'Enclosed optical path, interlock, three-phase detection and secondary certified testing' },
];

const VIABILITY = [
  ['Technical', 'Raman spectroscopy principles combined with compact optics, Raspberry Pi processing and lightweight ML.'],
  ['Operational', 'Non-contact screening reduces the need for personnel to handle suspicious materials during initial screening.'],
  ['Economic', 'A custom compact Raman architecture reduces dependence on expensive laboratory-grade instruments and supports reusable sensing.'],
  ['AI & data', 'The spectral library and ML model keep improving with validated real-world field data collected during deployment.'],
  ['Maintenance', 'Optical hardware avoids the recurring consumables of strip-based testing; calibration and software updates can be performed periodically and autonomously.'],
  ['Deployment', 'Raspberry Pi-based edge processing allows spectral analysis and preliminary decisions directly on the device.'],
  ['Decision', 'A three-phase decision separates acceptable, ambiguous and suspicious results rather than forcing every measurement into a binary call.'],
  ['Future scalability', 'Additional validated spectral classes, improved models and enhanced Raman techniques such as SERS can be added later.'],
];

export default function FeasibilityPage() {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto">
      <PageHeader title="Feasibility & Viability">
        Why a Raman-first design is buildable today, and how we got there by testing and rejecting other approaches.
      </PageHeader>

      <Reveal className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Feasibility of ABHEDYA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEASIBILITY.map(([k, v]) => (
            <motion.div key={k} whileHover={{ y: -3 }} className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-amber-300 hover:shadow-xs transition-all">
              <h3 className="font-bold text-lg text-gray-950 border-l-4 border-amber-500 pl-3">{k}</h3>
              <p className="text-sm text-gray-700 leading-relaxed mt-2">{v}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <Reveal className="space-y-6 border-t border-gray-200 pt-12">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Challenges faced and how the approach evolved</h2>
          <p className="text-gray-700">During ideation we considered seven routes. Select one to see why it was tempting, where it fell short, and what ABHEDYA does instead.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div role="tablist" aria-label="Approaches considered" className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto pb-1">
            {APPROACHES.map((a, i) => (
              <button key={a.approach} role="tab" aria-selected={open === i} onClick={() => setOpen(i)}
                className={`text-left shrink-0 px-4 py-2.5 rounded-lg text-sm cursor-pointer border ${open === i ? 'bg-amber-50 border-amber-300 text-amber-950 font-bold' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                {a.approach}
              </button>
            ))}
          </div>
          <motion.div key={open} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} role="tabpanel"
            className="lg:col-span-8 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-950">{APPROACHES[open].approach}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200"><div className="font-bold text-gray-900 mb-1">Why we considered it</div><p className="text-gray-700">{APPROACHES[open].why}</p></div>
              <div className="p-3 rounded-lg bg-red-50/60 border border-red-100"><div className="font-bold text-red-900 mb-1">Key limitation</div><p className="text-gray-700">{APPROACHES[open].limit}</p></div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200"><div className="font-bold text-amber-950 mb-1">ABHEDYA&apos;s mitigation</div><p className="text-gray-900 font-medium">{APPROACHES[open].fix}</p></div>
            </div>
          </motion.div>
        </div>
      </Reveal>

      <Reveal className="space-y-6 border-t border-gray-200 pt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Viability of ABHEDYA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VIABILITY.map(([k, v]) => (
            <div key={k} className="flex gap-4 p-5 rounded-2xl border border-gray-200 bg-white">
              <div className="shrink-0 w-28 font-bold text-gray-950 text-base">{k}</div>
              <p className="text-sm text-gray-700 leading-relaxed">{v}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

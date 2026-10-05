import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Download } from 'lucide-react';
import logo from '../assets/images/logo.png';
import { DOCS, SIH } from '../config/site';

const COL_A = [
  { id: 'overview', label: 'Overview & Vision' },
  { id: 'optics', label: 'Raman Optics & Design' },
  { id: 'workflow', label: 'Detection Workflow' },
  { id: 'feasibility', label: 'Feasibility & Viability' },
];
const COL_B = [
  { id: 'hardware', label: 'Components & Block Diagram' },
  { id: 'impact', label: 'Impact & Benefits' },
  { id: 'docs', label: 'SIH 2026 Submission' },
  { id: 'team', label: 'Team ABHEDYA' },
];

function LinkList({ items, onNavigate, activePage }) {
  return (
    <ul className="space-y-1.5 text-sm">
      {items.map((l) => (
        <li key={l.id}>
          <button
            onClick={() => onNavigate(l.id)}
            className={`text-left cursor-pointer ${activePage === l.id ? 'text-amber-900 font-bold underline' : 'text-gray-700 hover:text-gray-950 hover:underline'}`}
          >
            {l.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function FooterSection({ onNavigate, activePage }) {
  return (
    <footer className="w-full bg-gray-100 border-t-2 border-gray-300 text-gray-900 mt-24 pt-16 pb-12 leading-[1.6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-gray-300">
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <img src={logo} alt="ABHEDYA logo" className="h-12 w-auto object-contain" width="48" height="48" />
              <div>
                <span className="font-bold text-xl text-gray-950 block leading-tight">ABHEDYA</span>
                <span className="text-xs text-amber-900 font-bold">{SIH.problemId} · Team {SIH.teamId}</span>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              A portable, non-contact Raman spectroscopy screening system with edge AI, built for first-level detection of suspicious narcotics and explosives across Indian Railways.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-wider text-amber-900 font-bold block border-b border-gray-300 pb-1">Technology</span>
            <LinkList items={COL_A} onNavigate={onNavigate} activePage={activePage} />
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-wider text-amber-900 font-bold block border-b border-gray-300 pb-1">Project</span>
            <LinkList items={COL_B} onNavigate={onNavigate} activePage={activePage} />
          </div>

          <div className="md:col-span-2 space-y-3">
            <span className="text-xs uppercase tracking-wider text-amber-900 font-bold block border-b border-gray-300 pb-1">Downloads</span>
            <a
              href={DOCS.submissionPath}
              download={DOCS.submissionName}
              className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 hover:border-gray-400 text-xs text-gray-900 flex items-center justify-between shadow-2xs"
            >
              <span>SIH Submission (PDF)</span>
              <Download className="w-3.5 h-3.5 text-amber-800" />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-700">
          <span>© {new Date().getFullYear()} Team ABHEDYA. Smart India Hackathon 2026. ABHEDYA is a screening aid: results are presumptive and must be confirmed by certified techniques.</span>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-200 text-gray-900 text-xs font-bold cursor-pointer shrink-0"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-800" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

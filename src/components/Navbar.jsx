import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, FileText } from 'lucide-react';
import logo from '../assets/images/logo.png';
import { GithubIcon, YoutubeIcon } from './Icons';
import { LINKS, DOCS } from '../config/site';

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'optics', label: 'Optics' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'feasibility', label: 'Feasibility' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'impact', label: 'Impact' },
  { id: 'docs', label: 'Submission' },
  { id: 'team', label: 'Team' },
];

export default function Navbar({ activePage, onNavigate }) {
  const [open, setOpen] = useState(false);
  const go = (id) => { onNavigate(id); setOpen(false); };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => go('overview')}
          className="flex items-center gap-2.5 text-left shrink-0 cursor-pointer group"
        >
          <img src={logo} alt="ABHEDYA logo" className="h-10 w-auto object-contain" width="40" height="40" />
          <div className="flex flex-col">
            <span className="font-bold text-lg sm:text-xl text-gray-900 tracking-tight leading-tight group-hover:text-amber-800 transition-colors">
              ABHEDYA
            </span>
            <span className="text-[11px] text-gray-500 leading-none">The Un-Breachable Shield</span>
          </div>
        </motion.button>

        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {NAV_ITEMS.map((item) => {
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative px-2.5 xl:px-3 py-1.5 rounded-lg text-sm cursor-pointer z-10 ${active ? 'text-amber-950 font-bold' : 'text-gray-600 hover:text-gray-950'}`}
              >
                {active && (
                  <motion.div
                    layoutId="navbarActiveIndicator"
                    className="absolute inset-0 bg-amber-50 rounded-lg border border-amber-300/80 -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {LINKS.git && (
            <a href={LINKS.git} target="_blank" rel="noopener noreferrer" title="ML model Git repository"
               className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 flex items-center justify-center">
              <GithubIcon />
            </a>
          )}
          {LINKS.video && (
            <a href={LINKS.video} target="_blank" rel="noopener noreferrer" title="Watch the explanation video"
               className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 flex items-center justify-center">
              <YoutubeIcon />
            </a>
          )}
          <a
            href={DOCS.submissionPath}
            download={DOCS.submissionName}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gray-950 hover:bg-black text-amber-300 text-xs font-semibold shadow-xs"
            title="Download the SIH 2026 submission (PDF)"
          >
            <span>Submission PDF</span>
            <Download className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="p-1.5 text-gray-700 hover:text-gray-900 lg:hidden cursor-pointer rounded-lg hover:bg-gray-100"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-2 overflow-hidden shadow-lg"
          >
            {NAV_ITEMS.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.2 }}
                onClick={() => go(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-base ${activePage === item.id ? 'bg-amber-50 text-amber-900 font-bold border border-amber-300' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {item.label}
              </motion.button>
            ))}
            <div className="pt-3 border-t border-gray-100">
              <a href={DOCS.submissionPath} download={DOCS.submissionName}
                 className="py-2.5 px-3 rounded-lg bg-gray-950 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Download submission PDF</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

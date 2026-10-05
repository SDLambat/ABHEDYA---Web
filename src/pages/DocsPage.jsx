import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import PageHeader, { Reveal } from '../components/PageHeader';
import { LINKS, DOCS, SIH } from '../config/site';

import s1 from '../assets/slides/slide-1.jpg';
import s2 from '../assets/slides/slide-2.jpg';
import s3 from '../assets/slides/slide-3.jpg';
import s4 from '../assets/slides/slide-4.jpg';
import s5 from '../assets/slides/slide-5.jpg';

const SLIDES = [
  { src: s1, title: 'Cover' },
  { src: s2, title: 'Proposed solution' },
  { src: s3, title: 'Technical approach' },
  { src: s4, title: 'Feasibility and viability' },
  { src: s5, title: 'Impact and benefits' },
];

export default function DocsPage() {
  const [i, setI] = useState(0);
  const go = (n) => setI((n + SLIDES.length) % SLIDES.length);
  const extra = [
    ['Website', null], ['CAD module', LINKS.cad], ['Detailed workflow', LINKS.workflow], ['Report', LINKS.report], ['Explanation video', LINKS.video], ['ML model Git repo', LINKS.git],
  ].filter(([, url]) => url);

  return (
    <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto">
      <PageHeader title="SIH 2026 Submission">
        The official slide deck for {SIH.problemId}. Read it here slide by slide, or download the PDF.
      </PageHeader>

      <Reveal className="space-y-5">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-2 sm:p-4 shadow-xs">
          <AnimatePresence mode="wait">
            <motion.img key={i} src={SLIDES[i].src} alt={`Slide ${i + 1}: ${SLIDES[i].title}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              className="w-full h-auto rounded-lg border border-gray-200 bg-white" />
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button onClick={() => go(i - 1)} aria-label="Previous slide" className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 cursor-pointer"><ChevronLeft className="w-5 h-5" /></button>
          <span className="text-sm text-gray-700">Slide {i + 1} of {SLIDES.length}: <strong>{SLIDES[i].title}</strong></span>
          <button onClick={() => go(i + 1)} aria-label="Next slide" className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 cursor-pointer"><ChevronRight className="w-5 h-5" /></button>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {SLIDES.map((s, n) => (
            <button key={s.title} onClick={() => setI(n)} aria-label={`Go to slide ${n + 1}: ${s.title}`}
              className={`rounded-md overflow-hidden border-2 cursor-pointer ${n === i ? 'border-amber-500' : 'border-gray-200 hover:border-gray-400'}`}>
              <img src={s.src} alt="" loading="lazy" className="w-full h-auto" />
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-12">
        <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-3">
          <h2 className="text-xl font-bold text-gray-950">Download</h2>
          <p className="text-sm text-gray-700">Full submission deck, exactly as submitted.</p>
          <a href={DOCS.submissionPath} download={DOCS.submissionName} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-950 hover:bg-black text-amber-300 text-sm shadow-xs">
            <Download className="w-4 h-4" /><span>Submission PDF</span>
          </a>
        </div>
        <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-3">
          <h2 className="text-xl font-bold text-gray-950">Problem statement</h2>
          <dl className="text-sm text-gray-700 space-y-1">
            <div className="flex gap-2"><dt className="font-bold w-24 shrink-0">ID</dt><dd>{SIH.problemId}</dd></div>
            <div className="flex gap-2"><dt className="font-bold w-24 shrink-0">Title</dt><dd>{SIH.title}</dd></div>
            <div className="flex gap-2"><dt className="font-bold w-24 shrink-0">Theme</dt><dd>{SIH.theme}</dd></div>
            <div className="flex gap-2"><dt className="font-bold w-24 shrink-0">Category</dt><dd>{SIH.category}</dd></div>
          </dl>
        </div>
      </Reveal>

      {extra.length > 0 && (
        <Reveal className="space-y-3">
          <h2 className="text-xl font-bold text-gray-950">More resources</h2>
          <div className="flex flex-wrap gap-3">
            {extra.map(([label, url]) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-sm">
                <span>{label}</span><ExternalLink className="w-3.5 h-3.5 text-amber-800" />
              </a>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, Download, ScanLine, Fingerprint, ShieldQuestion, CheckCircle2, XCircle } from 'lucide-react';
import logo from '../assets/images/logo.png';
import handheld from '../assets/images/handheld.png';
import quadruped from '../assets/images/quadruped.png';
import { Reveal } from '../components/PageHeader';
import { GithubIcon, YoutubeIcon } from '../components/Icons';
import { LINKS, DOCS, SIH } from '../config/site';

const PROBLEMS = [
  { problem: 'Expensive analytical equipment', response: 'A low-cost, compact Raman architecture brings molecular-level screening closer to the point of inspection.' },
  { problem: 'Manual inspection', response: 'Non-contact optical measurement allows preliminary screening without physically handling the suspected substance.' },
  { problem: 'Environmental variability and interference', response: 'Controlled optical acquisition, background subtraction, preprocessing and reference libraries help separate useful spectral information from interference.' },
  { problem: 'Limited physical coverage', response: 'Handheld and quadruped deployment lets the same Raman sensing and ML pipeline serve different inspection scenarios.' },
  { problem: 'Lack of traceability', response: 'The spectrum, classification, confidence, timestamp and measurement metadata are logged digitally, creating an auditable screening record.' },
];

const COMPARISON = [
  ['Laboratory spectroscopy', 'Expensive and centralized', 'Low-cost portable Raman architecture'],
  ['Commercial Raman', 'Higher acquisition cost', 'Self-developed Raman prototype'],
  ['Visual inspection', 'No molecular information', 'Molecular fingerprint classification'],
  ['Simple sensor thresholds', 'Limited vapour pressure information', 'Spectrum and chemometrics / ML'],
  ['Forced binary classification', 'Poor readings may be misclassified', 'Three-phase verification'],
  ['Fixed systems', 'Limited physical coverage', 'Handheld and quadruped deployment'],
  ['Manual records', 'Limited measurement traceability', 'Digital metadata logging'],
  ['Screening treated as final result', 'Risk of overclaiming', 'ESCALATE to certified confirmation'],
];

const SOLUTION = [
  { icon: ScanLine, title: 'Non-contact Raman', text: 'A 785 nm laser illuminates the material and the scattered light is read as a spectrum, so nobody has to touch or open the suspect item.' },
  { icon: Fingerprint, title: 'Molecular fingerprinting', text: 'Raman shifts correspond to molecular vibrations. Each material leaves a chemically informative signature instead of a vapour or colour reading.' },
  { icon: ShieldQuestion, title: 'Uncertainty-aware decisions', text: 'CLEAR, REPEAT or ESCALATE. Ambiguous readings are never forced into a yes/no answer.' },
];

export default function OverviewPage({ onNavigate }) {
  const [form, setForm] = useState('handheld');
  const forms = {
    handheld: { img: handheld, label: 'Handheld unit', note: 'Screening at checkpoints, coaches and luggage racks.' },
    quadruped: { img: quadruped, label: 'Quadruped robot', note: 'Extends inspection reach while reducing the need for a close approach.' },
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 sm:space-y-24 pt-1 sm:pt-3 pb-12 text-gray-900 leading-[1.6]">
      {/* HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <img src={logo} alt="ABHEDYA" className="h-20 sm:h-24 w-auto object-contain" width="96" height="96" fetchPriority="high" />
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight text-gray-950 leading-[1.18]">What is ABHEDYA?</h1>
          <p className="text-base sm:text-lg text-gray-800 leading-[1.65]">
            <strong>ABHEDYA</strong> is a portable, non-contact <strong>Raman spectroscopy</strong> screening system for rapid, first-level detection of suspicious narcotic and explosive materials in railway environments. A self-developed Raman sensing unit and a Raspberry Pi acquire and process the spectrum, and PCA plus machine learning compare it with a reference spectral library.
          </p>
          <p className="text-sm text-gray-600 italic">Problem statement {SIH.problemId} · Smart India Hackathon 2026</p>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => onNavigate('optics')}
              className="px-4 py-2.5 rounded-lg bg-gray-950 hover:bg-black text-amber-300 text-sm flex items-center gap-2 cursor-pointer shadow-xs">
              <span>Raman Optics</span><ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => onNavigate('workflow')}
              className="px-3.5 py-2.5 rounded-lg bg-white hover:bg-gray-50 text-gray-900 text-sm border border-gray-300 cursor-pointer">
              How It Works
            </motion.button>
            {LINKS.git && (
              <a href={LINKS.git} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm border border-gray-300 flex items-center gap-1.5">
                <GithubIcon /><span>ML Repo</span>
              </a>
            )}
            {LINKS.video && (
              <a href={LINKS.video} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-sm border border-red-200 flex items-center gap-1.5">
                <YoutubeIcon className="w-4 h-4 text-red-600" /><span>Watch Video</span>
              </a>
            )}
            <a href={DOCS.submissionPath} download={DOCS.submissionName} className="px-3.5 py-2.5 rounded-lg bg-white hover:bg-gray-50 text-gray-900 text-sm border border-gray-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-700" /><span>Submission PDF</span>
            </a>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-6">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden shadow-xs h-[380px] sm:h-[430px] w-full relative flex flex-col">
            <div className="flex gap-1 p-2 border-b border-gray-200 bg-white">
              {Object.entries(forms).map(([key, f]) => (
                <button key={key} onClick={() => setForm(key)} aria-pressed={form === key}
                  className={`flex-1 px-3 py-1.5 rounded-lg text-sm cursor-pointer ${form === key ? 'bg-amber-50 text-amber-950 font-bold border border-amber-300' : 'text-gray-600 hover:bg-gray-100 border border-transparent'}`}>
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex-1 flex items-center justify-center p-4 min-h-0">
              <AnimatePresence mode="wait">
                <motion.img key={form} src={forms[form].img} alt={forms[form].label}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                  className="max-h-full max-w-full object-contain" />
              </AnimatePresence>
            </div>
            <p className="px-4 pb-3 text-center text-sm text-gray-600">{forms[form].note}</p>
          </div>
        </motion.div>
      </section>

      {/* PROBLEM -> RESPONSE */}
      <Reveal className="space-y-6 border-t border-gray-200 pt-12 sm:pt-16">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-950">The Problem: Why Screening Needs to Change</h2>
          <p className="text-base sm:text-lg text-gray-700">Detecting narcotics and explosives on a busy railway network today depends on costly lab equipment, manual handling and paper records. Each gap has a direct answer in ABHEDYA.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROBLEMS.map((p, i) => (
            <motion.div key={p.problem} whileHover={{ y: -3 }}
              className={`p-6 rounded-2xl border border-gray-200 bg-white hover:border-amber-300 hover:shadow-xs transition-all space-y-2.5 ${i === PROBLEMS.length - 1 ? 'md:col-span-2' : ''}`}>
              <div className="text-xs font-sans font-semibold text-red-800 bg-red-50 border border-red-100 inline-block px-2 py-0.5 rounded-md">Existing problem</div>
              <h3 className="text-lg font-bold text-gray-950">{p.problem}</h3>
              <div className="text-xs font-sans font-semibold text-amber-900 bg-amber-50 border border-amber-200 inline-block px-2 py-0.5 rounded-md">ABHEDYA&apos;s response</div>
              <p className="text-sm text-gray-700 leading-relaxed">{p.response}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* SOLUTION */}
      <Reveal className="space-y-6 border-t border-gray-200 pt-12 sm:pt-16">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-950">The Solution: A Raman-First Screening Shield</h2>
          <p className="text-base sm:text-lg text-gray-700">ABHEDYA combines molecular fingerprinting, contactless sensing, machine-learning analysis and three-phase decisions in a low-cost, portable unit.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {SOLUTION.map(({ icon: Icon, title, text }) => (
            <motion.div key={title} whileHover={{ y: -3 }} className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-amber-300 hover:shadow-xs transition-all space-y-2.5">
              <div className="p-2 w-fit rounded-lg bg-amber-50 text-amber-800 border border-amber-200"><Icon className="w-5 h-5" /></div>
              <h3 className="text-lg font-bold text-gray-950">{title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* COMPARISON */}
      <Reveal className="space-y-6 border-t border-gray-200 pt-12 sm:pt-16">
        <div className="space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-950">Existing Approaches vs. ABHEDYA</h2>
          <p className="text-base sm:text-lg text-gray-700">Where current methods fall short, and what ABHEDYA does differently.</p>
        </div>

        <div className="md:hidden space-y-4">
          {COMPARISON.map(([a, l, b]) => (
            <div key={a} className="p-4 rounded-xl border border-gray-200 bg-white space-y-3 shadow-2xs">
              <h3 className="font-bold text-gray-950 text-sm border-b border-gray-100 pb-2">{a}</h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-red-50/60 border border-red-100 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-red-800"><XCircle className="w-3.5 h-3.5" /><span>Limitation</span></div>
                  <p className="text-gray-700">{l}</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900"><CheckCircle2 className="w-3.5 h-3.5" /><span>ABHEDYA</span></div>
                  <p className="text-gray-900 font-medium">{b}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-2xs">
          <table className="w-full text-left text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b-2 border-gray-900 bg-gray-50/80 text-gray-950 font-bold text-xs">
                <th className="py-4 px-6 w-1/4">Existing approach</th>
                <th className="py-4 px-6 bg-red-50/40 text-red-950"><span className="inline-flex items-center gap-1.5"><XCircle className="w-4 h-4 text-red-700" />Limitation</span></th>
                <th className="py-4 px-6 bg-amber-50/60 text-amber-950"><span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-700" />ABHEDYA&apos;s approach</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {COMPARISON.map(([a, l, b]) => (
                <tr key={a} className="hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-bold text-gray-950 align-top">{a}</td>
                  <td className="py-4 px-6 bg-red-50/10 align-top">{l}</td>
                  <td className="py-4 px-6 bg-amber-50/20 text-gray-900 font-medium align-top">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* CALLOUT */}
      <Reveal className="border-t border-gray-200 pt-12 sm:pt-16 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl font-bold text-gray-950">Read the full SIH 2026 submission</h3>
          <p className="text-base text-gray-700">The complete slide deck for problem statement {SIH.problemId} is available to read on this site or download as a PDF.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => onNavigate('docs')}
            className="px-5 py-2.5 rounded-lg bg-gray-950 hover:bg-black text-amber-300 text-sm cursor-pointer shadow-xs">Read Submission</motion.button>
          <a href={DOCS.submissionPath} download={DOCS.submissionName}
            className="px-5 py-2.5 rounded-lg bg-white hover:bg-gray-50 text-gray-900 text-sm border border-gray-300 flex items-center gap-2">
            <Download className="w-4 h-4 text-amber-800" /><span>Download PDF</span>
          </a>
        </div>
      </Reveal>
    </div>
  );
}

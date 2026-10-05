import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Landmark, Users, Bot, TrendingUp, Hand, Zap, Fingerprint, Sprout, Recycle, Siren, HeartPulse, Flag, Building2, CheckCircle2, RefreshCcw, AlertTriangle } from 'lucide-react';
import PageHeader, { Reveal } from '../components/PageHeader';

const IMPACT = [
  { icon: ShieldCheck, who: 'Railway security personnel', text: 'Rapid, non-contact preliminary screening of suspicious materials.' },
  { icon: Landmark, who: 'RPF / railway authorities', text: 'Faster decision-making at checkpoints and during inspections.' },
  { icon: Users, who: 'Passengers & public', text: 'Safer railway environments through earlier identification of suspicious substances.' },
  { icon: Bot, who: 'Hazardous situations', text: 'Handheld and quadruped deployment extends inspection capability while reducing the need for an immediate close approach.' },
  { icon: TrendingUp, who: 'Future deployment', text: 'Scalable spectral libraries let the system adapt to additional validated material classes.' },
];

const BENEFITS = [
  { icon: Hand, title: 'Non-contact screening', text: 'Reduces direct handling of suspicious materials during initial screening.' },
  { icon: Zap, title: 'Rapid analysis', text: 'The Raman spectrum is acquired and processed at the edge in near real time.' },
  { icon: Fingerprint, title: 'Molecular fingerprinting', text: 'Chemically informative spectral signatures, not just vapours or broad readings.' },
  { icon: Sprout, title: 'Continuously improvable', text: 'Validated field data expands the reference library and improves the ML model over time.' },
  { icon: TrendingUp, title: 'Scalable', text: 'Additional validated spectral classes can be added to the system.' },
  { icon: Recycle, title: 'Reusable', text: 'Optical hardware with no recurring test-strip consumables.' },
  { icon: HeartPulse, title: 'Lower youth drug addiction', text: 'Helps reduce availability and trafficking of narcotics, contributing to a healthier and safer youth population.' },
  { icon: Flag, title: 'More secure India', text: 'Strengthens railway and national security by detecting narcotics and explosives earlier in the supply chain.' },
  { icon: Siren, title: 'Pre-incident detection', text: 'Earlier identification of suspicious materials helps prevent potential incidents before they occur.' },
  { icon: Building2, title: 'Safer society', text: 'Contributes to a safer railway environment, protects lives and property, and supports a more secure and resilient India.' },
];

export default function ImpactPage() {
  return (
    <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto">
      <PageHeader title="Impact & Benefits">
        Who ABHEDYA helps on the ground, and what it changes for railway security and the wider public.
      </PageHeader>

      <Reveal className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Impact from ABHEDYA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {IMPACT.map(({ icon: Icon, who, text }) => (
            <motion.div key={who} whileHover={{ y: -3 }} className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-amber-300 hover:shadow-xs transition-all space-y-2.5">
              <div className="p-2 w-fit rounded-lg bg-amber-50 text-amber-800 border border-amber-200"><Icon className="w-5 h-5" /></div>
              <h3 className="text-lg font-bold text-gray-950">{who}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <Reveal className="space-y-6 border-t border-gray-200 pt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Benefits of ABHEDYA</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="p-5 rounded-2xl border border-gray-200 bg-white space-y-2">
              <div className="flex items-center gap-2"><Icon className="w-5 h-5 text-amber-800 shrink-0" /><h3 className="font-bold text-gray-950">{title}</h3></div>
              <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="border-t border-gray-200 pt-12 space-y-5">
        <div className="max-w-3xl space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Uncertainty-aware by design</h2>
          <p className="text-gray-700">CLEAR / REPEAT / ESCALATE avoids forcing ambiguous measurements into a binary decision. ABHEDYA is a screening aid, so a suspicious result is always passed on for certified confirmation.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border-2 border-emerald-300 bg-emerald-50 text-center space-y-1"><CheckCircle2 className="w-7 h-7 mx-auto text-emerald-700" /><div className="font-bold font-sans">CLEAR</div><div className="text-sm text-gray-700">No threat detected</div></div>
          <div className="p-5 rounded-xl border-2 border-amber-300 bg-amber-50 text-center space-y-1"><RefreshCcw className="w-7 h-7 mx-auto text-amber-700" /><div className="font-bold font-sans">REPEAT</div><div className="text-sm text-gray-700">Scan again</div></div>
          <div className="p-5 rounded-xl border-2 border-red-300 bg-red-50 text-center space-y-1"><AlertTriangle className="w-7 h-7 mx-auto text-red-700" /><div className="font-bold font-sans">ESCALATE</div><div className="text-sm text-gray-700">Suspicious material</div></div>
        </div>
      </Reveal>
    </div>
  );
}

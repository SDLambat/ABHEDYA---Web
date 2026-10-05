import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Crown } from 'lucide-react';
import PageHeader, { Reveal } from '../components/PageHeader';
import logo from '../assets/images/logo.png';
import { GithubIcon } from '../components/Icons';
import { SIH, TEAM } from '../config/site';

import soham from '../assets/images/team/soham.jpg';
import nikhil from '../assets/images/team/nikhil.jpg';
import rasika from '../assets/images/team/rasika.jpg';
import shyam from '../assets/images/team/shyam.jpg';
import simi from '../assets/images/team/simi.jpg';
import aryan from '../assets/images/team/aryan.jpg';

const PHOTOS = { soham, nikhil, rasika, shyam, simi, aryan };

function LinkedinIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function TeamPage() {
  return (
    <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto">
      <PageHeader title="Team ABHEDYA">
        Six students behind the Un-Breachable Shield, led by captain Soham Gupta, competing in Smart India Hackathon 2026.
      </PageHeader>

      <Reveal>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center shadow-xs">
          <img src={logo} alt="ABHEDYA logo" className="h-28 w-auto object-contain" width="112" height="112" />
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-700 w-full">
            <div><dt className="font-bold text-gray-950">Team name</dt><dd>{SIH.teamName}</dd></div>
            <div><dt className="font-bold text-gray-950">Team ID</dt><dd>{SIH.teamId}</dd></div>
            <div><dt className="font-bold text-gray-950">Problem statement ID</dt><dd>{SIH.problemId}</dd></div>
            <div><dt className="font-bold text-gray-950">Category · Theme</dt><dd>{SIH.category} · {SIH.theme}</dd></div>
          </dl>
        </div>
      </Reveal>

      <Reveal className="space-y-6 border-t border-gray-200 pt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-950">Members</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {TEAM.map((m) => (
            <motion.div key={m.name} whileHover={{ y: -3 }}
              className={`rounded-2xl border bg-white overflow-hidden hover:shadow-xs transition-all ${m.isCaptain ? 'border-amber-400 col-span-2 lg:col-span-1' : 'border-gray-200 hover:border-amber-300'}`}>
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                <img src={PHOTOS[m.photo]} alt={`${m.name}, ${m.role}`} loading="lazy" width="480" height="600" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-4 sm:p-5 space-y-2">
                <h3 className="text-lg font-bold text-gray-950">{m.name}</h3>
                <span className={`inline-flex items-center gap-1 text-xs font-sans font-semibold px-2 py-0.5 rounded-md border ${m.isCaptain ? 'bg-gray-950 text-amber-300 border-gray-950' : 'bg-amber-50 text-amber-900 border-amber-200'}`}>
                  {m.isCaptain && <Crown className="w-3 h-3" />}{m.role}
                </span>
                {m.bio && <p className="text-sm text-gray-700 leading-relaxed">{m.bio}</p>}
                {(m.github || m.linkedin || m.mail) && (
                  <div className="flex gap-2 pt-1">
                    {m.github && <a href={m.github} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on GitHub`} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"><GithubIcon /></a>}
                    {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"><LinkedinIcon /></a>}
                    {m.mail && <a href={`mailto:${m.mail}`} aria-label={`Email ${m.name}`} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"><Mail className="w-4 h-4" /></a>}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

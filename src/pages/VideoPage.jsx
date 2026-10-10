import React from 'react';
import {
  ExternalLink,
  Play,
  Cpu,
  ScanLine,
  Bot,
  ShieldAlert,
} from 'lucide-react';
import PageHeader, { Reveal } from '../components/PageHeader';
import { SIH } from '../config/site';

const VIDEO_URL = 'https://youtu.be/ijTKWyh_wr4';
const EMBED_URL = 'https://www.youtube-nocookie.com/embed/ijTKWyh_wr4?rel=0&modestbranding=1';

const HIGHLIGHTS = [
  {
    icon: ScanLine,
    title: 'Non-Contact Raman Spectroscopy',
    desc: 'Demonstration of 785 nm laser excitation for non-destructive, standoff detection of concealed narcotic and explosive substances without opening luggage.',
  },
  {
    icon: Bot,
    title: 'Autonomous Quadruped Integration',
    desc: 'Deployment on the 12-DOF mobile quadruped robot for remote under-seat inspection, luggage rack scanning, and railway track ballast navigation.',
  },
  {
    icon: Cpu,
    title: 'Edge AI & Spectral Chemometrics',
    desc: 'Real-time spectral baseline subtraction, smoothing, PCA dimensionality reduction, and ML classification executing directly on an edge Raspberry Pi compute module.',
  },
  {
    icon: ShieldAlert,
    title: 'Three-Phase Decision Protocol',
    desc: 'Deterministic CLEAR / REPEAT / ESCALATE decision workflow with tamper-evident digital metadata logging for railway security personnel.',
  },
];

export default function VideoPage() {
  return (
    <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto pb-12">
      {/* PAGE HEADER */}
      <PageHeader title="Explanation Video">
        System walkthrough, hardware demonstration, and technical presentation for <strong>ABHEDYA</strong> ({SIH.problemId}) in Smart India Hackathon 2026.
      </PageHeader>

      {/* EMBEDDED VIDEO PLAYER */}
      <Reveal className="space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-slate-950 overflow-hidden shadow-xl">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900 border-b border-slate-800 text-white">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-red-600/20 text-red-500 border border-red-500/30">
                <Play className="w-4 h-4 fill-current" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-tight leading-none text-slate-100">
                  ABHEDYA System Demonstration & Walkthrough
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Smart India Hackathon 2026 • Official Video Submission
                </p>
              </div>
            </div>

            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 16:9 Responsive Video Viewport */}
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src={EMBED_URL}
              title="ABHEDYA SIH 2026 Explanation Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-gray-500">
          <span>Problem Statement: <strong>{SIH.problemId}</strong></span>
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-800 font-medium inline-flex items-center gap-1"
          >
            Direct YouTube link: {VIDEO_URL}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </Reveal>

      {/* CORE TOPICS COVERED IN THE VIDEO */}
      <Reveal className="space-y-6 border-t border-gray-200 pt-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-950 tracking-tight">Key Video Chapters & Demonstrations</h2>
          <p className="text-sm text-gray-600 mt-1">
            Summary of technical subsystems and operational workflows demonstrated in the explanation video.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-5 rounded-2xl border border-gray-200 bg-white shadow-xs space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-500/20">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="font-bold text-gray-950 text-base">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* PROBLEM CONTEXT CARD */}
      <Reveal className="p-6 rounded-2xl border border-gray-200 bg-gray-50 space-y-3">
        <h3 className="text-base font-bold text-gray-950">About Problem Statement {SIH.problemId}</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {SIH.title}
        </p>
        <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-600 font-mono">
          <span>Theme: <strong>{SIH.theme}</strong></span>
          <span>Category: <strong>{SIH.category}</strong></span>
          <span>Team: <strong>{SIH.teamName}</strong></span>
        </div>
      </Reveal>
    </div>
  );
}

import React from 'react';
import { Download, ExternalLink, FileText, Maximize2 } from 'lucide-react';
import PageHeader, { Reveal } from '../components/PageHeader';
import { LINKS, SIH } from '../config/site';
import submissionPdf from '../assets/slides/Abhedya submission (1).pdf';

export default function DocsPage() {
  const extra = [
    ['Website', null],
    ['CAD module', LINKS.cad],
    ['Detailed workflow', LINKS.workflow],
    ['Report', LINKS.report],
    ['Explanation video', LINKS.video],
    ['ML model Git repo', LINKS.git],
  ].filter(([, url]) => url);

  return (
    <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto">
      <PageHeader title="SIH 2026 Report">
        The official report and presentation deck for {SIH.problemId}. Browse the report below or download the PDF document.
      </PageHeader>

      <Reveal className="space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden flex flex-col">
          {/* Document header bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-gray-50/80 border-b border-gray-200">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20">
                <FileText className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-none">ABHEDYA Official Report Deck</p>
                <p className="text-xs text-gray-500 mt-0.5">Smart India Hackathon 2026 • Official Document</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={submissionPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-xs transition-colors"
                title="Open PDF in new tab"
              >
                <Maximize2 className="w-3.5 h-3.5 text-gray-500" />
                <span>Open Fullscreen</span>
              </a>
              <a
                href={submissionPdf}
                download="Abhedya_submission.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-950 hover:bg-black text-amber-300 shadow-xs transition-colors"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Embedded PDF Viewer */}
          <div className="relative w-full bg-gray-100 min-h-[550px] sm:min-h-[700px] lg:min-h-[820px]">
            <iframe
              src={`${submissionPdf}#toolbar=1&navpanes=0`}
              title="ABHEDYA SIH 2026 Report Deck"
              className="w-full h-[550px] sm:h-[700px] lg:h-[820px] border-0"
            />
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center sm:text-left px-1">
          Having trouble viewing the embedded document on your device?{' '}
          <a
            href={submissionPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:underline font-medium inline-flex items-center gap-0.5"
          >
            Click here to open the PDF directly <ExternalLink className="w-3 h-3 inline" />
          </a>
        </p>
      </Reveal>

      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-12">
        <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-3">
          <h2 className="text-xl font-bold text-gray-950">Download</h2>
          <p className="text-sm text-gray-700">Full report deck, exactly as submitted.</p>
          <a
            href={submissionPdf}
            download="Abhedya_submission.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-950 hover:bg-black text-amber-300 text-sm shadow-xs font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Report PDF</span>
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

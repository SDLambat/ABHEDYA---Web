import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, CheckCircle2, RefreshCcw, AlertTriangle, Repeat, Database } from 'lucide-react';
import PageHeader, { Reveal } from '../components/PageHeader';

const STEPS = [
  { title: 'Position the unit', text: 'Point the handheld unit, or send the quadruped, at the suspicious material. The optical path is enclosed and interlocked for laser safety.', tag: 'Deploy' },
  { title: 'Acquire the background', text: 'A controlled acquisition captures the dark / background signal so it can be subtracted later.', tag: 'Acquire' },
  { title: 'Excite with 785 nm laser', text: 'The TE-cooled laser diode illuminates the sample through the lens unit and beam splitter. Nothing touches the material.', tag: 'Acquire' },
  { title: 'Filter out Rayleigh light', text: 'The edge / long-pass filter rejects light at the laser wavelength and passes the Raman-shifted light.', tag: 'Optics' },
  { title: 'Record the spectrum', text: 'Collecting optics send the light through the slit, grating and image sensor inside the spectrometer, producing a Raman spectrum.', tag: 'Optics' },
  { title: 'Pre-process on the Raspberry Pi', text: 'Dark correction, baseline correction, noise reduction and feature extraction run locally at the edge.', tag: 'Edge AI' },
  { title: 'Compare with the reference library', text: 'PCA and machine-learning classification compare the measured fingerprint with the reference spectral library.', tag: 'Edge AI' },
];

const OUTCOMES = [
  { key: 'CLEAR', icon: CheckCircle2, label: 'No threat detected', text: 'The spectrum matches an acceptable material with sufficient confidence.', box: 'border-emerald-300 bg-emerald-50', chip: 'text-emerald-900', ic: 'text-emerald-700' },
  { key: 'REPEAT', icon: RefreshCcw, label: 'Scan again', text: 'The reading is ambiguous or poor. Re-position and acquire again rather than guess.', box: 'border-amber-300 bg-amber-50', chip: 'text-amber-950', ic: 'text-amber-700' },
  { key: 'ESCALATE', icon: AlertTriangle, label: 'Suspicious material', text: 'A suspicious match. Send the item to certified confirmation techniques.', box: 'border-red-300 bg-red-50', chip: 'text-red-950', ic: 'text-red-700' },
];

function Arrow() {
  return <div className="flex justify-center py-1.5 text-gray-400"><ArrowDown className="w-5 h-5" /></div>;
}

export default function WorkflowPage() {
  return (
    <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto">
      <PageHeader title="Detection Workflow">
        From laser to decision: how one measurement travels through the optics, the edge AI pipeline and the three-phase verdict.
      </PageHeader>

      <Reveal>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-8 shadow-xs">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center">
              <span className="px-6 py-2 rounded-full bg-gray-950 text-amber-300 font-bold text-sm border-2 border-amber-500">START</span>
            </div>
            <Arrow />

            {STEPS.map((s, i) => (
              <React.Fragment key={s.title}>
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.3 }}
                  className="flex gap-4 p-4 sm:p-5 rounded-xl border border-gray-200 bg-white hover:border-amber-300 transition-colors">
                  <span className="shrink-0 w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-sans font-bold text-sm flex items-center justify-center">{i + 1}</span>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-gray-950">{s.title}</h3>
                      <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 border border-gray-200">{s.tag}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{s.text}</p>
                  </div>
                </motion.div>
                <Arrow />
              </React.Fragment>
            ))}

            <div className="rounded-xl border-2 border-gray-900 bg-gray-50 p-4 sm:p-5 text-center">
              <h3 className="font-bold text-gray-950 text-lg">Three-phase decision</h3>
              <p className="text-sm text-gray-700">Acceptable, ambiguous and suspicious results are kept apart instead of forcing a binary answer.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 max-w-4xl mx-auto">
            {OUTCOMES.map(({ key, icon: Icon, label, text, box, chip, ic }) => (
              <div key={key} className={`p-5 rounded-xl border-2 ${box} space-y-2`}>
                <div className={`flex items-center gap-2 font-bold ${chip}`}><Icon className={`w-5 h-5 ${ic}`} /><span className="font-sans tracking-wide">{key}</span></div>
                <div className="font-semibold text-gray-900">{label}</div>
                <p className="text-sm text-gray-700">{text}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <Arrow />
            <div className="flex gap-4 p-4 sm:p-5 rounded-xl border border-gray-200 bg-white">
              <Database className="w-6 h-6 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-950">Log the measurement</h3>
                <p className="text-sm text-gray-700">The spectrum, classification, confidence, timestamp and measurement metadata are stored digitally as an auditable screening record.</p>
              </div>
            </div>
            <Arrow />
            <div className="flex justify-center">
              <span className="px-6 py-2 rounded-full bg-gray-950 text-amber-300 font-bold text-sm border-2 border-amber-500">END</span>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-12">
        <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-2">
          <div className="flex items-center gap-2"><Repeat className="w-5 h-5 text-amber-800" /><h3 className="text-lg font-bold text-gray-950">In the field</h3></div>
          <p className="text-sm text-gray-700">Sample and environmental conditions change, so ABHEDYA uses calibration checks and the REPEAT state, and refreshes the model and library periodically.</p>
        </div>
        <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-2">
          <div className="flex items-center gap-2"><Database className="w-5 h-5 text-amber-800" /><h3 className="text-lg font-bold text-gray-950">Learning over time</h3></div>
          <p className="text-sm text-gray-700">Validated real-world field data expands the reference spectral library and supports periodic retraining, adding new material classes as they are validated.</p>
        </div>
      </Reveal>
    </div>
  );
}

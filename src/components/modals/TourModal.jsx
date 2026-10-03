'use client';

import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Activity, Flame, Database } from 'lucide-react';
import { sounds } from '../../engine/soundFx';

export default function TourModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const tourSteps = [
    {
      title: "TOPOLOGICAL CAUSAL GRAPH",
      icon: <Activity className="w-5 h-5 text-cyan-400" />,
      desc: "Each node represents a mission-critical release milestone. The connecting curves are causal vectors that dynamically propagate delay penalties based on strict SLA buffer exhaustion.",
      highlight: "Nodes transition from Nominal (Cyan) to Critical (Crimson) when delay cascades."
    },
    {
      title: "CHAOS INJECTION MATRIX",
      icon: <Flame className="w-5 h-5 text-rose-400" />,
      desc: "Simulate high-stakes incidents: Shard Lock Contention, HSM Key Faults, or Gateway Timeouts. Adjust the Global Time Drift slider to observe non-linear cascading delays.",
      highlight: "Click 'Dispatch AI Mitigation' anytime to compute optimal buffer reallocation."
    },
    {
      title: "SANITY CONTENT LAKE ENGINE",
      icon: <Database className="w-5 h-5 text-indigo-400" />,
      desc: "All deadline horizons, causal vectors, and incident state transitions are synchronized with Sanity Content Lake schemas. Advanced 5-stage release governance is built right in.",
      highlight: "Export cryptographically-sound Incident Post-Mortems directly to markdown."
    }
  ];

  const current = tourSteps[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-cyan-500/30 bg-slate-950 p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-slate-100 font-mono">
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-800 hover:border-slate-600 bg-slate-900 text-slate-400 hover:text-slate-200 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40">
            {current.icon}
          </div>
          <div>
            <div className="text-[10px] text-cyan-400 tracking-widest uppercase">
              Horizon Mission Tour · Step {step + 1} of {tourSteps.length}
            </div>
            <h3 className="text-sm font-black tracking-wide text-slate-100">
              {current.title}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {current.desc}
        </p>

        <div className="p-3 rounded-xl border border-cyan-500/20 bg-cyan-950/20 text-[11px] text-cyan-300 mb-6">
          <span className="font-bold text-cyan-400">Pro-Tip: </span>
          {current.highlight}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="flex gap-1.5">
            {tourSteps.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === step ? 'w-6 bg-cyan-400 shadow-[0_0_8px_#06b6d4]' : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {step > 0 && (
              <button
                onClick={() => {
                  sounds.playClick();
                  setStep(step - 1);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 text-xs text-slate-300 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Prev
              </button>
            )}

            {step < tourSteps.length - 1 ? (
              <button
                onClick={() => {
                  sounds.playClick();
                  setStep(step + 1);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-cyan-500/40 hover:border-cyan-400 bg-cyan-950 hover:bg-cyan-900 text-xs text-cyan-300 font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)]"
              >
                Next
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  sounds.playChime();
                  onClose();
                }}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-emerald-500/40 hover:border-emerald-400 bg-emerald-950 hover:bg-emerald-900 text-xs text-emerald-300 font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <Check className="w-3.5 h-3.5" />
                Ready to Pilot
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

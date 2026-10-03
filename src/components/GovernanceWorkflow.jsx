'use client';

import React from 'react';
import { GitBranch, CheckCircle2, Clock, ShieldCheck, ArrowRight, Database, ExternalLink } from 'lucide-react';
import { sounds } from '../engine/soundFx';

export default function GovernanceWorkflow({
  workflowState,
  onAdvanceWorkflow,
  auditTrail
}) {
  const stages = [
    { id: 'draft', label: '1. DRAFT SPEC', desc: 'Sanity Studio schema & deadline document' },
    { id: 'simulating', label: '2. SIMULATION', desc: 'Causal horizon & blast radius test' },
    { id: 'peer-review', label: '3. PEER REVIEW', desc: 'SecOps & Platform team attestation' },
    { id: 'approved', label: '4. GOVERNANCE OK', desc: 'Cryptographic signature from Release VP' },
    { id: 'deployed', label: '5. LIVE CUTOVER', desc: 'Traffic shifted 100% via Cloudflare Edge' }
  ];

  const currentIdx = stages.findIndex(s => s.id === workflowState);

  return (
    <div className="w-full rounded-2xl border border-indigo-500/20 bg-slate-950/80 backdrop-blur-xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
              Sanity Content Lake // 5-Stage Release Governance
            </h3>
            <p className="text-[11px] font-mono text-slate-400">
              State machine backed by Sanity `incidentWorkflow` schema document
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              onAdvanceWorkflow();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-500/40 hover:border-indigo-400 bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 font-mono text-xs font-semibold transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)]"
          >
            <span>Advance Next Stage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5-Stage Stepper Bar */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {stages.map((stage, idx) => {
          const isPassed = idx < currentIdx;
          const isCurrent = idx === currentIdx;

          return (
            <div
              key={stage.id}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                isCurrent
                  ? 'border-indigo-500 bg-indigo-950/40 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.25)] ring-1 ring-indigo-500/50'
                  : isPassed
                  ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                  : 'border-slate-800 bg-slate-900/40 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[11px] font-mono font-bold tracking-wider">
                  {stage.label}
                </span>
                {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {isCurrent && <Clock className="w-3.5 h-3.5 text-indigo-400 animate-spin" />}
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-2">
                {stage.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Live Sanity Audit Trail Ticker */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <Database className="w-3.5 h-3.5 text-indigo-400" />
          <span>LAKE MUTATION LOG:</span>
          {auditTrail && auditTrail.length > 0 ? (
            <span className="text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">
              {auditTrail[0].action} [{auditTrail[0].docId}] · {auditTrail[0].status}
            </span>
          ) : (
            <span className="text-slate-500">Awaiting mutations...</span>
          )}
        </div>
        <span className="text-slate-500">Live Sanity App SDK Active</span>
      </div>
    </div>
  );
}

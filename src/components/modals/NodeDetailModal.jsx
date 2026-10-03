'use client';

import React from 'react';
import { X, ShieldAlert, Clock, ArrowRight, ArrowLeft, Zap, CheckCircle2, Flame, RefreshCw } from 'lucide-react';
import { sounds } from '../../engine/soundFx';

export default function NodeDetailModal({
  isOpen,
  onClose,
  node,
  nodes,
  edges,
  onAddSlip,
  onResetNode
}) {
  if (!isOpen || !node) return null;

  const incomingEdges = edges.filter(e => e.target === node.id);
  const outgoingEdges = edges.filter(e => e.source === node.id);

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

        {/* Top Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2.5 rounded-xl border ${
            node.status === 'critical' ? 'border-rose-500/40 bg-rose-950/40 text-rose-400' :
            node.status === 'drift' ? 'border-amber-500/40 bg-amber-950/40 text-amber-400' :
            'border-cyan-500/40 bg-cyan-950/40 text-cyan-400'
          }`}>
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                {node.id}
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider">
                SANITY ID: {node.sanityId}
              </span>
            </div>
            <h3 className="text-sm font-black tracking-wide text-slate-100 mt-1">
              {node.name}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {node.description}
        </p>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-center">
            <div className="text-[9px] text-slate-400 uppercase">Target Horizon</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">T+{node.targetHours}h</div>
          </div>
          <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-center">
            <div className="text-[9px] text-slate-400 uppercase">SLA Buffer</div>
            <div className="text-xs font-bold text-cyan-300 mt-0.5">{node.slaBufferMinutes} mins</div>
          </div>
          <div className={`p-2.5 rounded-xl border text-center ${
            node.effectiveSlipMinutes > 0 ? 'border-rose-500/40 bg-rose-950/40' : 'border-slate-800 bg-slate-900/60'
          }`}>
            <div className="text-[9px] text-slate-400 uppercase">Current Slip</div>
            <div className={`text-xs font-bold mt-0.5 ${node.effectiveSlipMinutes > 0 ? 'text-rose-400' : 'text-slate-200'}`}>
              +{node.effectiveSlipMinutes} mins
            </div>
          </div>
        </div>

        {/* Upstream / Downstream Causal Vectors */}
        <div className="space-y-2 mb-5">
          <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/40 text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5 mb-1 font-bold">
              <ArrowLeft className="w-3 h-3 text-cyan-400" />
              UPSTREAM ANTECEDENTS ({incomingEdges.length}):
            </span>
            {incomingEdges.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {incomingEdges.map(e => (
                  <span key={e.source} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 text-[10px]">
                    {e.source} (Penalty: {e.latencyPenalty}x)
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-slate-500 text-[10px]">Root Origin Milestone</span>
            )}
          </div>

          <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/40 text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5 mb-1 font-bold">
              <ArrowRight className="w-3 h-3 text-rose-400" />
              DOWNSTREAM CASUAL CONVERGENCES ({outgoingEdges.length}):
            </span>
            {outgoingEdges.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {outgoingEdges.map(e => (
                  <span key={e.target} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 text-[10px]">
                    {e.target} (Penalty: {e.latencyPenalty}x)
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-slate-500 text-[10px]">Terminal Horizon (Launch Gate)</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="flex gap-1.5">
            <button
              onClick={() => {
                sounds.playPing();
                onAddSlip(node.id, 15);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-900 text-xs text-slate-200 transition-all font-mono"
            >
              +15m Slip
            </button>
            <button
              onClick={() => {
                sounds.playPing();
                onAddSlip(node.id, 30);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-900 text-xs text-slate-200 transition-all font-mono"
            >
              +30m Slip
            </button>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onResetNode(node.id);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-cyan-500/40 hover:border-cyan-400 bg-cyan-950 hover:bg-cyan-900 text-xs text-cyan-300 font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Neutralize Node
          </button>
        </div>
      </div>
    </div>
  );
}

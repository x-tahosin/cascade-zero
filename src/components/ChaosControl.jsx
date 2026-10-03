'use client';

import React from 'react';
import { Flame, ShieldCheck, Zap, AlertCircle, RefreshCw, Cpu, Sparkles } from 'lucide-react';
import { sounds } from '../engine/soundFx';

export default function ChaosControl({
  timeDrift,
  setTimeDrift,
  selectedChaos,
  setSelectedChaos,
  presets,
  causalExplanation,
  onMitigate
}) {
  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
      {/* Laser Gradient Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />

      {/* Top Row: Section Title + Causal Stream Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
              Chaos Injection Matrix & Topological Telemetry
            </h3>
            <p className="text-[11px] font-mono text-slate-400">
              Perturb pipeline milestones to compute causal cascade & SLA failure boundaries
            </p>
          </div>
        </div>

        {/* Live Causal Explanation Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/90 text-xs font-mono text-cyan-300 max-w-xl">
          <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-pulse" />
          <span className="truncate">{causalExplanation}</span>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: Interactive Entropy Slider (4 cols) */}
        <div className="lg:col-span-4 p-3.5 rounded-xl border border-slate-800/90 bg-slate-900/50">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Time Drift Multiplier
            </span>
            <span className="font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              +{timeDrift * 30}m global slip
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="4"
            step="0.1"
            value={timeDrift}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setTimeDrift(val);
              if (Math.floor(val * 10) % 5 === 0) sounds.playClick();
            }}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1.5">
            <span>T+0h Nominal</span>
            <span>T+1h Caution</span>
            <span>T+2h Breach</span>
          </div>
        </div>

        {/* Middle: 4 Quick Fault Triggers (5 cols) */}
        <div className="lg:col-span-5 flex flex-wrap gap-2">
          {presets.map((preset) => {
            const isSelected = selectedChaos === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  if (isSelected) {
                    setSelectedChaos('none');
                    sounds.playClick();
                  } else {
                    setSelectedChaos(preset.id);
                    if (preset.id === 'none') sounds.playClick();
                    else sounds.playAlarm();
                  }
                }}
                className={`flex-1 min-w-[140px] px-3 py-2 rounded-xl border text-xs font-mono text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-rose-500 bg-rose-950/50 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.3)] ring-1 ring-rose-500/50'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-bold truncate text-[11px]">{preset.name}</span>
                  {preset.injectedDelayMinutes > 0 && (
                    <span className="text-[10px] text-rose-400 font-bold">
                      +{preset.injectedDelayMinutes}m
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {preset.targetNode || 'Nominal system state'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: AI Mitigation & Neutralize Trigger (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <button
            onClick={() => {
              sounds.playChime();
              onMitigate();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/40 hover:border-emerald-400 bg-gradient-to-r from-emerald-950/60 to-cyan-950/60 hover:from-emerald-900/60 hover:to-cyan-900/60 text-emerald-300 font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
            Dispatch AI Mitigation
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setSelectedChaos('none');
              setTimeDrift(0);
            }}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-mono text-[11px] transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Neutralize Horizon Faults
          </button>
        </div>
      </div>
    </div>
  );
}

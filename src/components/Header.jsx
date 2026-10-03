'use client';

import React from 'react';
import { Volume2, VolumeX, Compass, Database, FileText, RotateCcw, ShieldAlert, Activity } from 'lucide-react';
import { sounds } from '../engine/soundFx';

export default function Header({
  defcon,
  riskScore,
  onTourClick,
  onSanityClick,
  onPostMortemClick,
  onResetClick,
  isAudioOn,
  setIsAudioOn
}) {
  const getDefconBadge = () => {
    switch (defcon) {
      case 1:
        return { label: 'DEFCON 1 // BREACH IMMINENT', color: 'border-rose-500/50 bg-rose-950/40 text-rose-300 ring-rose-500/30' };
      case 2:
        return { label: 'DEFCON 2 // CRITICAL DRIFT', color: 'border-amber-500/50 bg-amber-950/40 text-amber-300 ring-amber-500/30' };
      case 3:
        return { label: 'DEFCON 3 // ELEVATED CAUTION', color: 'border-yellow-500/50 bg-yellow-950/40 text-yellow-300 ring-yellow-500/30' };
      case 4:
        return { label: 'DEFCON 4 // ADAPTIVE MONITORING', color: 'border-sky-500/50 bg-sky-950/40 text-sky-300 ring-sky-500/30' };
      default:
        return { label: 'DEFCON 5 // ALL SYSTEMS OPTIMAL', color: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300 ring-emerald-500/20' };
    }
  };

  const badge = getDefconBadge();

  return (
    <header className="relative z-30 border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Mission Status */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-indigo-500/20 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-widest text-slate-100 font-mono">
                CASCADE<span className="text-cyan-400">//</span>ZERO
              </h1>
              <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                SANITY LAKE LIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono tracking-tight flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Autonomous Causal Incident Simulator & Cutover War Room
            </p>
          </div>
        </div>

        {/* DEFCON & Live Telemetry Gauge */}
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded-lg border text-xs font-mono tracking-wider font-semibold ring-1 transition-all duration-300 ${badge.color}`}>
            {badge.label}
          </div>

          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1 rounded-lg border border-slate-800 bg-slate-900/60 font-mono">
            <span className="text-xs text-slate-400">HORIZON RISK:</span>
            <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  riskScore > 70 ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' :
                  riskScore > 35 ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' :
                  'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                }`}
                style={{ width: `${Math.max(4, riskScore)}%` }}
              />
            </div>
            <span className={`text-xs font-bold ${
              riskScore > 70 ? 'text-rose-400' : riskScore > 35 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {riskScore}%
            </span>
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={() => {
              const active = sounds.toggle();
              setIsAudioOn(active);
              if (active) sounds.playPing();
            }}
            className="p-2 rounded-lg border border-slate-800 hover:border-cyan-500/40 bg-slate-900/80 hover:bg-cyan-950/30 text-slate-300 hover:text-cyan-300 transition-all text-xs"
            title={isAudioOn ? "Mute Mission SFX" : "Enable Mission SFX"}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* 30s Guided Tour */}
          <button
            onClick={() => {
              sounds.playClick();
              onTourClick();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 bg-cyan-950/30 hover:bg-cyan-900/40 text-cyan-300 transition-all text-xs font-mono font-medium"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">30s Tour</span>
          </button>

          {/* Sanity Lake Config */}
          <button
            onClick={() => {
              sounds.playClick();
              onSanityClick();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-500/30 hover:border-indigo-400/60 bg-indigo-950/30 hover:bg-indigo-900/40 text-indigo-300 transition-all text-xs font-mono font-medium"
          >
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">Sanity Lake</span>
          </button>

          {/* Export Post-Mortem */}
          <button
            onClick={() => {
              sounds.playClick();
              onPostMortemClick();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-900 hover:bg-slate-800 text-slate-200 transition-all text-xs font-mono font-medium"
          >
            <FileText className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden md:inline">Post-Mortem</span>
          </button>

          {/* Reset */}
          <button
            onClick={() => {
              sounds.playClick();
              onResetClick();
            }}
            className="p-1.5 rounded-lg border border-slate-800 hover:border-slate-600 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all text-xs"
            title="Reset All Timelines to Nominal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

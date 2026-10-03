'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flag, Flame, ShieldCheck, ArrowRight, Clock, Calendar, CheckCircle2, Activity, Play } from 'lucide-react';
import { sounds } from '../engine/soundFx';

export default function OverviewPage() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-14 relative overflow-hidden">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[350px] bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Hero & 3-Step Guided Methodology matching Image 3 */}
        <div className="lg:col-span-7 flex flex-col">
          

          {/* Big Bold Headline matching Image 3 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-[1.08] mb-6 font-sans">
            Simulate Cascading <br />
            <span className="text-emerald-400">Release Failures</span> <br />
            Before Production Crashes.
          </h1>

          <p className="text-base text-slate-400 max-w-xl leading-relaxed mb-10 font-sans">
            A deterministic topological causal simulator where release milestones, blast radius, and 
            dependency slips are modeled as structured data in Sanity Content Lake.
          </p>

          {/* 3-Step Interactive Horizon Curve matching Image 3 */}
          <div className="relative mb-10 max-w-lg">
            {/* SVG Connecting Flow Curve with Animated Flow Dashes */}
            <svg
              className="absolute top-7 left-8 right-8 w-[calc(100%-64px)] h-8 pointer-events-none z-0"
              viewBox="0 0 320 30"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                </linearGradient>
                <filter id="curveGlow">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Shadow Base Curve */}
              <path
                d="M 10 15 C 80 0, 120 30, 160 15 C 200 0, 240 30, 310 15"
                stroke="#064e3b"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Active Glowing Flow Curve */}
              <path
                d="M 10 15 C 80 0, 120 30, 160 15 C 200 0, 240 30, 310 15"
                stroke="url(#curveGrad)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                className="animate-flow-dash"
                filter="url(#curveGlow)"
              />
            </svg>

            <div className="relative z-10 flex items-start justify-between gap-4">
              
              {/* Step 1 */}
              <div
                onClick={() => {
                  sounds.playClick();
                  setActiveStep(1);
                }}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  activeStep === 1
                    ? 'border-emerald-400 bg-emerald-950/80 halo-emerald-lg scale-110 text-emerald-300'
                    : 'border-emerald-500/50 bg-emerald-950/40 text-emerald-400 group-hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                }`}>
                  <Flag className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 mt-2.5">1.</span>
                <span className="text-xs font-semibold text-slate-300 mt-0.5 font-sans">Select Milestone</span>
              </div>

              {/* Step 2 */}
              <div
                onClick={() => {
                  sounds.playClick();
                  setActiveStep(2);
                }}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  activeStep === 2
                    ? 'border-emerald-400 bg-emerald-950/80 halo-emerald-lg scale-110 text-emerald-300'
                    : 'border-emerald-500/50 bg-emerald-950/40 text-emerald-400 group-hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                }`}>
                  <Flame className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 mt-2.5">2.</span>
                <span className="text-xs font-semibold text-slate-300 mt-0.5 font-sans">Inject Chaos</span>
              </div>

              {/* Step 3 */}
              <div
                onClick={() => {
                  sounds.playClick();
                  setActiveStep(3);
                }}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  activeStep === 3
                    ? 'border-emerald-400 bg-emerald-950/80 halo-emerald-lg scale-110 text-emerald-300'
                    : 'border-emerald-500/50 bg-emerald-950/40 text-emerald-400 group-hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                }`}>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 mt-2.5">3.</span>
                <span className="text-xs font-semibold text-slate-300 mt-0.5 font-sans">Automated Governance</span>
              </div>

            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/simulator"
              onClick={() => sounds.playPing()}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:shadow-[0_0_45px_rgba(16,185,129,0.7)] hover:scale-[1.02] active:scale-95"
            >
              <span>Launch Causal Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/governance"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-800 hover:border-emerald-500/50 bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-emerald-300 font-mono text-sm transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            >
              <span>View Governance Pipeline</span>
            </Link>
          </div>
        </div>

        {/* Right Column: 4 Sleek Telemetry Cards matching Image 3 */}
        <div className="lg:col-span-5 flex flex-col gap-3.5">
          
          {/* Card 1: System Risk */}
          <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/30 bg-[#090e18]/90 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.12)] hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.22)] transition-all group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>System Risk</span>
              </div>
              
              {/* Dynamic Sparkline with Gradient Fill and Pulsing Apex */}
              <div className="relative">
                <svg className="w-28 h-8" viewBox="0 0 100 28" fill="none">
                  <defs>
                    <linearGradient id="sparklineGrad" x1="0%" y1="0%" x2="0%" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 20 L 20 18 L 40 22 L 60 12 L 80 14 L 100 5 L 100 28 L 0 28 Z"
                    fill="url(#sparklineGrad)"
                  />
                  <path
                    d="M 0 20 L 20 18 L 40 22 L 60 12 L 80 14 L 100 5"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-emerald-300 transition-colors"
                  />
                </svg>
                {/* Glowing Apex Dot */}
                <div className="absolute top-[4px] right-[0px] w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-ping" />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-slate-100">72%</span>
              <span className="text-xs font-mono font-bold text-emerald-400">High</span>
            </div>

            <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-emerald-400 shadow-[0_0_12px_#10b981]" style={{ width: '72%' }} />
            </div>

            <div className="text-[11px] font-sans text-slate-500">
              cascading failure potential
            </div>
          </div>

          {/* Card 2: SLA Buffer */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-800/80 hover:border-emerald-500/40 bg-[#090e18]/90 backdrop-blur-xl transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>SLA Buffer</span>
              </div>

              {/* Glowing Donut Progress Ring */}
              <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" strokeWidth="3.5" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeDasharray="88"
                  strokeDashoffset="72"
                  strokeLinecap="round"
                  className="shadow-[0_0_10px_#10b981]"
                />
              </svg>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-slate-100">18%</span>
              <span className="text-xs font-mono text-slate-400">Remaining</span>
            </div>

            <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-emerald-400 shadow-[0_0_10px_#10b981]" style={{ width: '18%' }} />
            </div>

            <div className="text-[11px] font-sans text-slate-500">
              12h 47m until violation
            </div>
          </div>

          {/* Card 3: DEFCON Level */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-800/80 hover:border-emerald-500/40 bg-[#090e18]/90 backdrop-blur-xl transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>DEFCON Level</span>
              </div>

              {/* 3D Wireframe Cube with Gentle Floating Keyframe */}
              <div className="animate-float-wireframe text-emerald-400">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">DEFCON 2</span>
              <span className="text-xs font-mono text-slate-400">Elevated</span>
            </div>

            {/* DEFCON Segmented Glow Bar */}
            <div className="flex gap-1.5 mb-2">
              <div className="h-2 flex-1 rounded bg-emerald-400 shadow-[0_0_10px_#10b981]" />
              <div className="h-2 flex-1 rounded bg-emerald-400 shadow-[0_0_10px_#10b981]" />
              <div className="h-2 flex-1 rounded bg-slate-800" />
              <div className="h-2 flex-1 rounded bg-slate-800" />
              <div className="h-2 flex-1 rounded bg-slate-800" />
            </div>

            <div className="text-[11px] font-sans text-slate-500">
              Automated gates engaged
            </div>
          </div>

          {/* Card 4: Target Cutover */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-800/80 hover:border-emerald-500/40 bg-[#090e18]/90 backdrop-blur-xl transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Target Cutover</span>
              </div>

              <span className="px-2.5 py-0.5 rounded-full border border-emerald-500/50 bg-emerald-950/70 text-emerald-300 font-mono text-[10px] font-bold tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                READY
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-black font-mono text-slate-100 mb-0.5">
              June 12, 2025
            </div>

            <div className="text-xs font-mono text-slate-400 mb-2">
              02:00 – 04:00 UTC
            </div>

            <div className="text-[11px] font-sans text-slate-500">
              Dry run approved
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { sounds } from '../engine/soundFx';

export default function CascadeLogo({ showBreadcrumb = false, breadcrumb = null, className = '' }) {
  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      <Link
        href="/"
        onClick={() => sounds?.playClick?.()}
        className="flex items-center gap-2.5 group shrink-0"
        title="CASCADE // ZERO"
      >
        {/* Exact Tilted ECG Slash Logo Mark matching user reference image */}
        <div className="relative shrink-0 flex items-center justify-center">
          <svg
            viewBox="0 0 28 26"
            fill="none"
            className="w-6 h-6 shrink-0 transition-transform duration-200 group-hover:scale-105"
          >
            <defs>
              <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Slash 1 top-left bar */}
            <line
              x1="4"
              y1="12"
              x2="10"
              y2="4"
              stroke="#10b981"
              strokeWidth="2.8"
              strokeLinecap="round"
              filter="url(#logoGlow)"
            />
            {/* Slash 1 bottom-left bar */}
            <line
              x1="8"
              y1="22"
              x2="14"
              y2="14"
              stroke="#10b981"
              strokeWidth="2.8"
              strokeLinecap="round"
              filter="url(#logoGlow)"
            />
            {/* Slash 2 right parallel bar */}
            <line
              x1="14"
              y1="22"
              x2="22"
              y2="10"
              stroke="#10b981"
              strokeWidth="2.8"
              strokeLinecap="round"
              filter="url(#logoGlow)"
            />
          </svg>
        </div>

        {/* Clean, Crisp Typography: CASCADE // ZERO with Emerald ZERO */}
        <span className="text-[13px] sm:text-sm font-bold tracking-[0.16em] uppercase select-none group-hover:opacity-90 transition-opacity">
          <span className="text-white">CASCADE</span>
          <span className="text-slate-500 font-light mx-1.5">//</span>
          <span className="text-emerald-400">ZERO</span>
        </span>
      </Link>

      {/* Dynamic route breadcrumb if present */}
      {showBreadcrumb && breadcrumb && (
        <div className="hidden sm:block">
          {breadcrumb}
        </div>
      )}
    </div>
  );
}

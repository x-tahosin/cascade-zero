'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../engine/soundFx';
import CascadeLogo from './CascadeLogo';

export default function Navbar() {
  const pathname = usePathname();
  const [audioOn, setAudioOn] = useState(true);

  const getBreadcrumb = () => {
    if (pathname === '/simulator') {
      return (
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono tracking-wider font-semibold">
          /SIMULATOR
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
        </span>
      );
    }
    if (pathname === '/lake' || pathname === '/experiments') {
      return (
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono tracking-wider font-semibold">
          /EXPERIMENTS
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
        </span>
      );
    }
    if (pathname === '/app-sdk') {
      return (
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono tracking-wider font-semibold">
          /APP-SDK
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
        </span>
      );
    }
    if (pathname === '/governance' || pathname === '/analytics') {
      return (
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono tracking-wider font-semibold">
          /ANALYTICS
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
        </span>
      );
    }
    return null;
  };

  const navLinks = [
    { label: 'OVERVIEW', href: '/' },
    { label: 'SIMULATOR', href: '/simulator' },
    { label: 'APP SDK', href: '/app-sdk' },
    { label: 'EXPERIMENTS', href: '/lake' },
    { label: 'ANALYTICS', href: '/governance' }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#05080e]/95 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand Logo & Breadcrumb */}
        <CascadeLogo
          showBreadcrumb={true}
          breadcrumb={getBreadcrumb()}
        />

        {/* Center Nav Links (matching ref_header.png: plain text with emerald bottom underline on active tab) */}
        <nav className="flex items-center gap-6 sm:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === '/lake' && pathname === '/experiments') || (link.href === '/governance' && pathname === '/analytics');
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => sounds.playClick()}
                className={`text-xs font-mono tracking-wider transition-colors py-1 ${
                  isActive
                    ? 'text-emerald-400 font-bold border-b-2 border-emerald-400'
                    : 'text-slate-400 hover:text-slate-200 font-medium'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Status & Controls (matching ref_header.png: circular target icon + stacked text) */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Target Ring & Stacked System Status */}
          <div className="flex items-center gap-2.5">
            {/* Concentric radar circle target icon */}
            <div className="relative w-4 h-4 rounded-full border border-emerald-500/70 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            </div>

            {/* Stacked Text: SYSTEM STATUS / ● STABLE */}
            <div className="flex flex-col text-left leading-none font-mono">
              <span className="text-[9px] uppercase tracking-wider text-slate-300 font-bold mb-0.5">
                SYSTEM STATUS
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                STABLE
              </span>
            </div>
          </div>

          {/* Audio FX Toggle */}
          <button
            onClick={() => {
              const active = sounds.toggle();
              setAudioOn(active);
              if (active) sounds.playPing();
            }}
            className="p-1 rounded-md text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"
            title={audioOn ? "Mute Synthesizer SFX" : "Enable Synthesizer SFX"}
          >
            {audioOn ? <Volume2 className="w-3.5 h-3.5 text-slate-400 hover:text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
}

'use client';

import React, { useState } from 'react';
import { Shield, Database, CreditCard, Lock, Globe, Rocket, Plus, AlertTriangle, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { sounds } from '../engine/soundFx';

export default function CausalGraph({
  nodes,
  edges,
  selectedNode,
  onSelectNode,
  onAddMilestoneClick,
  onInjectFault
}) {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Precision coordinate layout with balanced margins (canvas: 1040 x 310)
  const nodePositions = {
    'AUTH-01': { x: 40, y: 45 },
    'DB-MIGRATE': { x: 245, y: 45 },
    'PAYMENT-GW': { x: 450, y: 45 },
    'AUDIT-SEC': { x: 655, y: 45 },
    'CDN-EDGE': { x: 450, y: 190 },
    'LAUNCH-GATE': { x: 860, y: 115 }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'security': return <Shield className="w-3.5 h-3.5 text-cyan-400" />;
      case 'database': return <Database className="w-3.5 h-3.5 text-emerald-400" />;
      case 'fintech': return <CreditCard className="w-3.5 h-3.5 text-indigo-400" />;
      case 'compliance': return <Lock className="w-3.5 h-3.5 text-purple-400" />;
      case 'networking': return <Globe className="w-3.5 h-3.5 text-sky-400" />;
      case 'release': return <Rocket className="w-3.5 h-3.5 text-rose-400" />;
      default: return <Zap className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  const getNodeStyles = (node) => {
    if (node.status === 'critical') {
      return {
        cardBg: 'bg-rose-950/80 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.4)] ring-1 ring-rose-500/60',
        badgeBg: 'bg-rose-900/90 text-rose-100 border-rose-600',
        textColor: 'text-rose-200',
        glowColor: '#f43f5e'
      };
    }
    if (node.status === 'quarantined' || node.status === 'drift') {
      return {
        cardBg: 'bg-amber-950/70 border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.3)] ring-1 ring-amber-500/50',
        badgeBg: 'bg-amber-900/90 text-amber-100 border-amber-600',
        textColor: 'text-amber-200',
        glowColor: '#f59e0b'
      };
    }
    return {
      cardBg: 'bg-slate-900/90 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]',
      badgeBg: 'bg-cyan-950/80 text-cyan-300 border-cyan-600/40',
      textColor: 'text-slate-200',
      glowColor: '#06b6d4'
    };
  };

  return (
    <div className="relative w-full rounded-2xl border border-cyan-500/20 bg-slate-950/90 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Background Laser Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1a2e_1px,transparent_1px),linear-gradient(to_bottom,#0c1a2e_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 px-4 py-2.5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <h2 className="text-xs font-black font-mono tracking-wider text-slate-200 uppercase">
            Topological Causal Horizon // Interactive DAG
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#06b6d4]"></span>
              Nominal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]"></span>
              Causal Drift
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e] animate-ping"></span>
              Critical Breach
            </span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onAddMilestoneClick();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-cyan-500/40 hover:border-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 font-mono text-[11px] transition-all font-semibold"
          >
            <Plus className="w-3 h-3" />
            Add Milestone
          </button>
        </div>
      </div>

      {/* SVG Horizon Canvas */}
      <div className="relative w-full aspect-[16/5.2] min-h-[300px] max-h-[360px] p-2">
        <svg
          viewBox="0 0 1050 310"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="edgeGradNominal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="edgeGradCritical" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.9" />
            </linearGradient>

            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Causal Edges */}
          {edges.map((edge, idx) => {
            const src = nodePositions[edge.source];
            const dst = nodePositions[edge.target];
            if (!src || !dst) return null;

            const x1 = src.x + 155;
            const y1 = src.y + 40;
            const x2 = dst.x;
            const y2 = dst.y + 40;

            const dx = x2 - x1;
            const cx1 = x1 + dx * 0.45;
            const cy1 = y1;
            const cx2 = x1 + dx * 0.55;
            const cy2 = y2;

            const pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

            const srcNode = nodes.find(n => n.id === edge.source);
            const dstNode = nodes.find(n => n.id === edge.target);
            const isHazard = (srcNode && srcNode.status === 'critical') || (dstNode && dstNode.status === 'critical');

            return (
              <g key={`edge-${idx}`}>
                {/* Background Track */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={isHazard ? '#4c0519' : '#082f49'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Animated Glowing Vector */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={isHazard ? 'url(#edgeGradCritical)' : 'url(#edgeGradNominal)'}
                  strokeWidth={isHazard ? '2.5' : '1.8'}
                  strokeDasharray={isHazard ? "6 6" : "8 8"}
                  className="animate-[dash_15s_linear_infinite]"
                  filter={isHazard ? 'url(#neonGlow)' : undefined}
                />

                {/* Centered Latency Penalty Badge */}
                <g transform={`translate(${(x1 + x2) / 2}, ${(y1 + y2) / 2})`}>
                  <rect
                    x="-14"
                    y="-8"
                    width="28"
                    height="16"
                    rx="3"
                    fill="#030712"
                    stroke={isHazard ? '#f43f5e' : '#0284c7'}
                    strokeWidth="1"
                    opacity="0.9"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={isHazard ? '#fda4af' : '#7dd3fc'}
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {edge.latencyPenalty}x
                  </text>
                </g>
              </g>
            );
          })}

          {/* Interactive Node Cards */}
          {nodes.map((node) => {
            const pos = nodePositions[node.id];
            if (!pos) return null;

            const isSelected = selectedNode && selectedNode.id === node.id;
            const style = getNodeStyles(node);

            return (
              <foreignObject
                key={node.id}
                x={pos.x}
                y={pos.y}
                width="155"
                height="82"
                className="overflow-visible"
              >
                <div
                  onClick={() => {
                    sounds.playPing();
                    onSelectNode(node);
                  }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`group relative cursor-pointer select-none rounded-xl p-2.5 transition-all duration-300 border ${style.cardBg} ${
                    isSelected ? 'ring-2 ring-cyan-400 scale-105 z-20' : 'hover:scale-[1.03] z-10'
                  }`}
                >
                  {/* Top Bar: Icon + ID + Buffer */}
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5">
                      {getCategoryIcon(node.category)}
                      <span className="text-[11px] font-mono font-bold tracking-wider text-slate-100">
                        {node.id}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 bg-slate-800/80 px-1 py-0.2 rounded">
                      T+{node.targetHours}h
                    </span>
                  </div>

                  {/* Clean Node Name */}
                  <p className="text-[10px] font-medium text-slate-300 truncate leading-snug group-hover:text-cyan-300 transition-colors">
                    {node.name}
                  </p>

                  {/* Metrics Footer */}
                  <div className="mt-1.5 pt-1 border-t border-slate-800/80 flex items-center justify-between text-[9px] font-mono">
                    <span className={`font-bold ${
                      node.effectiveSlipMinutes > 0
                        ? (node.status === 'critical' ? 'text-rose-400' : 'text-amber-400')
                        : 'text-slate-400'
                    }`}>
                      +{node.effectiveSlipMinutes}m slip
                    </span>

                    <span className={`px-1.5 py-0.2 rounded font-bold border ${style.badgeBg}`}>
                      {node.doomsdayScore}% risk
                    </span>
                  </div>

                  {/* Red Pulse Dot for Critical Nodes */}
                  {node.status === 'critical' && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                    </span>
                  )}
                </div>
              </foreignObject>
            );
          })}
        </svg>
      </div>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </div>
  );
}

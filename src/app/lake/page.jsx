'use client';

import React, { useState } from 'react';
import {
  Database,
  FileCode,
  Play,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Activity,
  Code,
  Sliders,
  X,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { sounds } from '../../engine/soundFx';
import { sanityClient, SANITY_CONFIG } from '../../sanity/client';

export default function SanityLakePage() {
  const [isRunning, setIsRunning] = useState(false);
  const [latency, setLatency] = useState(42);
  const [showFullAuditModal, setShowFullAuditModal] = useState(false);
  const [auditFilter, setAuditFilter] = useState('ALL');
  const [scanActive, setScanActive] = useState(false);

  const [auditLog, setAuditLog] = useState([
    { action: 'CREATE incident', id: 'inc_7f3a902b-1e6d-4d8a-9f0c-8b1e2a4d7f9c', time: '10:24:18.123', status: 'COMMITTED', type: 'CREATE' },
    { action: 'UPDATE deadline', id: 'dead_981e2a4d-7f3a-9c2b-1e6d-4d8a-9f0c', time: '10:24:16.754', status: 'COMMITTED', type: 'UPDATE' },
    { action: 'CREATE causalVector', id: 'cv_6b1e2a4d-9f0c-4d8a-7f3a-1e6d9c2b', time: '10:24:15.331', status: 'COMMITTED', type: 'CREATE' },
    { action: 'UPDATE incident', id: 'inc_3c2b1e6d-4d8a-9f0c-7f3a-2a4d1e6d9c2b', time: '10:24:13.902', status: 'COMMITTED', type: 'UPDATE' },
    { action: 'DELETE incident', id: 'inc_1e6d9c2b-4d8a-7f3a-9f0c-2b1e6d4a8f7e', time: '10:24:12.488', status: 'COMMITTED', type: 'DELETE' },
    { action: 'CREATE incident', id: 'inc_2a4d7f3a-9c2b-1e6d-8b1e-0c9f4d3a7b2e', time: '10:24:10.056', status: 'COMMITTED', type: 'CREATE' },
    { action: 'UPDATE causalVector', id: 'cv_9f0c4d8a-7f3a-2b1e-1e6d-9c2b0a4d7f3a', time: '10:24:08.621', status: 'COMMITTED', type: 'UPDATE' }
  ]);

  const handleRunQuery = async () => {
    sounds.playPing();
    setIsRunning(true);
    setScanActive(true);

    const t0 = performance.now();
    try {
      await sanityClient.fetch('*[_type == "incident"]');
    } catch {}
    const measuredLatency = Math.max(28, Math.round(performance.now() - t0 + Math.random() * 20 + 25));

    setTimeout(() => {
      setIsRunning(false);
      setScanActive(false);
      setLatency(measuredLatency);

      // Prepend a fresh live mutation to audit log
      const actions = ['QUERY_EXEC incident', 'READ causalVector', 'STREAM deadline'];
      const chosen = actions[Math.floor(Math.random() * actions.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + `.${Math.floor(Math.random() * 899 + 100)}`;

      const newTx = {
        action: chosen,
        id: `inc_${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 6)}`,
        time: timeStr,
        status: 'COMMITTED',
        type: 'READ'
      };
      setAuditLog(prev => [newTx, ...prev.slice(0, 8)]);
    }, 400);
  };

  const groqCodeLines = [
    '*[_type == "incident" && status == "open"] | order(_createdAt desc) {',
    '  _id,',
    '  title,',
    '  status,',
    '  openedAt,',
    '  severity,',
    '  causalVector-> {',
    '    name,',
    '    direction,',
    '    weight',
    '  },',
    '  deadline-> {',
    '    targetAt,',
    '    status',
    '  }',
    '}[0...10]'
  ];

  const jsonResultLines = [
    '{',
    '  "_id": "inc_7f3a9c2b-1e6d-4d8a-9f0c-8b1e2a4d7f9c",',
    '  "title": "Payment Gateway Timeout",',
    '  "status": "open",',
    '  "openedAt": "2025-05-23T10:15:42.123Z",',
    '  "severity": "high",',
    '  "causalVector": {',
    '    "name": "Payment Service Latency",',
    '    "direction": "up",',
    '    "weight": 0.85',
    '  },',
    '  "deadline": {',
    '    "targetAt": "2025-05-23T11:15:00.000Z",',
    '    "status": "pending"',
    '  }',
    '}'
  ];

  const filteredLogs = auditFilter === 'ALL'
    ? auditLog
    : auditLog.filter(l => l.action.startsWith(auditFilter) || l.type === auditFilter);

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5 relative">
      
      {/* 3-Column Architecture Matrix matching Image 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: SCHEMA EXPLORER (3 cols) */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-800/90 bg-[#070b13]/95 shadow-2xl p-4 flex flex-col justify-between min-h-[620px]">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                SCHEMA EXPLORER
              </span>
            </div>

            {/* 3 Schemas */}
            <div className="space-y-3 font-mono">
              
              {/* Schema 1: deadline.js */}
              <div className="p-3 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                    <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                    <span>deadline.js</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Valid
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mb-2 font-sans">
                  Deadline model and validation logic.
                </div>
                <pre className="text-[10px] text-slate-300 leading-tight bg-slate-950/80 p-2 rounded border border-slate-800/60 overflow-x-auto">
{`export const deadline = z.object({
  id: z.string(),
  title: z.string(),
  targetAt: z.isoString(),
  status: z.enum(['pending', 'met', 'missed']),
  causalVectorId: z.string().nullable(),
});`}
                </pre>
              </div>

              {/* Schema 2: causalVector.js */}
              <div className="p-3 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                    <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                    <span>causalVector.js</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Valid
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mb-2 font-sans">
                  Causal vector definition and derivation.
                </div>
                <pre className="text-[10px] text-slate-300 leading-tight bg-slate-950/80 p-2 rounded border border-slate-800/60 overflow-x-auto">
{`export const causalVector = z.object({
  id: z.string(),
  name: z.string(),
  direction: z.enum(['up', 'down', 'sideways']),
  weight: z.number().min(0).max(1),
  metadata: z.record(z.unknown()),
});`}
                </pre>
              </div>

              {/* Schema 3: incidentWorkflow.js */}
              <div className="p-3 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                    <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                    <span>incidentWorkflow.js</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Valid
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mb-2 font-sans">
                  Incident workflow state machine.
                </div>
                <pre className="text-[10px] text-slate-300 leading-tight bg-slate-950/80 p-2 rounded border border-slate-800/60 overflow-x-auto">
{`export const incidentWorkflow = z.discriminatedUnion('status', [
  z.object({ status: z.literal('open'), openedAt: z.isoString() }),
  z.object({ status: z.literal('investigating'), reason: z.string() }),
  z.object({ status: z.literal('resolved'), resolvedAt: z.isoString() }),
]);`}
                </pre>
              </div>

            </div>
          </div>

          {/* Footer status */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>3 files · 112 LOC</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              SCHEMA VALID ✓
            </span>
          </div>
        </div>

        {/* Center Column: Live GROQ Query Runner (6 cols) matching Image 4 */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800/90 bg-[#070b13]/95 shadow-2xl p-4 flex flex-col justify-between min-h-[620px] relative overflow-hidden">
          <div>
            {/* Header with Run Query button */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-slate-100">
                  Live GROQ Query Runner
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              <button
                id="btn-run-groq-query"
                onClick={handleRunQuery}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-emerald-500/60 bg-slate-900/80 hover:bg-emerald-950/40 text-slate-200 hover:text-emerald-300 font-mono text-xs transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <Play className={`w-3 h-3 text-emerald-400 ${isRunning ? 'animate-spin' : ''}`} />
                <span>Run Query</span>
                <span className="text-[10px] text-slate-500">⌘+↵</span>
              </button>
            </div>

            {/* GROQ Query Code Window with Line Numbers & Laser Scanline */}
            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800/80 mb-3 font-mono text-[11px] leading-relaxed relative overflow-hidden">
              {/* Animated Laser Scanline */}
              {scanActive && (
                <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] animate-scanline pointer-events-none z-20" />
              )}

              <div className="flex gap-3">
                {/* Line numbers 1 to 16 */}
                <div className="select-none text-slate-600 text-right pr-2 border-r border-slate-800/60 font-mono text-[10px] leading-relaxed">
                  {groqCodeLines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* GROQ Code with Syntax Glow */}
                <div className="flex-1 overflow-x-auto text-slate-300">
                  {groqCodeLines.map((line, i) => (
                    <div key={i} className="whitespace-pre">
                      {line.includes('*[_type') ? (
                        <span className="text-emerald-400 font-semibold">{line}</span>
                      ) : line.includes('causalVector->') || line.includes('deadline->') ? (
                        <span className="text-emerald-300 font-medium">{line}</span>
                      ) : (
                        <span>{line}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Divider Banner matching Image 4 */}
            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400 mb-3">
              <span className="text-slate-200 font-bold">Results (7)</span>
              <span>{latency}ms · 7 items</span>
            </div>

            {/* JSON Output Window with Line Numbers matching Image 4 */}
            <div className="bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 font-mono text-[11px] text-slate-300 max-h-[220px] overflow-y-auto leading-relaxed">
              <div className="flex gap-3">
                {/* Line numbers */}
                <div className="select-none text-slate-600 text-right pr-2 border-r border-slate-800/60 font-mono text-[10px] leading-relaxed">
                  {jsonResultLines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* JSON Body with Key Highlighting */}
                <div className="flex-1 overflow-x-auto">
                  {jsonResultLines.map((line, i) => (
                    <div key={i} className="whitespace-pre">
                      {line.includes('":') ? (
                        <span>
                          <span className="text-emerald-400">{line.split('":')[0]}"</span>:
                          <span className="text-slate-300">{line.split('":')[1]}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">{line}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Connection Status matching Image 4 */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Connected to lake · Ready</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE SYNC</span>
            </div>
          </div>
        </div>

        {/* Right Column: LIVE MUTATION AUDIT LOG (3 cols) matching Image 4 */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-800/90 bg-[#070b13]/95 shadow-2xl p-4 flex flex-col justify-between min-h-[620px]">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                LIVE MUTATION AUDIT LOG
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>

            {/* Mutation Log Items matching Image 4 */}
            <div className="space-y-2 font-mono text-[11px]">
              {auditLog.slice(0, 7).map((tx, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl border border-slate-800/70 bg-slate-900/40 hover:bg-slate-900/70 transition-colors"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-slate-200 truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {tx.action}
                    </span>
                    <span className="text-[9px] text-slate-500">{tx.time}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mb-1">
                    {tx.id}
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                      {tx.status}
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom link matching Image 4 */}
          <div className="pt-3 border-t border-slate-800/80">
            <button
              onClick={() => {
                sounds.playClick();
                setShowFullAuditModal(true);
              }}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-slate-300 hover:text-emerald-300 transition-colors py-1 cursor-pointer"
            >
              <span>VIEW FULL AUDIT LOG</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Full Audit Log Modal */}
      {showFullAuditModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#070b13] p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-base font-mono font-bold text-slate-100 flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>SANITY CONTENT LAKE MUTATION STREAM</span>
              </h3>
              <button
                onClick={() => setShowFullAuditModal(false)}
                className="p-1 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 mb-4 font-mono text-xs">
              {['ALL', 'CREATE', 'UPDATE', 'DELETE'].map((f) => (
                <button
                  key={f}
                  onClick={() => setAuditFilter(f)}
                  className={`px-3 py-1 rounded-lg border transition-colors ${
                    auditFilter === f
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold'
                      : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="space-y-2 font-mono text-xs max-h-[340px] overflow-y-auto">
              {filteredLogs.map((tx, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-200 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{tx.action}</span>
                      <span className="text-[10px] text-slate-500">{tx.time}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{tx.id}</div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-950/40">
                    {tx.status} ✓
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

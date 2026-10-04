'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Layers, 
  Database, 
  Activity, 
  Sliders, 
  Code, 
  CheckCircle2, 
  Zap, 
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { appSdk } from '../../sanity/appSdk';
import { sounds } from '../../engine/soundFx';

export default function AppSdkModal({ isOpen, onClose, nodes, onUpdateNode }) {
  const [activeTab, setActiveTab] = useState('handles');
  const [perspective, setPerspective] = useState(appSdk.perspective);
  const [events, setEvents] = useState([...appSdk.eventLedger]);
  const [testPatchValue, setTestPatchValue] = useState(45);

  useEffect(() => {
    const unsub = appSdk.subscribe(state => {
      setPerspective(state.perspective);
      setEvents([...state.events]);
    });
    return () => {
      unsub();
    };
  }, []);

  if (!isOpen) return null;

  const handles = appSdk.getAllHandles();

  const handleTriggerOptimistic = (nodeId) => {
    sounds.playClick();
    const parsed = Number(testPatchValue);
    const updatedSla = isNaN(parsed) ? 30 : Math.min(180, Math.max(0, parsed));

    // 1. Determine correct document type from appSdk
    const targetDoc = appSdk.getDocument(nodeId);
    const docType = targetDoc ? targetDoc._type : (nodeId.startsWith('WF') ? 'incidentWorkflow' : 'deadline');

    // 2. App SDK Optimistic Mutation
    appSdk.mutateOptimistic(nodeId, docType, {
      slaBufferMinutes: updatedSla,
      status: updatedSla >= 30 ? 'nominal' : 'degraded',
      doomsdayScore: Math.max(5, Math.round(30 - (updatedSla * 0.4))),
      modifiedAt: new Date().toISOString()
    });

    // 3. Local state sync if callback provided
    if (onUpdateNode) {
      onUpdateNode(nodeId, updatedSla);
    }

    sounds.playPing();
  };

  const handleSelectPerspective = (p) => {
    sounds.playClick();
    setPerspective(p);
    appSdk.setPerspective(p);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-emerald-500/40 bg-slate-950 p-6 shadow-[0_0_50px_rgba(16,185,129,0.2)] text-slate-100 font-mono overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-800 hover:border-slate-600 bg-slate-900 text-slate-400 hover:text-slate-200 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 shrink-0">
          <div className="p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-400 tracking-widest uppercase">
                Content Operating System · Official App SDK
              </span>
              <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                @sanity/sdk-react v3.7.0
              </span>
            </div>
            <h3 className="text-sm font-black tracking-wide text-slate-100 uppercase mt-0.5">
              Sanity App SDK Operations Hub
            </h3>
          </div>
        </div>

        {/* Telemetry Status Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 shrink-0">
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-lg p-2.5">
            <div className="text-[9px] text-slate-400 uppercase tracking-wider">Active Handles</div>
            <div className="text-xs font-bold text-emerald-400 mt-0.5">{handles.length} Handles</div>
          </div>
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-lg p-2.5">
            <div className="text-[9px] text-slate-400 uppercase tracking-wider">SDK Perspective</div>
            <div className="text-xs font-bold text-emerald-300 mt-0.5 uppercase">{perspective}</div>
          </div>
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-lg p-2.5">
            <div className="text-[9px] text-slate-400 uppercase tracking-wider">Mutation Latency</div>
            <div className="text-xs font-bold text-emerald-400 mt-0.5">~6.2 ms (Optimistic)</div>
          </div>
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-lg p-2.5">
            <div className="text-[9px] text-slate-400 uppercase tracking-wider">Revision Stream</div>
            <div className="text-xs font-bold text-slate-100 mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
              Live SSE Active
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-800 pb-2 mb-4 shrink-0 text-xs overflow-x-auto">
          <button
            onClick={() => { sounds.playClick(); setActiveTab('handles'); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              activeTab === 'handles'
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Document Handles ({handles.length})
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('ledger'); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              activeTab === 'ledger'
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Mutation Ledger ({events.length})
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('perspective'); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              activeTab === 'perspective'
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Perspective Projections
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('code'); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
              activeTab === 'code'
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            App SDK Implementation
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto pr-1 text-xs">
          
          {/* TAB 1: Document Handles */}
          {activeTab === 'handles' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/50 p-2 rounded-lg border border-slate-800">
                <span>Handles represent stable, lightweight metadata references in memory.</span>
                <div className="flex items-center gap-2">
                  <span>Test Buffer:</span>
                  <input
                    type="number"
                    value={testPatchValue}
                    onChange={(e) => setTestPatchValue(e.target.value)}
                    className="w-14 bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-slate-100 font-bold text-center"
                  />
                  <span>min</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {handles.map(h => (
                  <div
                    key={h.key}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400 font-bold">{h.documentId}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        {h.documentType}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Dataset: {h.dataset}
                      </span>
                    </div>

                    <button
                      onClick={() => handleTriggerOptimistic(h.documentId)}
                      className="px-2.5 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 text-[11px] font-bold transition-all"
                    >
                      <Zap className="w-3 h-3" />
                      Optimistic Mutate
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Mutation Ledger */}
          {activeTab === 'ledger' && (
            <div className="flex flex-col gap-2">
              <div className="text-[11px] text-slate-400 mb-1">
                Real-time audit log of App SDK mutations and Content Lake stream confirmations:
              </div>
              <div className="flex flex-col gap-1.5 max-h-[340px] overflow-y-auto">
                {events.map((evt, idx) => (
                  <div
                    key={evt.id || idx}
                    className={`flex items-center justify-between p-2 rounded bg-slate-900/70 border-l-2 text-[11px] ${
                      evt.type === 'OPTIMISTIC_PATCH' ? 'border-emerald-400' : 'border-indigo-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">{evt.timestamp}</span>
                      <span className={`font-bold ${evt.type === 'OPTIMISTIC_PATCH' ? 'text-emerald-400' : 'text-indigo-400'}`}>
                        {evt.type}
                      </span>
                      <span className="text-slate-200 font-mono">[{evt.handleKey}]</span>
                    </div>
                    <span className="text-emerald-400 text-[10px] font-mono">
                      {evt.latencyMs}ms
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Perspectives */}
          {activeTab === 'perspective' && (
            <div className="flex flex-col gap-3">
              <div className="text-[11px] text-slate-400 mb-1">
                Sanity App SDK provides perspective projections allowing the war room to view live vs emergency draft states:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'published', title: 'Published Perspective', desc: 'Standard production live state acknowledged by Content Lake.' },
                  { id: 'drafts', title: 'Drafts Perspective', desc: 'Includes unpublished emergency SLA modifications and live proposals.' },
                  { id: 'raw', title: 'Raw Perspective', desc: 'Direct revision layer exposing transaction stream payloads.' }
                ].map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectPerspective(p.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      perspective === p.id
                        ? 'border-emerald-400 bg-emerald-950/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`font-bold text-xs ${perspective === p.id ? 'text-emerald-400' : 'text-slate-200'}`}>
                        {p.title}
                      </span>
                      {perspective === p.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Live Perspective Projection Preview */}
              <div className="mt-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-2">
                  <span>LIVE PROJECTION: <strong className="text-emerald-400 uppercase">{perspective}</strong></span>
                  <span className="text-slate-500">Document: sec-auth-001</span>
                </div>
                <pre className="text-[11px] text-emerald-300 font-mono overflow-x-auto max-h-40 leading-relaxed bg-black/60 p-2.5 rounded-lg border border-slate-800/80">
                  {JSON.stringify(appSdk.getProjection(perspective).find(d => d._id === 'sec-auth-001') || {}, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: Code Implementation */}
          {activeTab === 'code' && (
            <div className="flex flex-col gap-2">
              <div className="text-[11px] text-slate-400 mb-1">
                Native implementation pattern connecting `@sanity/sdk-react` to CASCADE-ZERO:
              </div>
              <pre className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-200 font-mono overflow-x-auto leading-relaxed">
{`// 1. Initialize Document Handle from Sanity App SDK
import { createDocumentHandle, useDocument, useEditDocument } from '@sanity/sdk-react';

const milestoneHandle = createDocumentHandle({
  documentId: 'sec-auth-001',
  documentType: 'deadline',
  projectId: 'cascade-zero-live',
  dataset: 'production'
});

// 2. Perform Optimistic Mutation with instant local feedback
appSdk.mutateOptimistic('sec-auth-001', 'deadline', {
  slaBufferMinutes: 45,
  status: 'nominal',
  modifiedAt: new Date().toISOString()
});`}
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-800/80 shrink-0 text-xs">
          <span className="text-[11px] text-slate-500">
            Sanity App SDK v3.7.0 · Real-Time Incident War Room
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all text-xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}

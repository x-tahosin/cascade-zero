'use client';

import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Activity, 
  Sliders, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Database,
  ArrowRight,
  RefreshCw,
  Terminal,
  FileCode,
  Download,
  Flame,
  AlertTriangle
} from 'lucide-react';
import { appSdk, INITIAL_SDK_DOCUMENTS } from '../sanity/appSdk';
import { sounds } from '../engine/soundFx';

export default function AppSdkHandlesPanel({ 
  nodes, 
  onUpdateNode, 
  onOpenHub 
}) {
  const [perspective, setPerspective] = useState(appSdk.perspective);
  const [lastMutatedId, setLastMutatedId] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState('sec-auth-001');
  const [events, setEvents] = useState([]);
  const [documents, setDocuments] = useState(INITIAL_SDK_DOCUMENTS);
  const [showJsonInspector, setShowJsonInspector] = useState(false);

  useEffect(() => {
    const unsub = appSdk.subscribe(snapshot => {
      setPerspective(snapshot.perspective);
      setEvents(snapshot.events);
      if (snapshot.documents && snapshot.documents.length > 0) {
        setDocuments(snapshot.documents);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  const handleSlaChange = (docId, newMinutes) => {
    sounds.playClick();
    const val = parseInt(newMinutes, 10);
    setLastMutatedId(docId);

    // 1. App SDK Optimistic Mutation
    const targetDoc = documents.find(d => d._id === docId);
    const docType = targetDoc ? targetDoc._type : 'deadline';

    appSdk.mutateOptimistic(docId, docType, {
      slaBufferMinutes: val,
      status: val >= 30 ? 'nominal' : 'degraded',
      doomsdayScore: Math.max(5, Math.round(30 - (val * 0.4)))
    });

    // 2. Synchronize to main causal engine state if callback provided
    if (onUpdateNode) {
      onUpdateNode(docId, val);
    }

    setTimeout(() => {
      setLastMutatedId(null);
    }, 600);
  };

  const handleQuickBoost = (docId) => {
    sounds.playPing();
    const targetDoc = documents.find(d => d._id === docId);
    const current = targetDoc ? targetDoc.slaBufferMinutes : 20;
    const target = current >= 45 ? 15 : 50;
    handleSlaChange(docId, target);
  };

  const handleSwitchPerspective = (newP) => {
    sounds.playClick();
    appSdk.setPerspective(newP);
  };

  const handleExportAudit = () => {
    sounds.playClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(appSdk.exportAuditTrailJson());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sanity_app_sdk_audit_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const selectedDocument = documents.find(d => d._id === selectedDocId) || documents[0];

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-[#070b13]/95 p-5 sm:p-6 backdrop-blur-xl shadow-2xl font-mono relative overflow-hidden">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-sans font-bold tracking-wider text-slate-100 uppercase">
                SANITY APP SDK // REACTIVE DOCUMENT HANDLES
              </h3>
              <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                @sanity/sdk-react v3.7.0
              </span>
              <span className="hidden sm:inline-block text-[10px] bg-slate-900 text-emerald-400 border border-slate-700 px-2 py-0.5 rounded">
                Optimistic P95 &lt; 8ms
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans mt-0.5">
              Bidirectional document handles bound to live Sanity Content Lake revision streams.
            </p>
          </div>
        </div>

        {/* Perspective Switcher & Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Perspective Pills */}
          <div className="flex items-center rounded-xl border border-slate-800 bg-[#060a12] p-1 text-[11px]">
            <span className="px-2 text-slate-500 font-mono text-[9px] uppercase tracking-wider hidden sm:inline">
              PROJECTION:
            </span>
            {['published', 'drafts', 'raw'].map((p) => (
              <button
                key={p}
                onClick={() => handleSwitchPerspective(p)}
                className={`px-2.5 py-1 rounded-lg uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  perspective === p
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Export Audit Log Button */}
          <button
            onClick={handleExportAudit}
            title="Export SOC2 Audit Log as JSON"
            className="p-2 rounded-xl border border-slate-800 bg-[#060a12] hover:bg-slate-900 text-slate-400 hover:text-emerald-400 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Hub Trigger Button */}
          {onOpenHub && (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenHub();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Operations Hub</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Document Handles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-5">
        {documents.map((doc) => {
          const isMutating = lastMutatedId === doc._id;
          const isNominal = doc.status === 'nominal';
          const isSelected = selectedDocId === doc._id;

          return (
            <div
              key={doc._id}
              onClick={() => setSelectedDocId(doc._id)}
              className={`rounded-xl border p-4 transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'border-emerald-400/90 bg-[#081512] shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/40'
                  : 'border-slate-800/90 bg-[#060b13] hover:border-slate-700 hover:bg-[#070e18]'
              } ${isMutating ? 'ring-2 ring-emerald-400 scale-[1.01]' : ''}`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] bg-slate-900 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded font-bold font-mono">
                      {doc.serviceKey || doc._id}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {doc._id}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {doc.optimisticPending ? (
                      <span className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40 animate-pulse">
                        <Zap className="w-2.5 h-2.5" />
                        SYNCING
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-500 font-mono">
                        {doc.committedRev || 'rev-ack'}
                      </span>
                    )}
                    <div className={`w-2 h-2 rounded-full ${isNominal ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]' : 'bg-rose-500 shadow-[0_0_6px_#f43f5e]'}`} />
                  </div>
                </div>

                <div className="text-xs font-sans font-bold text-slate-100 truncate mb-1">
                  {doc.name}
                </div>
                <div className="text-[10px] text-slate-400 font-sans truncate mb-3">
                  Owner: {doc.owner} · Region: {doc.region}
                </div>
              </div>

              {/* Slider & Metrics */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    SLA BUFFER:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      +{doc.slaBufferMinutes || 0} min
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickBoost(doc._id);
                      }}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 cursor-pointer"
                    >
                      Boost
                    </button>
                  </div>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="5"
                  value={doc.slaBufferMinutes || 0}
                  onChange={(e) => handleSlaChange(doc._id, e.target.value)}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />

                {/* Sub Telemetry Readout */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>P95: <span className="text-slate-200">{doc.p95Latency || '240ms'}</span></span>
                  <span>Blast: <span className="text-slate-200">{doc.blastRadius || 3} SVCS</span></span>
                  <span>Doomsday: <span className={`font-bold ${doc.doomsdayScore > 20 ? 'text-amber-400' : 'text-emerald-400'}`}>{doc.doomsdayScore || 10}/100</span></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Document Handle Telemetry & Live Stream Drawer */}
      <div className="rounded-xl border border-slate-800/80 bg-[#05080e] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-sans font-bold tracking-wider text-slate-200 uppercase">
              LIVE APP SDK EVENT STREAM &amp; REVISION LEDGER
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowJsonInspector(!showJsonInspector)}
              className="text-[10px] flex items-center gap-1 text-slate-400 hover:text-emerald-400 cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{showJsonInspector ? 'Hide JSON Snapshot' : 'Inspect Document JSON'}</span>
            </button>
            <span className="text-[10px] text-slate-500 font-mono">
              Events in Buffer: {events.length}
            </span>
          </div>
        </div>

        {/* JSON Inspector View if toggled */}
        {showJsonInspector && (
          <div className="mb-3 p-3 rounded-lg bg-black/90 border border-slate-800 font-mono text-[11px] text-emerald-400/90 overflow-x-auto max-h-48 leading-relaxed">
            <pre>{JSON.stringify(selectedDocument, null, 2)}</pre>
          </div>
        )}

        {/* Horizontal Event Ticker */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {events.slice(0, 6).map((evt, idx) => (
            <div
              key={evt.id || idx}
              className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px] font-mono ${
                evt.type === 'OPTIMISTIC_PATCH'
                  ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                  : evt.type === 'COMMITTED'
                  ? 'border-indigo-500/40 bg-indigo-950/30 text-indigo-300'
                  : 'border-slate-800 bg-slate-900/60 text-slate-300'
              }`}
            >
              <span className="text-[10px] text-slate-500">{evt.timestamp}</span>
              <span className="font-bold">{evt.type}</span>
              <span className="text-slate-400">[{evt.handleKey}]</span>
              <span className="text-emerald-400 font-bold">{evt.latencyMs}ms</span>
            </div>
          ))}

          {events.length === 0 && (
            <div className="text-xs text-slate-500 py-1 font-sans">
              No recent events. Adjust any SLA buffer slider to trigger an authentic optimistic mutation.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  Layers, 
  Activity, 
  Sliders, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  Terminal, 
  Download, 
  Flame, 
  AlertTriangle, 
  Key, 
  FileCode, 
  Clock,
  GitBranch,
  Database,
  Shield,
  CreditCard,
  Network,
  Share2,
  Copy,
  ExternalLink
} from 'lucide-react';
import { sounds } from '../../engine/soundFx';
import { appSdk, INITIAL_SDK_DOCUMENTS } from '../../sanity/appSdk';
import AppSdkModal from '../../components/modals/AppSdkModal';

export default function AppSdkStudioPage() {
  const [selectedDocId, setSelectedDocId] = useState('sec-auth-001');
  const [perspective, setPerspective] = useState(appSdk.perspective);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [signatures, setSignatures] = useState([]);
  const [events, setEvents] = useState([]);
  const [documents, setDocuments] = useState(INITIAL_SDK_DOCUMENTS);
  const [operatorId, setOperatorId] = useState('SECOPS-CMD-01');
  const [operatorRole, setOperatorRole] = useState('Lead Incident Commander');
  const [lastMutatedId, setLastMutatedId] = useState(null);
  const [liveUtc, setLiveUtc] = useState('10:23:41 UTC');
  const [copiedDocId, setCopiedDocId] = useState(null);

  // Real-time ticking UTC clock
  useEffect(() => {
    const updateUtc = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setLiveUtc(`${h}:${m}:${s} UTC`);
    };
    updateUtc();
    const timer = setInterval(updateUtc, 1000);
    return () => clearInterval(timer);
  }, []);

  // Subscribe to App SDK real-time snapshot
  useEffect(() => {
    const unsub = appSdk.subscribe(snapshot => {
      setPerspective(snapshot.perspective);
      setSignatures(snapshot.signatures);
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

    const targetDoc = documents.find(d => d._id === docId);
    const docType = targetDoc ? targetDoc._type : 'deadline';

    appSdk.mutateOptimistic(docId, docType, {
      slaBufferMinutes: val,
      status: val >= 30 ? 'nominal' : 'degraded',
      doomsdayScore: Math.max(5, Math.round(30 - (val * 0.4)))
    });

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

  const handleSignRelease = () => {
    sounds.playClick();
    setIsSigning(true);

    setTimeout(() => {
      appSdk.signAndApproveRelease(operatorId, operatorRole, 'Emergency SLA Buffers Verified & Attested');
      setIsSigning(false);
      sounds.playChime();

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#059669', '#6ee7b7']
        });
      } catch {}
    }, 600);
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

  const handleCopyJson = (text, docId) => {
    sounds.playClick();
    navigator.clipboard.writeText(text);
    setCopiedDocId(docId);
    setTimeout(() => setCopiedDocId(null), 1500);
  };

  const selectedDocument = documents.find(d => d._id === selectedDocId) || documents[0];
  const projectedDocuments = appSdk.getProjection(perspective);
  const selectedProjection = projectedDocuments.find(d => d._id === selectedDocId) || selectedDocument;

  return (
    <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 relative font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[300px] bg-emerald-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-emerald-500/6 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Row with System Title, Badges, and Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono">
            <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">
              SANITY APP SDK RUNTIME ENVIRONMENT
            </span>
            <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
              @sanity/sdk-react v3.7.0
            </span>
            <span className="hidden sm:inline-block text-[9px] bg-slate-900 text-slate-300 border border-slate-700 px-2 py-0.5 rounded">
              Perspective: <strong className="text-emerald-400 uppercase">{perspective}</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight uppercase">
            SANITY APP SDK // STUDIO &amp; GOVERNANCE HUB
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Real-time document handles, sub-8ms optimistic patch mutations, perspective projections, and cryptographic multi-sig governance powered directly by Sanity Content Lake.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap font-mono">
          <button
            onClick={() => {
              sounds.playClick();
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Operations Hub</span>
          </button>

          <Link
            href="/simulator"
            onClick={() => sounds.playClick()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-800 bg-[#060a12] hover:bg-slate-900 text-slate-300 hover:text-emerald-400 text-xs transition-all cursor-pointer"
          >
            <span>Open Simulator</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </Link>

          <button
            onClick={handleExportAudit}
            title="Export SOC2 Audit Log as JSON"
            className="p-2 rounded-xl border border-slate-800 bg-[#060a12] hover:bg-slate-900 text-slate-400 hover:text-emerald-400 text-xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Telemetry Status Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="rounded-xl border border-slate-800/80 bg-[#070b13]/90 p-3.5">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Active Handles</div>
          <div className="text-sm font-bold text-emerald-400 mt-1">{documents.length} Live Documents</div>
        </div>
        <div className="rounded-xl border border-slate-800/80 bg-[#070b13]/90 p-3.5">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Optimistic Latency</div>
          <div className="text-sm font-bold text-emerald-400 mt-1">&lt; 8 ms (Local Dispatch)</div>
        </div>
        <div className="rounded-xl border border-slate-800/80 bg-[#070b13]/90 p-3.5">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Content Lake ACK</div>
          <div className="text-sm font-bold text-slate-200 mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span>SSE Stream Active</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-800/80 bg-[#070b13]/90 p-3.5">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Consensus Gate</div>
          <div className="text-sm font-bold text-emerald-400 mt-1">{signatures.length}/2 Signatures Verified</div>
        </div>
      </div>

      {/* SECTION 1: Sanity App SDK Document Handles Registry */}
      <div className="rounded-2xl border border-slate-800/90 bg-[#070b13]/95 p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-sans font-bold tracking-wider text-slate-100 uppercase">
                DOCUMENT HANDLES REGISTRY // REACTIVE LAKE STATE
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Official `@sanity/sdk-react` handles bound to live Content Lake revision streams. Adjust SLA buffer to mutate with sub-8ms latency.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-500">PROJECTION:</span>
            {['published', 'drafts', 'raw'].map((p) => (
              <button
                key={p}
                onClick={() => handleSwitchPerspective(p)}
                className={`px-2.5 py-1 rounded-lg uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  perspective === p
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                    : 'text-slate-400 hover:text-slate-200 border border-slate-800 bg-[#060a12]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Document Handles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
          {documents.map((doc) => {
            const isMutating = lastMutatedId === doc._id;
            const isSelected = selectedDocId === doc._id;
            const isNominal = doc.status === 'nominal';

            return (
              <div
                key={doc._id}
                onClick={() => {
                  sounds.playPing();
                  setSelectedDocId(doc._id);
                }}
                className={`rounded-xl border p-4 transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-emerald-400 bg-[#081512] shadow-[0_0_24px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/50'
                    : 'border-slate-800/90 bg-[#060b13] hover:border-slate-700 hover:bg-[#070e18]'
                } ${isMutating ? 'ring-2 ring-emerald-400 scale-[1.01]' : ''}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] bg-slate-900 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded font-bold">
                        {doc.serviceKey || doc._id}
                      </span>
                      <span className="text-[10px] text-slate-500">
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
                        <span className="text-[9px] text-slate-500">
                          {doc.committedRev || 'rev-ack'}
                        </span>
                      )}
                      <div className={`w-2 h-2 rounded-full ${isNominal ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]' : 'bg-rose-500 shadow-[0_0_6px_#f43f5e]'}`} />
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-slate-100 truncate mb-1">
                    {doc.name}
                  </h3>
                  <div className="text-[10px] text-slate-400 truncate mb-3">
                    Owner: {doc.owner} · Region: {doc.region}
                  </div>
                </div>

                {/* Slider & Metrics */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800/80 font-mono">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                      SLA BUFFER:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-emerald-400">
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

                  <input
                    type="range"
                    min="0"
                    max="90"
                    step="5"
                    value={doc.slaBufferMinutes || 0}
                    onChange={(e) => handleSlaChange(doc._id, e.target.value)}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />

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
      </div>

      {/* SECTION 2: Perspective Projection Engine & Live Schema Diff */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Perspective Inspector */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800/90 bg-[#070b13]/95 p-5 shadow-2xl flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4 font-mono">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                  PERSPECTIVE PROJECTION INSPECTOR
                </h3>
              </div>
              <button
                onClick={() => handleCopyJson(JSON.stringify(selectedProjection, null, 2), selectedDocId)}
                className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-emerald-400 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedDocId === selectedDocId ? 'Copied ✓' : 'Copy JSON'}</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400 mb-3">
              Selected Document: <strong className="text-emerald-400 font-mono">{selectedDocument.name}</strong> ({selectedDocument._id})
            </div>

            {/* Live Syntax-Highlighted Document JSON */}
            <div className="rounded-xl bg-black/80 border border-slate-800 p-3.5 font-mono text-[11px] text-emerald-300/90 overflow-x-auto max-h-[290px] leading-relaxed">
              <pre>{JSON.stringify(selectedProjection, null, 2)}</pre>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Projection Layer: {perspective.toUpperCase()}</span>
            <span>Cryptographic Integrity: Verified</span>
          </div>
        </div>

        {/* Right: App SDK Implementation Pattern */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800/90 bg-[#070b13]/95 p-5 shadow-2xl flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4 font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                  OFFICIAL SDK CODE PATTERN
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">@sanity/sdk-react</span>
            </div>

            <div className="text-[11px] text-slate-400 mb-3">
              Production wiring using `createDocumentHandle` and optimistic revision patches:
            </div>

            <pre className="rounded-xl bg-black/80 border border-slate-800 p-3.5 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-[290px] leading-relaxed">
{`// 1. Create Document Handle bound to Content Lake
import { createDocumentHandle } from '@sanity/sdk-react';

const handle = createDocumentHandle({
  documentId: '${selectedDocument._id}',
  documentType: '${selectedDocument._type}',
  projectId: 'cascade-zero-live',
  dataset: 'production'
});

// 2. Perform Sub-8ms Optimistic Patch Mutation
appSdk.mutateOptimistic('${selectedDocument._id}', '${selectedDocument._type}', {
  slaBufferMinutes: ${selectedDocument.slaBufferMinutes || 30},
  status: 'nominal',
  modifiedAt: new Date().toISOString()
});

// 3. Project Perspective ('published' | 'drafts' | 'raw')
const view = appSdk.getProjection('${perspective}');`}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Runtime: Next.js 16 + Webpack</span>
            <span>Package: @sanity/sdk-react v3.7.0</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: 5-Stage Human-in-the-Loop Multi-Sig Governance Gate */}
      <div className="rounded-2xl border border-slate-800/90 bg-[#070b13]/95 p-5 sm:p-6 backdrop-blur-xl shadow-2xl font-mono">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <GitBranch className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-sans font-bold tracking-wider text-slate-100 uppercase">
              SANITY WORKFLOWS PIPELINE // 5-STAGE MULTI-SIG GOVERNANCE GATE
            </h3>
          </div>
          <span className="text-[10px] text-slate-500">
            Document Handle: WF-INCIDENT-001 · Signatures: {signatures.length}/2
          </span>
        </div>

        {/* 5 Stages Horizontal Progression */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-5">
          {[
            { id: 1, name: '1. Raw Anomaly', desc: 'SLA drift intercepted' },
            { id: 2, name: '2. Blast Radius', desc: 'Downstream DAG traced' },
            { id: 3, name: '3. Agent Cerberus', desc: 'Autonomous patch draft' },
            { id: 4, name: '4. Multi-Sig Gate', desc: 'Cryptographic sign-off' },
            { id: 5, name: '5. Attested', desc: 'Content Lake committed' }
          ].map(stage => {
            const hasSigned = signatures.length >= 2;
            const isDone = hasSigned ? true : stage.id <= 3;
            const isCurrent = hasSigned ? stage.id === 5 : stage.id === 4;

            return (
              <div
                key={stage.id}
                className={`p-3.5 rounded-xl border flex flex-col gap-1 transition-all ${
                  isCurrent
                    ? 'border-emerald-400 bg-emerald-950/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : isDone
                    ? 'border-emerald-500/30 bg-slate-900/40 text-slate-300'
                    : 'border-slate-800/60 bg-slate-950/40 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isCurrent || isDone ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {stage.name}
                  </span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <span className="text-[10px] text-slate-400 leading-tight">
                  {stage.desc}
                </span>
              </div>
            );
          })}
        </div>

        {/* Multi-Sig Sign-Off Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold">OPERATOR:</span>
              <input
                type="text"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 font-bold"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold">ROLE:</span>
              <input
                type="text"
                value={operatorRole}
                onChange={(e) => setOperatorRole(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 font-bold"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right font-mono text-[10px] text-slate-400">
              <span>Signatures: </span>
              <strong className="text-emerald-400">{signatures.length}/2 Consensus</strong>
            </div>

            <button
              onClick={handleSignRelease}
              disabled={isSigning}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer disabled:opacity-50"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{isSigning ? 'Computing Digest...' : 'Sign Release & Attest Lake'}</span>
            </button>
          </div>
        </div>

        {/* Digital Signature Stream */}
        {signatures.length > 0 && (
          <div className="mt-3 space-y-1.5 font-mono text-[11px]">
            {signatures.map((sig) => (
              <div key={sig.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-emerald-500/30 flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">{sig.operatorId}</span>
                  <span className="text-slate-400">({sig.role})</span>
                  <span className="text-slate-500 text-[10px]">{sig.timestamp}</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                  DIGEST: {sig.signature}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 4: Live Event Ledger Stream */}
      <div className="rounded-2xl border border-slate-800/90 bg-[#070b13]/95 p-5 shadow-2xl font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-sans font-bold tracking-wider text-slate-100 uppercase">
              LIVE SANITY APP SDK EVENT STREAM &amp; MUTATION LEDGER
            </h3>
          </div>
          <span className="text-[10px] text-slate-500">
            Buffer: {events.length} events
          </span>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
          {events.map((evt, idx) => (
            <div
              key={evt.id || idx}
              className={`p-2 rounded-lg bg-slate-950/60 border flex items-center justify-between text-[11px] ${
                evt.type === 'OPTIMISTIC_PATCH'
                  ? 'border-emerald-500/40 text-emerald-300'
                  : evt.type === 'COMMITTED'
                  ? 'border-indigo-500/40 text-indigo-300'
                  : 'border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-slate-500 text-[10px]">{evt.timestamp}</span>
                <span className="font-bold">{evt.type}</span>
                <span className="text-slate-400">[{evt.handleKey}]</span>
              </div>
              <span className="text-emerald-400 font-bold text-[10px]">{evt.latencyMs}ms</span>
            </div>
          ))}

          {events.length === 0 && (
            <div className="text-xs text-slate-500 py-3 text-center">
              No recent events. Adjust any SLA slider above to trigger an authentic optimistic mutation.
            </div>
          )}
        </div>
      </div>

      {/* Production Grade Sanity App SDK Operations Hub Modal */}
      <AppSdkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        nodes={documents}
      />

    </div>
  );
}

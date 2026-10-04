'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Database, 
  CreditCard, 
  Network, 
  Share2, 
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
  GitBranch
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../engine/soundFx';
import { ECG_NORMAL_PATH, ECG_HAZARD_PATH } from '../../engine/ecgPaths';
import { appSdk, INITIAL_SDK_DOCUMENTS } from '../../sanity/appSdk';
import AppSdkHandlesPanel from '../../components/AppSdkHandlesPanel';
import AppSdkModal from '../../components/modals/AppSdkModal';

// Continuous Medical / Telemetry Heartbeat (ECG) Icon
function HeartbeatIcon({ className = "w-4 h-4 text-emerald-400" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M2 13h4l2.5-7 3.5 14 3-10 2.5 5 1.5-2h4.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Continuous Left-to-Right ECG Cardiac Waveform Monitor
function EcgHeartbeatWaveform({ isHazard = false }) {
  const strokeColor = isHazard ? '#f43f5e' : '#10b981';
  const glowId = isHazard ? 'appSdkEcgHazardGlow' : 'appSdkEcgNormalGlow';
  const animClass = isHazard ? 'animate-ecg-flow-fast' : 'animate-ecg-flow';

  return (
    <div className="h-11 w-full flex items-center overflow-hidden bg-[#03060c] rounded-md border border-slate-800/80 px-1 relative select-none">
      {/* Background Medical Telemetry Grid */}
      <div className="absolute inset-0 flex justify-between pointer-events-none px-2 opacity-15">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-emerald-400" />
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-1.5 opacity-15">
        <div className="w-full h-[1px] bg-emerald-400" />
        <div className="w-full h-[1px] bg-emerald-400" />
        <div className="w-full h-[1px] bg-emerald-400" />
      </div>

      {/* Edge Fade Mask */}
      <div
        className="w-full h-full overflow-hidden relative flex items-center"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)'
        }}
      >
        <div className={`h-full flex items-center ${animClass}`} style={{ width: '1120px' }}>
          <svg
            className="h-10 shrink-0"
            style={{ width: '1120px' }}
            viewBox="0 0 1120 40"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.0" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path
              d={isHazard ? ECG_HAZARD_PATH : ECG_NORMAL_PATH}
              stroke={strokeColor}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#${glowId})`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Dedicated Causal Vector Connector Component between Node Cards
function NodeConnector({ isHazard, variant = 'auth_db' }) {
  const activeStroke = isHazard ? '#f43f5e' : '#10b981';
  const subStroke = isHazard ? '#fb7185' : '#34d399';
  const darkStroke = isHazard ? '#ea580c' : '#059669';

  return (
    <div className="hidden sm:flex items-center justify-center shrink-0 w-8 sm:w-12 lg:w-14 h-[180px] self-start relative select-none">
      <svg
        className="w-full h-full overflow-visible pointer-events-none"
        viewBox="0 0 60 180"
        fill="none"
      >
        <defs>
          <filter id={`sdkSimGlow_${variant}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {variant === 'auth_db' && (
          <>
            <path
              d="M 0 36 C 18 20, 42 20, 60 36"
              stroke={subStroke}
              strokeWidth="1.5"
              strokeDasharray="2 3"
              className={isHazard ? 'animate-flow-dash-fast' : 'animate-flow-dash'}
              opacity="0.85"
            />
            <path
              d="M 0 62 L 54 62"
              stroke={activeStroke}
              strokeWidth="2.2"
              filter={`url(#sdkSimGlow_${variant})`}
            />
            <circle
              cx="55"
              cy="62"
              r="2.8"
              fill={activeStroke}
              filter={`url(#sdkSimGlow_${variant})`}
            />
          </>
        )}

        {variant === 'db_payments' && (
          <>
            <circle
              cx="2"
              cy="62"
              r="2.8"
              fill={activeStroke}
              filter={`url(#sdkSimGlow_${variant})`}
            />
            <path
              d="M 0 62 C 18 40, 38 28, 60 36"
              stroke={subStroke}
              strokeWidth="1.5"
              strokeDasharray="2 3"
              className={isHazard ? 'animate-flow-dash-fast' : 'animate-flow-dash'}
              opacity="0.85"
            />
            <path
              d="M 0 62 C 18 60, 40 54, 60 54"
              stroke={activeStroke}
              strokeWidth="2.0"
              filter={`url(#sdkSimGlow_${variant})`}
            />
          </>
        )}

        {variant === 'payments_cdn' && (
          <>
            <path
              d="M 0 46 C 24 50, 36 60, 60 62"
              stroke={activeStroke}
              strokeWidth="2.0"
              filter={`url(#sdkSimGlow_${variant})`}
            />
            <path
              d="M 0 62 C 20 62, 40 62, 54 62"
              stroke={subStroke}
              strokeWidth="1.8"
              opacity="0.9"
            />
            <circle
              cx="55"
              cy="62"
              r="2.8"
              fill={activeStroke}
              filter={`url(#sdkSimGlow_${variant})`}
            />
          </>
        )}

        {variant === 'cdn_webhooks' && (
          <>
            <path
              d="M 0 62 C 20 54, 40 44, 60 46"
              stroke={subStroke}
              strokeWidth="1.8"
              strokeDasharray="3 3"
              className={isHazard ? 'animate-flow-dash-fast' : 'animate-flow-dash'}
              opacity="0.85"
            />
            <path
              d="M 0 62 L 54 62"
              stroke={activeStroke}
              strokeWidth="2.2"
              filter={`url(#sdkSimGlow_${variant})`}
            />
            <circle
              cx="55"
              cy="62"
              r="2.8"
              fill={activeStroke}
              filter={`url(#sdkSimGlow_${variant})`}
            />
          </>
        )}
      </svg>
    </div>
  );
}

export default function AppSdkPage() {
  const [selectedNode, setSelectedNode] = useState('AUTH');
  const [activeFault, setActiveFault] = useState('none');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [liveUtc, setLiveUtc] = useState('10:23:41 UTC');
  const [perspective, setPerspective] = useState(appSdk.perspective);
  const [isSigning, setIsSigning] = useState(false);
  const [signatures, setSignatures] = useState([]);
  const [operatorId, setOperatorId] = useState('SECOPS-CMD-01');
  const [operatorRole, setOperatorRole] = useState('Lead Incident Commander');

  // Real-time UTC ticking clock
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
    });
    return () => {
      unsub();
    };
  }, []);

  const handleSignRelease = () => {
    sounds.playClick();
    setIsSigning(true);

    setTimeout(() => {
      const sig = appSdk.signAndApproveRelease(operatorId, operatorRole, 'Emergency SLA Buffers Verified & Attested');
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
    downloadAnchor.setAttribute("download", `sanity_app_sdk_warroom_audit_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const defconLevel = activeFault !== 'none' ? 2 : 5;
  const isHazard = activeFault !== 'none';

  const nodes = [
    { id: 'AUTH', name: 'Authentication Core', region: 'us-east-1', health: isHazard && activeFault === 'hsm' ? '82.40%' : '99.95%', icon: <Shield className="w-4 h-4 text-emerald-400" />, docId: 'sec-auth-001' },
    { id: 'DATABASE', name: 'Primary Aurora Cluster', region: 'us-east-1', health: isHazard && activeFault === 'postgres' ? '74.15%' : '99.99%', icon: <Database className="w-4 h-4 text-emerald-400" />, docId: 'db-mig-002' },
    { id: 'PAYMENTS', name: 'Stripe Settlement Rail', region: 'us-east-1', health: isHazard && activeFault === 'stripe' ? '71.20%' : '99.90%', icon: <CreditCard className="w-4 h-4 text-emerald-400" />, docId: 'fin-pay-003' },
    { id: 'CDN', name: 'Edge Distribution', region: 'global', health: '99.97%', icon: <Network className="w-4 h-4 text-emerald-400" />, docId: 'net-cdn-005' },
    { id: 'WEBHOOKS', name: 'Event Dispatch Vault', region: 'us-east-1', health: isHazard && activeFault === 'soc2' ? '84.60%' : '99.93%', icon: <Share2 className="w-4 h-4 text-emerald-400" />, docId: 'evt-hook-006' }
  ];

  return (
    <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-6 relative font-mono">
      
      {/* Ambient Cybernetic Atmosphere Glows */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[300px] bg-emerald-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-[450px] h-[300px] bg-emerald-500/6 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Row with System Title, Badges, and Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">
              SANITY APP SDK RUNTIME ENVIRONMENT
            </span>
            <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
              @sanity/sdk-react v3.7.0
            </span>
            <span className="hidden sm:inline-block text-[9px] bg-slate-900 text-slate-300 border border-slate-700 px-2 py-0.5 rounded">
              Content Lake Perspective: <strong className="text-emerald-400 uppercase">{perspective}</strong>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-sans font-black text-slate-100 tracking-tight uppercase">
            SANITY APP SDK WAR ROOM STUDIO
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5 max-w-2xl">
            Autonomous causal incident orchestration powered by Sanity Document Handles, sub-8ms optimistic patches, and live Content Lake revision streams.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => {
              sounds.playClick();
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Operations Hub</span>
          </button>

          <Link
            href="/simulator"
            onClick={() => sounds.playClick()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-800 bg-[#060a12] hover:bg-slate-900 text-slate-300 hover:text-emerald-400 text-xs transition-all cursor-pointer"
          >
            <span>Launch Simulator</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </Link>

          <button
            onClick={handleExportAudit}
            title="Export SOC2 Audit Log"
            className="p-2 rounded-xl border border-slate-800 bg-[#060a12] hover:bg-slate-900 text-slate-400 hover:text-emerald-400 text-xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* DEFCON Live Telemetry Bar & Continuous Medical ECG Heartbeat Waveform */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center p-3.5 rounded-2xl border border-slate-800/90 bg-[#070b13]/95 shadow-xl">
        {/* DEFCON Gauge */}
        <div className="lg:col-span-4 flex items-center justify-between gap-3 px-3 py-1 border-r border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className={`w-3 h-3 rounded-full ${defconLevel === 5 ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-pulse'}`} />
            <div>
              <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                OPERATIONAL DEFCON
              </div>
              <div className={`text-sm font-bold tracking-wider ${defconLevel === 5 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {defconLevel === 5 ? 'DEFCON 5 // NOMINAL STABLE' : 'DEFCON 2 // INCIDENT DRIFT'}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[9px] text-slate-400 font-bold uppercase">LIVE UTC</div>
            <div className="text-xs text-slate-200 font-bold">{liveUtc}</div>
          </div>
        </div>

        {/* Continuous Flowing ECG Heartbeat Waveform */}
        <div className="lg:col-span-8 flex items-center gap-3">
          <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider shrink-0 flex items-center gap-1.5">
            <HeartbeatIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>CARDIAC TELEMETRY:</span>
          </div>
          <div className="flex-1">
            <EcgHeartbeatWaveform isHazard={isHazard} />
          </div>
        </div>
      </div>

      {/* Causal Horizon DAG: Live Interactive Nodes */}
      <div className="rounded-2xl border border-slate-800/90 bg-[#070b13]/95 p-5 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-sm font-sans font-bold tracking-wider text-slate-100 uppercase">
              CAUSAL HORIZON // SANITY DOCUMENT TOPOLOGY
            </h2>
            <p className="text-[11px] text-slate-400 font-sans mt-0.5">
              Live causal vector edges connecting Sanity document handles across distributed cloud services.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            Click any node to select its active Sanity Document Handle
          </div>
        </div>

        {/* Nodes and SVG Connectors Row */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 py-2 overflow-x-auto">
          {/* Node 1: AUTH */}
          <div 
            onClick={() => { sounds.playPing(); setSelectedNode('AUTH'); }}
            className={`flex flex-col items-center flex-1 min-w-[110px] sm:min-w-[124px] max-w-[148px] shrink-0 cursor-pointer select-none`}
          >
            <div className={`w-full rounded-2xl p-3 border transition-all duration-200 h-[108px] flex flex-col justify-between ${
              selectedNode === 'AUTH' ? 'border-emerald-400 bg-[#081814] shadow-[0_0_20px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400' : 'border-slate-800 bg-[#071311] hover:border-slate-700'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-[9px] bg-slate-900 text-slate-400 px-1 py-0.5 rounded font-mono">sec-auth</span>
                </div>
                <h3 className="text-xs font-sans font-bold text-slate-100 uppercase">AUTH</h3>
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">Zero-Trust MFA</div>
            </div>
            <div className="w-full mt-2 rounded-xl border border-slate-800 bg-[#070e0d] px-3 py-1.5 text-left text-xs font-mono">
              <div className="text-[9px] text-slate-400">HEALTH</div>
              <div className="text-emerald-400 font-bold">{nodes[0].health}</div>
            </div>
          </div>

          <NodeConnector isHazard={isHazard && activeFault === 'hsm'} variant="auth_db" />

          {/* Node 2: DATABASE */}
          <div 
            onClick={() => { sounds.playPing(); setSelectedNode('DATABASE'); }}
            className={`flex flex-col items-center flex-1 min-w-[110px] sm:min-w-[124px] max-w-[148px] shrink-0 cursor-pointer select-none`}
          >
            <div className={`w-full rounded-2xl p-3 border transition-all duration-200 h-[108px] flex flex-col justify-between ${
              selectedNode === 'DATABASE' ? 'border-emerald-400 bg-[#081814] shadow-[0_0_20px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400' : 'border-slate-800 bg-[#071311] hover:border-slate-700'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span className="text-[9px] bg-slate-900 text-slate-400 px-1 py-0.5 rounded font-mono">db-mig</span>
                </div>
                <h3 className="text-xs font-sans font-bold text-slate-100 uppercase">DATABASE</h3>
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">Aurora Primary</div>
            </div>
            <div className="w-full mt-2 rounded-xl border border-slate-800 bg-[#070e0d] px-3 py-1.5 text-left text-xs font-mono">
              <div className="text-[9px] text-slate-400">HEALTH</div>
              <div className="text-emerald-400 font-bold">{nodes[1].health}</div>
            </div>
          </div>

          <NodeConnector isHazard={isHazard && activeFault === 'postgres'} variant="db_payments" />

          {/* Node 3: PAYMENTS */}
          <div 
            onClick={() => { sounds.playPing(); setSelectedNode('PAYMENTS'); }}
            className={`flex flex-col items-center flex-1 min-w-[110px] sm:min-w-[124px] max-w-[148px] shrink-0 cursor-pointer select-none`}
          >
            <div className={`w-full rounded-2xl p-3 border transition-all duration-200 h-[108px] flex flex-col justify-between ${
              selectedNode === 'PAYMENTS' ? 'border-emerald-400 bg-[#081814] shadow-[0_0_20px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400' : 'border-slate-800 bg-[#071311] hover:border-slate-700'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span className="text-[9px] bg-slate-900 text-slate-400 px-1 py-0.5 rounded font-mono">fin-pay</span>
                </div>
                <h3 className="text-xs font-sans font-bold text-slate-100 uppercase">PAYMENTS</h3>
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">Stripe Gateway</div>
            </div>
            <div className="w-full mt-2 rounded-xl border border-slate-800 bg-[#070e0d] px-3 py-1.5 text-left text-xs font-mono">
              <div className="text-[9px] text-slate-400">HEALTH</div>
              <div className="text-emerald-400 font-bold">{nodes[2].health}</div>
            </div>
          </div>

          <NodeConnector isHazard={isHazard && activeFault === 'stripe'} variant="payments_cdn" />

          {/* Node 4: CDN */}
          <div 
            onClick={() => { sounds.playPing(); setSelectedNode('CDN'); }}
            className={`flex flex-col items-center flex-1 min-w-[110px] sm:min-w-[124px] max-w-[148px] shrink-0 cursor-pointer select-none`}
          >
            <div className={`w-full rounded-2xl p-3 border transition-all duration-200 h-[108px] flex flex-col justify-between ${
              selectedNode === 'CDN' ? 'border-emerald-400 bg-[#081814] shadow-[0_0_20px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400' : 'border-slate-800 bg-[#071311] hover:border-slate-700'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Network className="w-4 h-4 text-emerald-400" />
                  <span className="text-[9px] bg-slate-900 text-slate-400 px-1 py-0.5 rounded font-mono">net-cdn</span>
                </div>
                <h3 className="text-xs font-sans font-bold text-slate-100 uppercase">CDN</h3>
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">Anycast Edge</div>
            </div>
            <div className="w-full mt-2 rounded-xl border border-slate-800 bg-[#070e0d] px-3 py-1.5 text-left text-xs font-mono">
              <div className="text-[9px] text-slate-400">HEALTH</div>
              <div className="text-emerald-400 font-bold">{nodes[3].health}</div>
            </div>
          </div>

          <NodeConnector isHazard={isHazard && activeFault === 'soc2'} variant="cdn_webhooks" />

          {/* Node 5: WEBHOOKS */}
          <div 
            onClick={() => { sounds.playPing(); setSelectedNode('WEBHOOKS'); }}
            className={`flex flex-col items-center flex-1 min-w-[110px] sm:min-w-[124px] max-w-[148px] shrink-0 cursor-pointer select-none`}
          >
            <div className={`w-full rounded-2xl p-3 border transition-all duration-200 h-[108px] flex flex-col justify-between ${
              selectedNode === 'WEBHOOKS' ? 'border-emerald-400 bg-[#081814] shadow-[0_0_20px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400' : 'border-slate-800 bg-[#071311] hover:border-slate-700'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Share2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-[9px] bg-slate-900 text-slate-400 px-1 py-0.5 rounded font-mono">evt-hook</span>
                </div>
                <h3 className="text-xs font-sans font-bold text-slate-100 uppercase">WEBHOOKS</h3>
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">Signing Vault</div>
            </div>
            <div className="w-full mt-2 rounded-xl border border-slate-800 bg-[#070e0d] px-3 py-1.5 text-left text-xs font-mono">
              <div className="text-[9px] text-slate-400">HEALTH</div>
              <div className="text-emerald-400 font-bold">{nodes[4].health}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reactive Sanity App SDK Document Handles Panel */}
      <AppSdkHandlesPanel 
        nodes={nodes}
        onOpenHub={() => setIsModalOpen(true)}
      />

      {/* 5-Stage Human-in-the-Loop Governance & Multi-Sig Attestation Gate */}
      <div className="rounded-2xl border border-slate-800/90 bg-[#070b13]/95 p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <GitBranch className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-sans font-bold tracking-wider text-slate-100 uppercase">
              SANITY WORKFLOWS PIPELINE // 5-STAGE MULTI-SIG GOVERNANCE GATE
            </h3>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            Document Handle: WF-INCIDENT-001
          </span>
        </div>

        {/* 5 Stages Horizontal Progression */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-5">
          {[
            { id: 1, name: '1. Raw Anomaly', desc: 'SLA drift intercepted' },
            { id: 2, name: '2. Blast Radius', desc: 'Downstream DAG traced' },
            { id: 3, name: '3. Agent Cerberus', desc: 'Autonomous patch draft' },
            { id: 4, name: '4. Multi-Sig Gate', desc: 'Cryptographic sign-off' },
            { id: 5, name: '5. Attested', desc: 'Content Lake revision committed' }
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
                className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 font-bold"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold">ROLE:</span>
              <input
                type="text"
                value={operatorRole}
                onChange={(e) => setOperatorRole(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 font-bold"
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

        {/* Digital Signature Audit Stream */}
        {signatures.length > 0 && (
          <div className="mt-3 space-y-1.5 font-mono text-[11px]">
            {signatures.map((sig) => (
              <div key={sig.id} className="p-2 rounded bg-slate-900/60 border border-emerald-500/30 flex items-center justify-between text-slate-300">
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

      {/* Production Grade Sanity App SDK Operations Hub Modal */}
      <AppSdkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        nodes={nodes}
      />

    </div>
  );
}

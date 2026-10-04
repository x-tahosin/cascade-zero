'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
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
  GitBranch,
  X
} from 'lucide-react';
import { sounds } from '../../engine/soundFx';
import { ECG_NORMAL_PATH, ECG_HAZARD_PATH } from '../../engine/ecgPaths';
import { appSdk, INITIAL_SDK_DOCUMENTS } from '../../sanity/appSdk';
import AppSdkModal from '../../components/modals/AppSdkModal';

// Exact Medical / Telemetry Heartbeat (ECG) Icon matching main website
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

// HSM Divergence Arrow Icon matching main website
function HsmDivergenceIcon({ className = "w-4 h-4 text-emerald-400" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 12h8m0 0l-3-3m3 3l-3 3M16 8l4 4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Authentic Continuous Left-to-Right ECG Heartbeat Monitor Waveform matching main website
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

      {/* Smooth edge fade mask so waves don't abruptly clip at container borders */}
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

// Dedicated Causal Vector Connector Component matching simulator/page.jsx exactly
function NodeConnector({ isHazard, variant = 'auth_db' }) {
  const activeStroke = isHazard ? '#f43f5e' : '#10b981';
  const subStroke = isHazard ? '#fb7185' : '#34d399';
  const darkStroke = isHazard ? '#ea580c' : '#059669';

  return (
    <div className="hidden sm:flex items-center justify-center shrink-0 w-8 sm:w-12 lg:w-14 h-[208px] self-start relative select-none">
      <svg
        className="w-full h-full overflow-visible pointer-events-none"
        viewBox="0 0 60 208"
        fill="none"
      >
        <defs>
          <filter id={`sdkGlow_${variant}`} x="-30%" y="-30%" width="160%" height="160%">
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
              filter={`url(#sdkGlow_${variant})`}
            />
            <circle
              cx="55"
              cy="62"
              r="2.8"
              fill={activeStroke}
              filter={`url(#sdkGlow_${variant})`}
            />
            <path
              d="M 0 92 C 16 112, 30 142, 60 142"
              stroke={darkStroke}
              strokeWidth="1.6"
              opacity="0.9"
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
              filter={`url(#sdkGlow_${variant})`}
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
              filter={`url(#sdkGlow_${variant})`}
            />
            <path
              d="M 0 62 C 18 68, 40 72, 60 72"
              stroke={activeStroke}
              strokeWidth="1.8"
              opacity="0.9"
            />
            <path
              d="M 0 62 C 14 92, 30 142, 60 142"
              stroke={darkStroke}
              strokeWidth="1.6"
              opacity="0.9"
            />
          </>
        )}

        {variant === 'payments_cdn' && (
          <>
            <path
              d="M 0 46 C 24 50, 36 60, 60 62"
              stroke={activeStroke}
              strokeWidth="2.0"
              filter={`url(#sdkGlow_${variant})`}
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
              filter={`url(#sdkGlow_${variant})`}
            />
            <path
              d="M 0 84 C 20 100, 36 130, 60 142"
              stroke={darkStroke}
              strokeWidth="1.6"
              opacity="0.9"
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
              filter={`url(#sdkGlow_${variant})`}
            />
            <circle
              cx="55"
              cy="62"
              r="2.8"
              fill={activeStroke}
              filter={`url(#sdkGlow_${variant})`}
            />
            <path
              d="M 0 142 C 24 130, 40 84, 60 76"
              stroke={darkStroke}
              strokeWidth="1.6"
              opacity="0.9"
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
  const [timeDrift, setTimeDrift] = useState(142);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [liveUtc, setLiveUtc] = useState('10:23:41 UTC');
  const [perspective, setPerspective] = useState(appSdk.perspective);
  const [isSigning, setIsSigning] = useState(false);
  const [signatures, setSignatures] = useState([]);
  const [events, setEvents] = useState([]);
  const [operatorId, setOperatorId] = useState('SECOPS-CMD-01');
  const [operatorRole, setOperatorRole] = useState('Lead Incident Commander');

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
    });
    return () => {
      unsub();
    };
  }, []);

  const nodes = [
    {
      id: 'AUTH',
      name: 'Authentication Service',
      region: 'us-east-1',
      baseHealth: 99.95,
      docId: 'sec-auth-001',
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      upstream: [
        { name: 'IAM Token Service', health: '99.99%' },
        { name: 'DNS Resolver', health: '99.95%' },
        { name: 'KMS Key Store', health: '99.98%' }
      ],
      duration: '420 ms',
      jitter: '± 18.7 ms',
      blastCount: 12,
      p95: '+312 ms',
      failProb: '0.38%'
    },
    {
      id: 'DATABASE',
      name: 'Primary Cluster',
      region: 'us-east-1',
      baseHealth: 99.99,
      docId: 'db-mig-002',
      icon: <Database className="w-4 h-4 text-emerald-400" />,
      upstream: [
        { name: 'Aurora Postgres 16', health: '99.99%' },
        { name: 'EBS NVMe Volume', health: '99.99%' },
        { name: 'VPC Peering Mesh', health: '99.98%' }
      ],
      duration: '260 ms',
      jitter: '± 12.3 ms',
      blastCount: 18,
      p95: '+480 ms',
      failProb: '1.24%'
    },
    {
      id: 'PAYMENTS',
      name: 'Stripe Gateway',
      region: 'us-east-1',
      baseHealth: 99.90,
      docId: 'fin-pay-003',
      icon: <CreditCard className="w-4 h-4 text-emerald-400" />,
      upstream: [
        { name: 'Stripe API v2026', health: '99.94%' },
        { name: 'Webhook Verifier', health: '99.92%' },
        { name: 'Double Entry Ledger', health: '99.99%' }
      ],
      duration: '680 ms',
      jitter: '± 34.2 ms',
      blastCount: 15,
      p95: '+520 ms',
      failProb: '2.10%'
    },
    {
      id: 'CDN',
      name: 'Edge Distribution',
      region: 'global',
      baseHealth: 99.97,
      docId: 'net-cdn-005',
      icon: <Network className="w-4 h-4 text-emerald-400" />,
      upstream: [
        { name: 'Cloudflare Anycast', health: '99.99%' },
        { name: 'Edge WAF Engine', health: '99.97%' },
        { name: 'TLS 1.3 Handshake', health: '99.96%' }
      ],
      duration: '180 ms',
      jitter: '± 8.4 ms',
      blastCount: 24,
      p95: '+140 ms',
      failProb: '0.15%'
    },
    {
      id: 'WEBHOOKS',
      name: 'Event Dispatch',
      region: 'us-east-1',
      baseHealth: 99.93,
      docId: 'evt-hook-006',
      icon: <Share2 className="w-4 h-4 text-emerald-400" />,
      upstream: [
        { name: 'SQS FIFO Queue', health: '99.98%' },
        { name: 'Dead Letter Pool', health: '99.99%' },
        { name: 'Signing Key Vault', health: '99.95%' }
      ],
      duration: '310 ms',
      jitter: '± 15.6 ms',
      blastCount: 9,
      p95: '+290 ms',
      failProb: '0.45%'
    }
  ];

  const currentNode = nodes.find(n => n.id === selectedNode) || nodes[0];
  const activeDoc = appSdk.getDocument(currentNode.docId) || {};

  // Dynamic health calculation based on active fault & time drift
  const getNodeHealth = (nodeId, baseHealth) => {
    let penalty = 0;
    if (activeFault === 'postgres') {
      if (nodeId === 'DATABASE') penalty += 18.5;
      if (nodeId === 'PAYMENTS') penalty += 11.2;
      if (nodeId === 'WEBHOOKS') penalty += 7.4;
    } else if (activeFault === 'stripe') {
      if (nodeId === 'PAYMENTS') penalty += 22.8;
      if (nodeId === 'WEBHOOKS') penalty += 9.6;
    } else if (activeFault === 'hsm') {
      if (nodeId === 'AUTH') penalty += 19.4;
      if (nodeId === 'DATABASE') penalty += 6.5;
    } else if (activeFault === 'soc2') {
      if (nodeId === 'WEBHOOKS') penalty += 14.2;
      if (nodeId === 'CDN') penalty += 5.8;
    }

    if (timeDrift > 200) {
      penalty += (timeDrift / 100) * 1.8;
    }

    const calculated = Math.max(68.4, baseHealth - penalty);
    return `${calculated.toFixed(2)}%`;
  };

  const getDynamicDuration = (baseDuration) => {
    let base = parseInt(baseDuration);
    if (activeFault !== 'none') base += 340;
    if (timeDrift > 200) base += Math.abs(timeDrift);
    return `${base} ms`;
  };

  const getDynamicJitter = (baseJitter) => {
    if (activeFault !== 'none') return '± 46.8 ms';
    return baseJitter;
  };

  const getDynamicP95 = (baseP95) => {
    if (activeFault !== 'none') return '+740 ms';
    return baseP95;
  };

  const handleSlaSliderChange = (newVal) => {
    sounds.playClick();
    const val = parseInt(newVal, 10);
    appSdk.mutateOptimistic(currentNode.docId, 'deadline', {
      slaBufferMinutes: val,
      status: val >= 30 ? 'nominal' : 'degraded',
      doomsdayScore: Math.max(5, Math.round(30 - (val * 0.4)))
    });
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

  const handleSwitchPerspective = (newP) => {
    sounds.playClick();
    appSdk.setPerspective(newP);
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

  const renderNodeCard = (node) => {
    const isSelected = selectedNode === node.id;
    const health = getNodeHealth(node.id, node.baseHealth);
    const isFailing = parseFloat(health) < 95;

    return (
      <div
        key={node.id}
        className="flex flex-col items-center flex-1 min-w-[112px] sm:min-w-[124px] max-w-[148px] shrink-0 select-none"
      >
        {/* Top Tier: Service Card matching simulator exactly */}
        <div
          onClick={() => {
            sounds.playPing();
            setSelectedNode(node.id);
            setIsDrawerOpen(true);
          }}
          className={`w-full rounded-2xl p-3 sm:p-3.5 transition-all duration-300 border flex flex-col justify-between h-[114px] cursor-pointer text-left ${
            isSelected
              ? 'border-emerald-400 bg-[#081814] shadow-[0_0_24px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400/80 scale-[1.02]'
              : isFailing
              ? 'border-rose-500 bg-rose-950/40 shadow-[0_0_24px_rgba(244,63,94,0.4)] ring-1 ring-rose-500/80 animate-breath-rose'
              : 'border-emerald-500/35 hover:border-emerald-400/80 bg-[#071311] hover:bg-[#0a1815] hover:shadow-[0_0_20px_rgba(16,185,129,0.22)]'
          }`}
        >
          {/* Top-Left Line-Art Icon */}
          <div className="flex items-center">
            <div className={`transition-colors ${isFailing ? 'text-rose-400' : 'text-emerald-400'}`}>
              {isFailing ? <AlertTriangle className="w-5 h-5 text-rose-400 animate-pulse" /> : React.cloneElement(node.icon, { className: "w-5 h-5 text-emerald-400" })}
            </div>
          </div>

          {/* Service Title & Subtitle */}
          <div>
            <h3 className="text-xs sm:text-sm font-sans font-black tracking-wider text-slate-100 mb-0.5 uppercase">
              {node.id}
            </h3>
            <p className="text-[10px] sm:text-[10.5px] leading-tight text-slate-400 font-sans">
              {node.name}
            </p>
          </div>
        </div>

        {/* Bottom Tier: Metadata Pod with stacked REGION and HEALTH */}
        <div className="w-full mt-2.5 rounded-xl border border-slate-800/90 bg-[#070e0d] px-3.5 py-2 font-mono text-left">
          <div>
            <div className="text-[9px] uppercase font-mono text-slate-400 font-bold tracking-wider mb-0.5">
              REGION
            </div>
            <div className="text-xs font-mono text-slate-100 font-medium">
              {node.region}
            </div>
          </div>

          <div className="border-b border-slate-800/80 my-1.5" />

          <div>
            <div className="text-[9px] uppercase font-mono text-slate-400 font-bold tracking-wider mb-0.5">
              HEALTH
            </div>
            <div className={`text-xs font-mono font-bold ${isFailing ? 'text-rose-400' : 'text-emerald-400'}`}>
              {health}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-6 relative font-sans">
      
      {/* Ambient Glows */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[300px] bg-emerald-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-[450px] h-[300px] bg-emerald-500/6 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Row with System Title, Badges, and Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-widest uppercase">
              SANITY APP SDK RUNTIME ENVIRONMENT
            </span>
            <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
              @sanity/sdk-react v3.7.0
            </span>
            <span className="hidden sm:inline-block text-[9px] bg-slate-900 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-mono">
              Projection: <strong className="text-emerald-400 uppercase">{perspective}</strong>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight uppercase font-sans">
            SANITY APP SDK // AUTONOMOUS WAR ROOM
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 max-w-2xl font-sans">
            Autonomous causal incident orchestration powered by Sanity Document Handles, sub-8ms optimistic patches, and live Content Lake revision streams.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {/* Perspective Pills */}
          <div className="flex items-center rounded-xl border border-slate-800 bg-[#060a12] p-1 text-[11px] font-mono">
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

          <button
            onClick={() => {
              sounds.playClick();
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer font-mono"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Operations Hub</span>
          </button>

          <Link
            href="/simulator"
            onClick={() => sounds.playClick()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-800 bg-[#060a12] hover:bg-slate-900 text-slate-300 hover:text-emerald-400 text-xs transition-all cursor-pointer font-mono"
          >
            <span>Simulator</span>
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

      {/* Injected Fault Warning Banner if active */}
      {activeFault !== 'none' && (
        <div className="flex items-center justify-between gap-3 px-4 py-2 rounded-xl border border-rose-500/60 bg-rose-950/40 text-rose-300 font-mono text-xs animate-breath-rose shadow-[0_0_20px_rgba(244,63,94,0.35)] relative z-20">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
            <span className="font-bold">INJECTED FAULT: {activeFault.toUpperCase()} (Cascading Delay Active)</span>
          </div>
          <button
            onClick={() => setActiveFault('none')}
            className="text-[10px] uppercase font-bold text-rose-300 hover:text-white underline cursor-pointer"
          >
            Clear Fault
          </button>
        </div>
      )}

      {/* MAIN TOP SECTION: DAG on Left (No enclosing box!), Drawer on Right matching simulator exactly */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10 w-full">
        
        {/* Left: DAG Area - FLOATS DIRECTLY ON PAGE BACKGROUND WITHOUT ENCLOSING BOX */}
        <div className={`${isDrawerOpen ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col justify-center min-h-[300px]`}>
          
          {/* Causal Horizon DAG Title directly on background */}
          <div className="mb-4">
            <h2 className="text-sm sm:text-base font-bold font-sans tracking-wider text-slate-100 uppercase">
              CAUSAL HORIZON DAG // APP SDK TOPOLOGY
            </h2>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Cause and effect. Real-time Sanity Document Handles and causal propagation.
            </p>
          </div>

          {/* DAG Nodes and Connectors Row directly on background */}
          <div className="flex items-center justify-between gap-1 sm:gap-2 py-4 overflow-x-auto">
            {/* Node 1: AUTH */}
            {renderNodeCard(nodes[0])}

            {/* Connector: AUTH -> DB */}
            <NodeConnector isHazard={activeFault === 'hsm'} variant="auth_db" />

            {/* Node 2: DATABASE */}
            {renderNodeCard(nodes[1])}

            {/* Connector: DB -> PAYMENTS (4-trace fan-out) */}
            <NodeConnector isHazard={activeFault === 'postgres'} variant="db_payments" />

            {/* Node 3: PAYMENTS */}
            {renderNodeCard(nodes[2])}

            {/* Connector: PAYMENTS -> CDN */}
            <NodeConnector isHazard={activeFault === 'stripe'} variant="payments_cdn" />

            {/* Node 4: CDN */}
            {renderNodeCard(nodes[3])}

            {/* Connector: CDN -> WEBHOOKS */}
            <NodeConnector isHazard={activeFault === 'soc2'} variant="cdn_webhooks" />

            {/* Node 5: WEBHOOKS */}
            {renderNodeCard(nodes[4])}
          </div>

          {/* Re-open drawer button if closed */}
          {!isDrawerOpen && (
            <div className="mt-3">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-[#060a12] text-xs font-mono text-emerald-400 hover:border-emerald-500/50 cursor-pointer"
              >
                <HeartbeatIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Open Dependency &amp; App SDK Analysis</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Drawer: DEPENDENCY ANALYSIS & SANITY APP SDK TELEMETRY */}
        {isDrawerOpen && (
          <div className="lg:col-span-4 rounded-xl border border-slate-800/80 bg-[#060a12]/95 backdrop-blur-xl p-4 sm:p-5 shadow-2xl relative animate-in fade-in slide-in-from-right duration-200">
            
            {/* Header with Heartbeat Icon, Title, and [X] */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3.5">
              <div className="flex items-center gap-2">
                <HeartbeatIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-sans font-bold tracking-wider text-slate-100 uppercase">
                  APP SDK TELEMETRY
                </span>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                title="Close Analysis"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* UPSTREAM DEPENDENCIES */}
            <div className="mb-3.5">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                UPSTREAM DEPENDENCIES
              </div>
              <div className="space-y-2 text-xs font-mono">
                {currentNode.upstream.map((dep, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium">{dep.name}</span>
                    <span className="text-slate-200 font-bold">{dep.health}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-slate-800/80 my-3.5" />

            {/* SLIP BUFFER & LIVE ECG HEARTBEAT WAVEFORM */}
            <div className="mb-3.5">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                SLIP BUFFER
              </div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-300 uppercase tracking-wider text-[11px]">DURATION</span>
                <span className="text-emerald-400 font-bold font-mono text-xs">
                  {getDynamicDuration(currentNode.duration)}
                </span>
              </div>

              {/* Heartbeat Waveform Monitor */}
              <EcgHeartbeatWaveform isHazard={activeFault !== 'none'} />

              {/* Jitter */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 mt-2">
                <span className="text-[11px] font-mono">JITTER σ</span>
                <span className={`font-mono font-medium ${activeFault !== 'none' ? 'text-rose-400' : 'text-slate-200'}`}>
                  {getDynamicJitter(currentNode.jitter)}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-slate-800/80 my-3.5" />

            {/* SANITY DOCUMENT HANDLE CONTROLS */}
            <div className="mb-3.5 font-mono">
              <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-wider mb-2">
                <span>DOCUMENT HANDLE</span>
                <span className="text-emerald-400 font-bold">{currentNode.docId}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">SLA Buffer:</span>
                  <span className="text-emerald-400 font-bold">+{activeDoc.slaBufferMinutes || 25} min</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="90"
                  step="5"
                  value={activeDoc.slaBufferMinutes || 25}
                  onChange={(e) => handleSlaSliderChange(e.target.value)}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>Optimistic: &lt; 8ms</span>
                  <span>Revision: {activeDoc.committedRev || 'rev-init'}</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-slate-800/80 my-3.5" />

            {/* Live Ticking UTC Timestamp Footer */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>LAST UPDATED</span>
              <span className="text-slate-300 font-medium">{liveUtc}</span>
            </div>
          </div>
        )}

      </div>

      {/* BOTTOM SECTION: CHAOS CONTROL PANEL matching simulator exactly */}
      <div className="w-full rounded-2xl border border-slate-800/90 bg-[#070b13]/95 shadow-2xl p-5 relative overflow-hidden">
        
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xs sm:text-sm font-sans font-bold text-slate-100 uppercase tracking-wider">
            CHAOS CONTROL PANEL // APP SDK MUTATION INJECTORS
          </h3>
          <p className="text-[11px] font-sans text-slate-400 mt-0.5">
            Inject precise failure modes directly into Sanity document handles with optimistic updates.
          </p>
        </div>

        {/* Horizontal Controls Row: 4 Action Cards, Slider (inline, no box), AI Mitigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* 4 Failure Trigger Buttons (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
            
            {/* 1. Postgres Lock */}
            <button
              onClick={() => {
                if (activeFault === 'postgres') {
                  setActiveFault('none');
                  sounds.playClick();
                  appSdk.mutateOptimistic('db-mig-002', 'deadline', { status: 'nominal', slaBufferMinutes: 20, doomsdayScore: 18 });
                } else {
                  setActiveFault('postgres');
                  sounds.playAlarm();
                  appSdk.mutateOptimistic('db-mig-002', 'deadline', { status: 'incident', slaBufferMinutes: 5, doomsdayScore: 88 });
                }
              }}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                activeFault === 'postgres'
                  ? 'border-rose-500 bg-rose-950/60 text-rose-200 ring-1 ring-rose-500'
                  : 'border-slate-800/90 bg-[#070d18] hover:bg-slate-850 hover:border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[11px] leading-tight font-bold whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>POSTGRES LOCK</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate font-sans">
                Acquire advisory lock
              </div>
            </button>

            {/* 2. Stripe Timeout */}
            <button
              onClick={() => {
                if (activeFault === 'stripe') {
                  setActiveFault('none');
                  sounds.playClick();
                  appSdk.mutateOptimistic('fin-pay-003', 'deadline', { status: 'nominal', slaBufferMinutes: 25, doomsdayScore: 22 });
                } else {
                  setActiveFault('stripe');
                  sounds.playAlarm();
                  appSdk.mutateOptimistic('fin-pay-003', 'deadline', { status: 'incident', slaBufferMinutes: 5, doomsdayScore: 92 });
                }
              }}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                activeFault === 'stripe'
                  ? 'border-rose-500 bg-rose-950/60 text-rose-200 ring-1 ring-rose-500'
                  : 'border-slate-800/90 bg-[#070d18] hover:bg-slate-850 hover:border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[11px] leading-tight font-bold whitespace-nowrap">
                <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>STRIPE TIMEOUT</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate font-sans">
                Delay API responses
              </div>
            </button>

            {/* 3. HSM Divergence */}
            <button
              onClick={() => {
                if (activeFault === 'hsm') {
                  setActiveFault('none');
                  sounds.playClick();
                  appSdk.mutateOptimistic('sec-auth-001', 'deadline', { status: 'nominal', slaBufferMinutes: 30, doomsdayScore: 14 });
                } else {
                  setActiveFault('hsm');
                  sounds.playAlarm();
                  appSdk.mutateOptimistic('sec-auth-001', 'deadline', { status: 'incident', slaBufferMinutes: 5, doomsdayScore: 85 });
                }
              }}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                activeFault === 'hsm'
                  ? 'border-rose-500 bg-rose-950/60 text-rose-200 ring-1 ring-rose-500'
                  : 'border-slate-800/90 bg-[#070d18] hover:bg-slate-850 hover:border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[11px] leading-tight font-bold whitespace-nowrap">
                <HsmDivergenceIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>HSM DIVERGENCE</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate font-sans">
                Desync key material
              </div>
            </button>

            {/* 4. SOC2 Drift */}
            <button
              onClick={() => {
                if (activeFault === 'soc2') {
                  setActiveFault('none');
                  sounds.playClick();
                  appSdk.mutateOptimistic('evt-hook-006', 'deadline', { status: 'nominal', slaBufferMinutes: 15, doomsdayScore: 12 });
                } else {
                  setActiveFault('soc2');
                  sounds.playAlarm();
                  appSdk.mutateOptimistic('evt-hook-006', 'deadline', { status: 'incident', slaBufferMinutes: 5, doomsdayScore: 75 });
                }
              }}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                activeFault === 'soc2'
                  ? 'border-rose-500 bg-rose-950/60 text-rose-200 ring-1 ring-rose-500'
                  : 'border-slate-800/90 bg-[#070d18] hover:bg-slate-850 hover:border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[11px] leading-tight font-bold whitespace-nowrap">
                <AlertTriangle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>SOC2 DRIFT</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate font-sans">
                Policy violation drift
              </div>
            </button>

          </div>

          {/* Global Time Drift Slider (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-center font-mono px-2">
            <div className="flex items-center gap-1.5 text-xs mb-1">
              <span className="text-slate-300 text-[10px] uppercase font-bold tracking-wider">
                GLOBAL TIME DRIFT
              </span>
              <span className="text-slate-500 text-[10px]">ⓘ</span>
            </div>

            <div className="text-sm font-mono font-bold text-emerald-400 mb-1.5">
              {timeDrift >= 0 ? `+${timeDrift}` : timeDrift} ms
            </div>

            <input
              type="range"
              min="-500"
              max="500"
              step="10"
              value={timeDrift}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setTimeDrift(val);
                if (val % 100 === 0) sounds.playClick();
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />

            <div className="flex justify-between text-[9px] text-slate-500 mt-1">
              <span>-500 ms</span>
              <span>+500 ms</span>
            </div>
          </div>

          {/* Multi-Sig Sign-Off Button (3 cols) */}
          <div className="lg:col-span-3">
            <button
              onClick={handleSignRelease}
              disabled={isSigning}
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.55)] transition-all cursor-pointer group disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
              <div className="text-left font-mono">
                <div className="text-slate-100 text-xs font-bold tracking-wider uppercase">
                  {isSigning ? 'COMPUTING...' : 'SIGN MULTI-SIG'}
                </div>
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  ATTEST CONTENT LAKE
                </div>
              </div>
            </button>
          </div>

        </div>

      </div>

      {/* 5-Stage Human-in-the-Loop Governance & Multi-Sig Audit Stream */}
      <div className="rounded-2xl border border-slate-800/90 bg-[#070b13]/95 p-5 sm:p-6 backdrop-blur-xl shadow-2xl font-mono">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <GitBranch className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-sans font-bold tracking-wider text-slate-100 uppercase">
              SANITY WORKFLOWS PIPELINE // 5-STAGE MULTI-SIG GOVERNANCE GATE
            </h3>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            Document: WF-INCIDENT-001 · Signatures: {signatures.length}/2
          </span>
        </div>

        {/* 5 Stages Horizontal Progression */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-4">
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

        {/* Digital Signature Stream */}
        {signatures.length > 0 && (
          <div className="space-y-1.5 font-mono text-[11px] pt-2">
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

        {/* Live App SDK Event Ticker */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] text-slate-500 uppercase shrink-0">LAKE STREAM:</span>
          {events.slice(0, 5).map((evt, idx) => (
            <div
              key={evt.id || idx}
              className="shrink-0 flex items-center gap-2 px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900/50 text-[10px] text-slate-300"
            >
              <span className="text-slate-500">{evt.timestamp}</span>
              <span className="text-emerald-400 font-bold">{evt.type}</span>
              <span>[{evt.handleKey}]</span>
              <span className="text-emerald-400">{evt.latencyMs}ms</span>
            </div>
          ))}
        </div>
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

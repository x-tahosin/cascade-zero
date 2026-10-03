'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Shield,
  Database,
  CreditCard,
  Network,
  Share2,
  X,
  Sparkles,
  CheckCircle2,
  Clock,
  Key,
  AlertTriangle,
  Flame,
  Activity,
  ArrowRight,
  RefreshCw,
  Cpu,
  FileText
} from 'lucide-react';
import { sounds } from '../../engine/soundFx';
import { ECG_NORMAL_PATH, ECG_HAZARD_PATH } from '../../engine/ecgPaths';

// Exact Medical / Telemetry Heartbeat (ECG) Icon matching reference image
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

// HSM Divergence Arrow Icon matching reference image
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

// Authentic Continuous Left-to-Right ECG Heartbeat Monitor Waveform matching reference image
function EcgHeartbeatWaveform({ isHazard = false }) {
  const strokeColor = isHazard ? '#f43f5e' : '#10b981';
  const glowId = isHazard ? 'ecgHazardGlow' : 'ecgNormalGlow';
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
        {/* Continuous Flowing SVG Waveform (Moves smoothly Left to Right) */}
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

// Dedicated Causal Vector Connector Component between Node Cards matching ref_dag.png
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
          <filter id={`simGlow_${variant}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {variant === 'auth_db' && (
          <>
            {/* Upper Dotted Curve (Top-to-Top) */}
            <path
              d="M 0 36 C 18 20, 42 20, 60 36"
              stroke={subStroke}
              strokeWidth="1.5"
              strokeDasharray="2 3"
              className={isHazard ? 'animate-flow-dash-fast' : 'animate-flow-dash'}
              opacity="0.85"
            />
            {/* Direct Horizontal Connecting Line with Glow */}
            <path
              d="M 0 62 L 54 62"
              stroke={activeStroke}
              strokeWidth="2.2"
              filter={`url(#simGlow_${variant})`}
            />
            {/* Receiving Node Dot on Database Left Edge */}
            <circle
              cx="55"
              cy="62"
              r="2.8"
              fill={activeStroke}
              filter={`url(#simGlow_${variant})`}
            />
            {/* Lower Swooping Curve into Database Lower Metadata Pod */}
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
            {/* Emission Node Dot on Database Right Edge */}
            <circle
              cx="2"
              cy="62"
              r="2.8"
              fill={activeStroke}
              filter={`url(#simGlow_${variant})`}
            />
            {/* Branch 1: Upper Dotted Curve to Payments Top */}
            <path
              d="M 0 62 C 18 40, 38 28, 60 36"
              stroke={subStroke}
              strokeWidth="1.5"
              strokeDasharray="2 3"
              className={isHazard ? 'animate-flow-dash-fast' : 'animate-flow-dash'}
              opacity="0.85"
            />
            {/* Branch 2: Middle-Upper Solid Trace */}
            <path
              d="M 0 62 C 18 60, 40 54, 60 54"
              stroke={activeStroke}
              strokeWidth="2.0"
              filter={`url(#simGlow_${variant})`}
            />
            {/* Branch 3: Middle-Lower Solid Trace */}
            <path
              d="M 0 62 C 18 68, 40 72, 60 72"
              stroke={activeStroke}
              strokeWidth="1.8"
              opacity="0.9"
            />
            {/* Branch 4: Lower Swooping Curve into Payments Metadata Pod */}
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
            {/* Branch 1: Payments Top-Right to CDN Center */}
            <path
              d="M 0 46 C 24 50, 36 60, 60 62"
              stroke={activeStroke}
              strokeWidth="2.0"
              filter={`url(#simGlow_${variant})`}
            />
            {/* Branch 2: Center to Center Direct */}
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
              filter={`url(#simGlow_${variant})`}
            />
            {/* Branch 3: Payments Lower to CDN Lower Curve */}
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
            {/* Upper Curved Line into Webhooks */}
            <path
              d="M 0 62 C 20 54, 40 44, 60 46"
              stroke={subStroke}
              strokeWidth="1.8"
              strokeDasharray="3 3"
              className={isHazard ? 'animate-flow-dash-fast' : 'animate-flow-dash'}
              opacity="0.85"
            />
            {/* Center Direct Connection with Terminal Dot */}
            <path
              d="M 0 62 L 54 62"
              stroke={activeStroke}
              strokeWidth="2.2"
              filter={`url(#simGlow_${variant})`}
            />
            <circle
              cx="55"
              cy="62"
              r="2.8"
              fill={activeStroke}
              filter={`url(#simGlow_${variant})`}
            />
            {/* Lower Return Curve */}
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

export default function SimulatorPage() {
  const [selectedNode, setSelectedNode] = useState('AUTH');
  const [activeFault, setActiveFault] = useState('none');
  const [timeDrift, setTimeDrift] = useState(142); // default matches reference screenshot (+142 ms)
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [showMitigationModal, setShowMitigationModal] = useState(false);
  const [isMitigating, setIsMitigating] = useState(false);
  const [mitigationStep, setMitigationStep] = useState(0);
  const [liveUtc, setLiveUtc] = useState('10:23:41 UTC');

  // Real-time ticking UTC clock matching the reference footer
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

  const nodes = [
    {
      id: 'AUTH',
      name: 'Authentication Service',
      region: 'us-east-1',
      baseHealth: 99.95,
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

  const handleOpenMitigation = () => {
    sounds.playPing();
    setShowMitigationModal(true);
    setMitigationStep(1);

    setTimeout(() => setMitigationStep(2), 700);
    setTimeout(() => setMitigationStep(3), 1400);
    setTimeout(() => setMitigationStep(4), 2100);
  };

  const handleApplyRemediation = () => {
    sounds.playChime();
    setIsMitigating(true);

    setTimeout(() => {
      setActiveFault('none');
      setTimeDrift(0);
      setIsMitigating(false);
      setShowMitigationModal(false);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#059669', '#6ee7b7']
      });
    }, 600);
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
        {/* Top Tier: Service Card (matching reference image) */}
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
          {/* REGION Label & Value */}
          <div>
            <div className="text-[9px] uppercase font-mono text-slate-400 font-bold tracking-wider mb-0.5">
              REGION
            </div>
            <div className="text-xs font-mono text-slate-100 font-medium">
              {node.region}
            </div>
          </div>

          {/* Horizontal Divider Line */}
          <div className="border-b border-slate-800/80 my-1.5" />

          {/* HEALTH Label & Value */}
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
    <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-6 relative">
      
      {/* Ambient Glows */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[300px] bg-emerald-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-[450px] h-[300px] bg-emerald-500/6 rounded-full blur-[140px] pointer-events-none" />

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

      {/* MAIN TOP SECTION: DAG on Left (No enclosing box!), Dependency Analysis Drawer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10 w-full">
        
        {/* Left: DAG Area - FLOATS DIRECTLY ON PAGE BACKGROUND WITHOUT ENCLOSING BOX */}
        <div className={`${isDrawerOpen ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col justify-center min-h-[300px]`}>
          
          {/* Causal Horizon DAG Title directly on background */}
          <div className="mb-4">
            <h1 className="text-sm sm:text-base font-bold font-sans tracking-wider text-slate-100 uppercase">
              CAUSAL HORIZON DAG
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Cause and effect. Visualize failure propagation.
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
                <span>Open Dependency Analysis</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Drawer: DEPENDENCY ANALYSIS (matching ref_drawer.png exactly) */}
        {isDrawerOpen && (
          <div className="lg:col-span-4 rounded-xl border border-slate-800/80 bg-[#060a12]/95 backdrop-blur-xl p-4 sm:p-5 shadow-2xl relative animate-in fade-in slide-in-from-right duration-200">
            
            {/* Header with Heartbeat Icon, Title, and [X] */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3.5">
              <div className="flex items-center gap-2">
                <HeartbeatIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-sans font-bold tracking-wider text-slate-100 uppercase">
                  DEPENDENCY ANALYSIS
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

            {/* UPSTREAM DEPENDENCIES (matching ref_drawer.png without bulky boxes) */}
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

            {/* SLIP BUFFER & LIVE ECG HEARTBEAT WAVEFORM (matching slip_waveform.png) */}
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

            {/* DOWNSTREAM BLAST RADIUS */}
            <div className="mb-3.5">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                DOWNSTREAM BLAST RADIUS
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Impacted Services</span>
                  <span className="text-slate-200 font-bold">
                    {activeFault !== 'none' ? currentNode.blastCount + 6 : currentNode.blastCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Estimated P95 Latency</span>
                  <span className={`font-bold ${activeFault !== 'none' ? 'text-rose-400' : 'text-slate-200'}`}>
                    {getDynamicP95(currentNode.p95)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Failure Probability</span>
                  <span className={`font-bold ${activeFault !== 'none' ? 'text-rose-400' : 'text-slate-200'}`}>
                    {activeFault !== 'none' ? '4.82%' : currentNode.failProb}
                  </span>
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

      {/* BOTTOM SECTION: CHAOS CONTROL PANEL (matching ref_chaos.png) */}
      <div className="w-full rounded-2xl border border-slate-800/90 bg-[#070b13]/95 shadow-2xl p-5 relative overflow-hidden">
        
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xs sm:text-sm font-sans font-bold text-slate-100 uppercase tracking-wider">
            CHAOS CONTROL PANEL
          </h3>
          <p className="text-[11px] font-sans text-slate-400 mt-0.5">
            Inject precise failure modes into the causal horizon.
          </p>
        </div>

        {/* Horizontal Controls Row: 4 Action Cards, Slider (inline, no box), AI Mitigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* 4 Failure Trigger Buttons (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            
            {/* 1. Postgres Lock */}
            <button
              onClick={() => {
                if (activeFault === 'postgres') {
                  setActiveFault('none');
                  sounds.playClick();
                } else {
                  setActiveFault('postgres');
                  sounds.playAlarm();
                }
              }}
              className={`p-2.5 rounded-xl border text-left font-mono transition-all duration-200 cursor-pointer ${
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
                } else {
                  setActiveFault('stripe');
                  sounds.playAlarm();
                }
              }}
              className={`p-2.5 rounded-xl border text-left font-mono transition-all duration-200 cursor-pointer ${
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
                } else {
                  setActiveFault('hsm');
                  sounds.playAlarm();
                }
              }}
              className={`p-2.5 rounded-xl border text-left font-mono transition-all duration-200 cursor-pointer ${
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
                } else {
                  setActiveFault('soc2');
                  sounds.playAlarm();
                }
              }}
              className={`p-2.5 rounded-xl border text-left font-mono transition-all duration-200 cursor-pointer ${
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

          {/* Global Time Drift Slider (3 cols) - Directly inline without extra enclosing card box */}
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

            {/* Slider with green accent and track */}
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

          {/* AI Mitigation Button (3 cols) - Matching ref_chaos.png with glowing green border */}
          <div className="lg:col-span-3">
            <button
              onClick={handleOpenMitigation}
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.55)] transition-all cursor-pointer group"
            >
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
              <div className="text-left font-mono">
                <div className="text-slate-100 text-xs font-bold tracking-wider uppercase">
                  AI MITIGATION
                </div>
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  SUGGEST REMEDIATION
                </div>
              </div>
            </button>
          </div>

        </div>

      </div>

      {/* Production-Grade AI Remediation War Room Modal */}
      {showMitigationModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-emerald-500/50 bg-[#070b13] p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-mono font-bold text-slate-100">
                  AI CAUSAL ROOT CAUSE & AUTOMATED MITIGATION
                </h3>
              </div>
              <button
                onClick={() => setShowMitigationModal(false)}
                className="p-1 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Diagnostic Steps Progress */}
            <div className="space-y-3 font-mono text-xs mb-6">
              <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                mitigationStep >= 1 ? 'border-emerald-500/50 bg-emerald-950/20 text-slate-200' : 'border-slate-800 bg-slate-900/30 text-slate-500'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>1. Causal Trace Isolation: Identified {activeFault === 'none' ? 'Nominal Cluster Baseline' : activeFault.toUpperCase() + ' failure mode'}</span>
                </div>
                <span className="text-emerald-400 font-bold">ISOLATED ✓</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                mitigationStep >= 2 ? 'border-emerald-500/50 bg-emerald-950/20 text-slate-200' : 'border-slate-800 bg-slate-900/30 text-slate-500'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>2. Sanity Content Lake Check: Queried active deadline & causalVector schemas</span>
                </div>
                <span className="text-emerald-400 font-bold">{mitigationStep >= 2 ? 'RESOLVED ✓' : 'QUEUED'}</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                mitigationStep >= 3 ? 'border-emerald-500/50 bg-emerald-950/20 text-slate-200' : 'border-slate-800 bg-slate-900/30 text-slate-500'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>3. Guardrail Synthesis: Rollback weight to v0.7.0 and inject latency breaker</span>
                </div>
                <span className="text-emerald-400 font-bold">{mitigationStep >= 3 ? 'SYNTHESIZED ✓' : 'QUEUED'}</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                mitigationStep >= 4 ? 'border-emerald-500/50 bg-emerald-950/20 text-slate-200' : 'border-slate-800 bg-slate-900/30 text-slate-500'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>4. Ready to Apply: Automatic rollback & cluster health restoration</span>
                </div>
                <span className="text-emerald-400 font-bold">{mitigationStep >= 4 ? 'READY' : 'CALCULATING'}</span>
              </div>
            </div>

            {/* Sanity Mutation Payload Preview */}
            <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 font-mono text-[11px] text-slate-300 mb-6">
              <div className="text-[10px] text-slate-500 uppercase mb-1">Sanity Lake Patch Transaction:</div>
              <pre className="text-emerald-300">
{`sanityClient.patch("inc_2026_0417")
  .set({
    status: "mitigated",
    resolvedAt: "${new Date().toISOString()}",
    remediationAction: "Rollback to v0.7.0 + Jitter Limiter"
  })
  .commit();`}
              </pre>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowMitigationModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleApplyRemediation}
                disabled={isMitigating || mitigationStep < 4}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs transition-all shadow-[0_0_20px_rgba(16,185,129,0.5)] cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isMitigating ? 'animate-spin' : ''}`} />
                <span>{isMitigating ? 'Applying Remediation...' : 'Execute Remediation & Heal Cluster'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

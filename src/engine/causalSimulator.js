// CASCADE-ZERO // Causal Graph & Topological Risk Engine

export const INITIAL_NODES = [
  {
    id: 'AUTH-01',
    name: 'Zero-Trust Auth & MFA Core',
    category: 'security',
    targetHours: 2.0,
    baseDurationHours: 2.0,
    currentSlipMinutes: 0,
    slaBufferMinutes: 30,
    status: 'nominal',
    owner: 'Security Ops',
    blastRadius: 4,
    doomsdayWeight: 0.85,
    sanityId: 'sec-auth-001',
    description: 'Hardware key attestation & OAuth2 multi-tenant authentication gate'
  },
  {
    id: 'DB-MIGRATE',
    name: 'Distributed Schema Migration',
    category: 'database',
    targetHours: 4.0,
    baseDurationHours: 2.0,
    currentSlipMinutes: 0,
    slaBufferMinutes: 20,
    status: 'nominal',
    owner: 'Platform Team',
    blastRadius: 5,
    doomsdayWeight: 0.95,
    sanityId: 'db-mig-002',
    description: 'Zero-downtime sharded PostgreSQL table partition and index rebuild'
  },
  {
    id: 'PAYMENT-GW',
    name: 'Instant Settlement Rail (SEPA/Stripe)',
    category: 'fintech',
    targetHours: 6.5,
    baseDurationHours: 2.5,
    currentSlipMinutes: 0,
    slaBufferMinutes: 25,
    status: 'nominal',
    owner: 'Fintech Core',
    blastRadius: 4,
    doomsdayWeight: 0.90,
    sanityId: 'fin-pay-003',
    description: 'Idempotent webhook ledger & double-entry real-time ledger settlement'
  },
  {
    id: 'AUDIT-SEC',
    name: 'SOC2 & PCI-DSS Telemetry Attestation',
    category: 'compliance',
    targetHours: 8.0,
    baseDurationHours: 1.5,
    currentSlipMinutes: 0,
    slaBufferMinutes: 15,
    status: 'nominal',
    owner: 'Sec-Audit Lead',
    blastRadius: 3,
    doomsdayWeight: 0.88,
    sanityId: 'comp-soc-004',
    description: 'Cryptographic proof generation of uncompromised audit trails'
  },
  {
    id: 'CDN-EDGE',
    name: 'Cloudflare Anycast & TLS 1.3 Edge',
    category: 'networking',
    targetHours: 8.5,
    baseDurationHours: 2.0,
    currentSlipMinutes: 0,
    slaBufferMinutes: 30,
    status: 'nominal',
    owner: 'Edge Ops',
    blastRadius: 2,
    doomsdayWeight: 0.65,
    sanityId: 'net-cdn-005',
    description: 'DDoS barrier activation, WAF rate limits & geo-routing caches'
  },
  {
    id: 'LAUNCH-GATE',
    name: 'Global Cutover & Press Broadcast',
    category: 'release',
    targetHours: 10.0,
    baseDurationHours: 1.5,
    currentSlipMinutes: 0,
    slaBufferMinutes: 10,
    status: 'nominal',
    owner: 'Release VP',
    blastRadius: 6,
    doomsdayWeight: 1.0,
    sanityId: 'rel-gate-006',
    description: 'DNS shift to 100% live traffic and global press embargo release'
  }
];

export const CAUSAL_EDGES = [
  { source: 'AUTH-01', target: 'DB-MIGRATE', weight: 0.9, latencyPenalty: 1.2 },
  { source: 'DB-MIGRATE', target: 'PAYMENT-GW', weight: 1.0, latencyPenalty: 1.5 },
  { source: 'AUTH-01', target: 'AUDIT-SEC', weight: 0.7, latencyPenalty: 0.8 },
  { source: 'PAYMENT-GW', target: 'AUDIT-SEC', weight: 0.95, latencyPenalty: 1.3 },
  { source: 'PAYMENT-GW', target: 'CDN-EDGE', weight: 0.6, latencyPenalty: 0.9 },
  { source: 'AUDIT-SEC', target: 'LAUNCH-GATE', weight: 1.0, latencyPenalty: 1.6 },
  { source: 'CDN-EDGE', target: 'LAUNCH-GATE', weight: 0.8, latencyPenalty: 1.0 }
];

export const CHAOS_PRESETS = [
  {
    id: 'none',
    name: 'Nominal Operations',
    description: 'All pipelines within designated SLA thresholds',
    targetNode: null,
    injectedDelayMinutes: 0
  },
  {
    id: 'db-deadlock',
    name: 'Postgres Lock Contention',
    description: 'Catalog partition table lock delays DB-MIGRATE by 65 mins',
    targetNode: 'DB-MIGRATE',
    injectedDelayMinutes: 65
  },
  {
    id: 'auth-key-fail',
    name: 'HSM Key Rotation Fault',
    description: 'Hardware Security Module desync delays AUTH-01 by 45 mins',
    targetNode: 'AUTH-01',
    injectedDelayMinutes: 45
  },
  {
    id: 'stripe-webhook',
    name: 'Settlement Gateway Timeout',
    description: 'External payment partner throttling causes 80 mins delay in PAYMENT-GW',
    targetNode: 'PAYMENT-GW',
    injectedDelayMinutes: 80
  },
  {
    id: 'soc2-breach',
    name: 'SOC2 Verification Anomaly',
    description: 'Audit log cryptographic digest mismatch delays AUDIT-SEC by 55 mins',
    targetNode: 'AUDIT-SEC',
    injectedDelayMinutes: 55
  }
];

export function calculateCascade(nodes, edges, timeDriftMultiplier = 0, selectedChaosId = 'none') {
  const chaos = CHAOS_PRESETS.find(c => c.id === selectedChaosId) || CHAOS_PRESETS[0];
  
  const updatedNodes = nodes.map(n => ({
    ...n,
    accumulatedDelayMinutes: 0,
    effectiveSlipMinutes: 0,
    doomsdayScore: 0
  }));

  const nodeMap = new Map(updatedNodes.map(n => [n.id, n]));

  // 1. Direct injected delay and manual drift
  updatedNodes.forEach(node => {
    let directDelay = 0;
    if (chaos.targetNode === node.id) {
      directDelay += chaos.injectedDelayMinutes;
    }
    directDelay += Math.round(timeDriftMultiplier * 35 * node.doomsdayWeight);
    node.effectiveSlipMinutes = directDelay;
  });

  // 2. Topological cascade propagation
  const topoOrder = ['AUTH-01', 'DB-MIGRATE', 'PAYMENT-GW', 'CDN-EDGE', 'AUDIT-SEC', 'LAUNCH-GATE'];

  topoOrder.forEach(nodeId => {
    const currentNode = nodeMap.get(nodeId);
    if (!currentNode) return;

    const incoming = edges.filter(e => e.target === nodeId);
    let maxParentDelay = 0;

    incoming.forEach(edge => {
      const parent = nodeMap.get(edge.source);
      if (parent) {
        const transmittedDelay = Math.max(0, parent.effectiveSlipMinutes - parent.slaBufferMinutes) * edge.latencyPenalty;
        if (transmittedDelay > maxParentDelay) {
          maxParentDelay = transmittedDelay;
        }
      }
    });

    currentNode.accumulatedDelayMinutes = Math.round(maxParentDelay);
    currentNode.effectiveSlipMinutes = Math.round(currentNode.effectiveSlipMinutes + maxParentDelay);

    // Doomsday Probability Score (0 to 100%)
    const excess = Math.max(0, currentNode.effectiveSlipMinutes - currentNode.slaBufferMinutes);
    let score = Math.min(100, Math.round((excess / 45) * 100 * currentNode.doomsdayWeight));
    
    currentNode.doomsdayScore = score;

    if (score === 0) {
      currentNode.status = 'nominal';
    } else if (score < 40) {
      currentNode.status = 'drift';
    } else if (score < 75) {
      currentNode.status = 'quarantined';
    } else {
      currentNode.status = 'critical';
    }
  });

  const maxScore = Math.max(...updatedNodes.map(n => n.doomsdayScore));
  const avgScore = Math.round(updatedNodes.reduce((acc, n) => acc + n.doomsdayScore, 0) / updatedNodes.length);
  const systemDoomsdayScore = Math.min(100, Math.round(maxScore * 0.7 + avgScore * 0.3));

  let defcon = 5;
  if (systemDoomsdayScore > 75) defcon = 1;
  else if (systemDoomsdayScore > 50) defcon = 2;
  else if (systemDoomsdayScore > 25) defcon = 3;
  else if (systemDoomsdayScore > 5) defcon = 4;

  const criticalPath = updatedNodes.filter(n => n.doomsdayScore > 30).sort((a, b) => b.doomsdayScore - a.doomsdayScore);
  let causalExplanation = "All causal horizons operating within strict SLA tolerance.";

  if (criticalPath.length > 0) {
    const rootCause = updatedNodes.find(n => n.effectiveSlipMinutes > 0 && n.accumulatedDelayMinutes === 0) || criticalPath[0];
    const victim = criticalPath[0];
    if (rootCause.id === victim.id) {
      causalExplanation = `Direct SLA breach: [${rootCause.id}] exceeded buffer by +${rootCause.effectiveSlipMinutes}m. Target cutover threatened.`;
    } else {
      causalExplanation = `Causal Blast Radius: [${rootCause.id}] (+${rootCause.effectiveSlipMinutes}m) cascaded to [${victim.id}] (+${victim.accumulatedDelayMinutes}m buffer breach). Launch gate stalled.`;
    }
  }

  return {
    nodes: updatedNodes,
    systemDoomsdayScore,
    defcon,
    causalExplanation,
    criticalCount: updatedNodes.filter(n => n.status === 'critical').length,
    driftCount: updatedNodes.filter(n => n.status === 'drift' || n.status === 'quarantined').length
  };
}

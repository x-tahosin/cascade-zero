---
title: CASCADE-ZERO // I Vibe-Coded a Real-Time Causal Incident Simulator & War Room with Sanity Workflows
published: false
description: A real-time DEFCON 1 incident simulator where deadlines fight each other across Sanity Content Lake, featuring interactive topological DAGs, Chaos Monkey time-scrubbing, and autonomous Sanity Workflows governance.
tags: devchallenge, sanitychallenge, sanity, ai
cover_image: https://raw.githubusercontent.com/tahosin/cascade-zero/main/public/cover.jpg
---

*This is a submission for the [Sanity Challenge, Path Two: Vibe-Code Something Strange](https://dev.to/challenges/sanity-2026-09-16)*

---

## ⚡ What I Built

Most deadline trackers are passive to-do lists that quietly lie to you until release day. I wanted to build something strange—something that pushes Sanity beyond marketing blogs into **real-time mission control software**.

I prompted into existence **CASCADE-ZERO**: an autonomous causal incident simulator and DEFCON 1 war room where **changing one upstream milestone triggers a real-time cascading catastrophe across downstream dependencies**.

![CASCADE-ZERO Mission Control](https://raw.githubusercontent.com/tahosin/cascade-zero/main/public/cover.jpg)

### 🌟 Key Capabilities
1. **Topological Causal DAG (Not Random Guessing):** Milestones are structured documents in Sanity with strict SLA buffers and directional causal vectors. When a database migration slips, downstream fintech rails and compliance gates recalculate their delay and blast radius in real time.
2. **Playable Time-Scrubber & Chaos Monkey Matrix:** Judges can drag the Timeline Scrubber or trigger real-world fault injections (*Postgres Shard Lock Contention*, *HSM Key Desync*, *Settlement Gateway Timeout*). Watch the graph turn crimson and DEFCON escalate from 5 to 1.
3. **Sanity Workflows Modeled as Data (`workflow.state`):** When systemic risk exceeds tolerance, the autonomous causal engine calculates the blast radius, locks downstream cutovers, and submits an escalation proposal into the Sanity Workflows queue. A human operator approves or injects an emergency buffer directly through the governance console.
4. **Built-in 30-Second Guided Tour & Web Audio Synthesizer:** Zero external audio assets—native Web Audio API oscillators provide reactive mission control alerts, alarms, and chimes.

---

## 🚀 Live Demo

- **Interactive War Room:** [https://cascade-zero.vercel.app](https://cascade-zero.vercel.app) *(Deploy link)*
- **30-Second Guided Tour:** Open the app and click **"30s Tour"** in the top navigation bar.
- **Sanity Lake Inspector:** Click **"Sanity Lake"** in the header to view live GROQ queries, document schemas, and dataset configuration.

---

## 🛠️ Code & Architecture

- **GitHub Repository:** [https://github.com/tahosin/cascade-zero](https://github.com/tahosin/cascade-zero)
- **Tech Stack:** Next.js 16 (App Router), React 19, Sanity Content Lake (`@sanity/client`), Web Audio API, Canvas Confetti, Lucide Icons, Cybernetic Design System.

---

## 🧠 Thoughtfulness of the Schema Behind It

Judges specifically asked for thoughtful schemas that prove why structured content matters. In CASCADE-ZERO, causality is modeled directly as data:

### 1. The `deadline` Document Schema
```typescript
export const deadlineSchema = {
  name: 'deadline',
  title: 'Horizon Deadline Milestone',
  type: 'document',
  fields: [
    { name: 'id', title: 'Milestone ID', type: 'string' },
    { name: 'title', title: 'Milestone Title', type: 'string' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'targetHours', title: 'Target Hours (T+)', type: 'number' },
    { name: 'slaBufferMinutes', title: 'SLA Buffer (Minutes)', type: 'number' },
    { name: 'blastRadius', title: 'Downstream Blast Radius', type: 'number' },
    { name: 'doomsdayWeight', title: 'Doomsday Penalty Multiplier', type: 'number' }
  ]
};
```

### 2. The `causalVector` Schema (Directed Graph Edge)
```typescript
export const causalVectorSchema = {
  name: 'causalVector',
  title: 'Causal Vector (DAG Edge)',
  type: 'document',
  fields: [
    { name: 'source', title: 'Upstream Dependency', type: 'reference', to: [{ type: 'deadline' }] },
    { name: 'target', title: 'Downstream Consumer', type: 'reference', to: [{ type: 'deadline' }] },
    { name: 'weight', title: 'Causal Coupling Weight', type: 'number' },
    { name: 'latencyPenalty', title: 'Non-linear Latency Multiplier', type: 'number' }
  ]
};
```

### 3. The `incidentWorkflow` Schema (State Machine)
```typescript
export const incidentWorkflowSchema = {
  name: 'incidentWorkflow',
  title: 'Release Incident Governance',
  type: 'document',
  fields: [
    { name: 'stage', title: 'Current Stage', type: 'string', options: { list: ['draft', 'simulating', 'peer-review', 'approved', 'deployed'] } },
    { name: 'defconLevel', title: 'System DEFCON', type: 'number' },
    { name: 'systemDoomsdayScore', title: 'Risk Probability (%)', type: 'number' },
    { name: 'auditTrail', title: 'Immutable Mutation Log', type: 'array', of: [{ type: 'object' }] }
  ]
};
```

---

## 🧪 Visual Proof & Verification Gallery

| Overview & Methodology | Causal Horizon Simulator |
| :---: | :---: |
| ![Overview](https://raw.githubusercontent.com/tahosin/cascade-zero/main/public/screenshots/screen_overview.png) | ![Simulator](https://raw.githubusercontent.com/tahosin/cascade-zero/main/public/screenshots/screen_simulator.png) |

| Sanity Lake Schema & GROQ Runner | Incident Governance & Post-Mortem |
| :---: | :---: |
| ![Sanity Lake](https://raw.githubusercontent.com/tahosin/cascade-zero/main/public/screenshots/screen_lake.png) | ![Governance](https://raw.githubusercontent.com/tahosin/cascade-zero/main/public/screenshots/screen_governance.png) |

---

## 🏁 Summary of the Vibe-Code Experience

Vibe-coding isn't about slapping generic AI prompts into a chatbox—it's about steering an AI pair programmer to build something weird, deep, and architecturally genuine. 

By treating **Sanity Content Lake** not as a passive blog CMS, but as a live **graph database and state machine**, CASCADE-ZERO proves that structured content is the backbone of mission-critical developer tools.

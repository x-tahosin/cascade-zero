'use client';

import React, { useState } from 'react';
import { X, Plus, Shield, Check } from 'lucide-react';
import { sounds } from '../../engine/soundFx';

export default function AddMilestoneModal({ isOpen, onClose, onAddMilestone, existingNodes }) {
  const [id, setId] = useState('OPS-GATE');
  const [name, setName] = useState('Production Traffic Re-Route');
  const [category, setCategory] = useState('release');
  const [slaBufferMinutes, setSlaBufferMinutes] = useState(25);
  const [upstream, setUpstream] = useState('AUDIT-SEC');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !name) return;

    sounds.playPing();
    onAddMilestone({
      id: id.toUpperCase().trim(),
      name: name.trim(),
      category,
      targetHours: 9.0,
      baseDurationHours: 1.5,
      currentSlipMinutes: 0,
      slaBufferMinutes: Number(slaBufferMinutes),
      status: 'nominal',
      owner: 'Custom Ops Lead',
      blastRadius: 3,
      doomsdayWeight: 0.8,
      sanityId: `cust-${id.toLowerCase()}`,
      description: 'Dynamically injected horizon milestone'
    }, upstream);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-cyan-500/30 bg-slate-950 p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-slate-100 font-mono">
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-800 hover:border-slate-600 bg-slate-900 text-slate-400 hover:text-slate-200 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-400">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black tracking-wide text-slate-100 uppercase">
              Add Causal Horizon Milestone
            </h3>
            <p className="text-[11px] text-slate-400">
              Inject a new topological gate into the cutover DAG
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">MILESTONE IDENTIFIER (UPPERCASE)</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 focus:border-cyan-400 focus:outline-none"
              placeholder="e.g. CACHE-WARM"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">MILESTONE NAME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 focus:border-cyan-400 focus:outline-none"
              placeholder="e.g. Redis Cluster Warmup & Prefill"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 focus:border-cyan-400 focus:outline-none"
              >
                <option value="security">Security</option>
                <option value="database">Database</option>
                <option value="fintech">Fintech</option>
                <option value="compliance">Compliance</option>
                <option value="networking">Networking</option>
                <option value="release">Release</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">SLA BUFFER (MINUTES)</label>
              <input
                type="number"
                value={slaBufferMinutes}
                onChange={(e) => setSlaBufferMinutes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 focus:border-cyan-400 focus:outline-none"
                min="5"
                max="120"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">UPSTREAM DEPENDENCY</label>
            <select
              value={upstream}
              onChange={(e) => setUpstream(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 focus:border-cyan-400 focus:outline-none"
            >
              {existingNodes.map(n => (
                <option key={n.id} value={n.id}>{n.id} ({n.name})</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-cyan-500/40 hover:border-cyan-400 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <Check className="w-3.5 h-3.5" />
              Add to DAG
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

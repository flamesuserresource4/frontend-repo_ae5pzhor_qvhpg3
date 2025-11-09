import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, TrendingUp, Calendar } from 'lucide-react';

const STAGES = ['Ideated', 'Prototyped', 'In Progress', 'Deployed'];

export default function InteractiveDashboard({ ideas, onFilterByStage, onFilterByDomain }) {
  const avg = React.useMemo(() => {
    if (ideas.length === 0) return 0;
    return Math.round(ideas.reduce((a, b) => a + (Number(b.progress) || 0), 0) / ideas.length);
  }, [ideas]);

  const byStage = React.useMemo(() => {
    const map = Object.fromEntries(STAGES.map((s) => [s, 0]));
    for (const i of ideas) if (map[i.stage] !== undefined) map[i.stage] += 1;
    return map;
  }, [ideas]);

  const byDomain = React.useMemo(() => {
    const map = {};
    for (const i of ideas) {
      const d = i.domain || 'Other';
      map[d] = (map[d] || 0) + 1;
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [ideas]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 text-white"
      >
        <div className="flex items-center gap-2 text-indigo-300">
          <Rocket size={18} />
          <span className="text-xs uppercase tracking-wider">Average Progress</span>
        </div>
        <div className="mt-3 flex items-end gap-3">
          <div className="text-4xl font-bold">{avg}%</div>
          <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500" style={{ width: `${avg}%` }} />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 text-white"
      >
        <div className="flex items-center gap-2 text-indigo-300">
          <TrendingUp size={18} />
          <span className="text-xs uppercase tracking-wider">Stages</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {Object.entries(byStage).map(([stage, count]) => (
            <button
              key={stage}
              onClick={() => onFilterByStage(stage)}
              className="group rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left hover:bg-white/10 transition"
            >
              <div className="text-xs text-white/70">{stage}</div>
              <div className="text-lg font-semibold text-white flex items-center gap-2">
                {count}
                <span className="inline-block h-1.5 flex-1 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 group-hover:from-violet-500 group-hover:to-indigo-500" />
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 text-white"
      >
        <div className="flex items-center gap-2 text-indigo-300">
          <Calendar size={18} />
          <span className="text-xs uppercase tracking-wider">Domains</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {byDomain.slice(0, 8).map(([domain, count]) => (
            <button
              key={domain}
              onClick={() => onFilterByDomain(domain)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90 hover:bg-white/10 transition"
            >
              {domain} <span className="opacity-70">{count}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

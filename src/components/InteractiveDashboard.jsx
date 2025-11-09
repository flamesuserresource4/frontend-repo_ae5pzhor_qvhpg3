import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, PieChart, Activity } from 'lucide-react';

export default function InteractiveDashboard({ ideas = [] }) {
  const stats = useMemo(() => {
    const byStage = ideas.reduce((acc, i) => {
      acc[i.stage || 'Ideated'] = (acc[i.stage || 'Ideated'] || 0) + 1;
      return acc;
    }, {});
    const byDomain = ideas.reduce((acc, i) => {
      const d = i.domain && i.domain.trim() ? i.domain : 'Uncategorized';
      acc[d] = (acc[d] || 0) + 1;
      return acc;
    }, {});
    const avgProgress = ideas.length
      ? Math.round(
          ideas.reduce((sum, i) => sum + (Number(i.progress) || 0), 0) / ideas.length
        )
      : 0;
    return { byStage, byDomain, avgProgress };
  }, [ideas]);

  const stages = ['Ideated', 'Prototyped', 'In Progress', 'Deployed'];

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Avg Progress */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="col-span-1 flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 text-gray-900">
          <Activity className="h-5 w-5 text-rose-500" />
          <h3 className="font-semibold">Average Progress</h3>
        </div>
        <div className="mt-6">
          <div className="h-3 w-full rounded-full bg-gray-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.avgProgress}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="h-3 rounded-full bg-rose-500"
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">{stats.avgProgress}% overall</p>
        </div>
      </motion.div>

      {/* Stage Bars */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="col-span-1 rounded-2xl border bg-white p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 text-gray-900">
          <BarChart2 className="h-5 w-5 text-rose-500" />
          <h3 className="font-semibold">By Stage</h3>
        </div>
        <div className="mt-6 space-y-3">
          {stages.map((s) => {
            const total = ideas.length || 1;
            const value = stats.byStage[s] || 0;
            const pct = Math.round((value / total) * 100);
            return (
              <div key={s}>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{s}</span>
                  <span>{value}</span>
                </div>
                <div className="mt-1 h-2 w-full rounded bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-2 rounded bg-rose-400"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Domain pills */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="col-span-1 rounded-2xl border bg-white p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 text-gray-900">
          <PieChart className="h-5 w-5 text-rose-500" />
          <h3 className="font-semibold">Domains</h3>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(stats.byDomain).map(([d, count]) => (
            <motion.span
              key={d}
              whileHover={{ y: -2 }}
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-gray-700 bg-white shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              {d} <span className="text-gray-400">{count}</span>
            </motion.span>
          ))}
          {Object.keys(stats.byDomain).length === 0 && (
            <span className="text-sm text-gray-500">No ideas yet</span>
          )}
        </div>
      </motion.div>
    </section>
  );
}

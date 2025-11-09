import React from 'react';

function useIdeaStats(ideas) {
  return React.useMemo(() => {
    const byStage = ideas.reduce((acc, i) => {
      acc[i.stage] = (acc[i.stage] || 0) + 1;
      return acc;
    }, {});
    const totals = ideas.length;
    const overall = (() => {
      if (totals === 0) return 0;
      const perIdea = ideas.map((i) => {
        const t = i.checklist.length || 1;
        const d = i.checklist.filter((c) => c.done).length;
        return d / t;
      });
      return Math.round((perIdea.reduce((a, b) => a + b, 0) / totals) * 100);
    })();
    return { byStage, totals, overall };
  }, [ideas]);
}

export default function Analytics({ ideas }) {
  const { byStage, totals, overall } = useIdeaStats(ideas);

  const stages = Object.keys(byStage);
  const maxVal = Math.max(1, ...Object.values(byStage));

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Analytics</h3>
        <span className="text-sm text-neutral-500">Total ideas: {totals}</span>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="text-sm text-neutral-500 mb-2">Overall completion</div>
          <div className="relative h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 bg-green-600" style={{ width: `${overall}%` }} />
          </div>
          <div className="text-right text-xs text-neutral-500 mt-1">{overall}%</div>
        </div>

        <div className="md:col-span-2">
          <div className="text-sm text-neutral-500 mb-2">Ideas by stage</div>
          <div className="flex items-end gap-3 h-36">
            {stages.length === 0 && <div className="text-xs text-neutral-500">No data yet</div>}
            {stages.map((s) => {
              const value = byStage[s];
              const height = (value / maxVal) * 100;
              return (
                <div key={s} className="flex-1 min-w-[60px]">
                  <div className="h-full flex items-end">
                    <div className="w-full bg-indigo-500/80 rounded-md" style={{ height: `${height}%` }} />
                  </div>
                  <div className="mt-1 text-center text-xs text-neutral-600 dark:text-neutral-400">
                    <div className="font-medium">{value}</div>
                    <div>{s}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

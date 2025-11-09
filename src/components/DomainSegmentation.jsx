import React from 'react';

export default function DomainSegmentation({ ideas, selected, onSelect }) {
  const stats = React.useMemo(() => {
    const map = ideas.reduce((acc, i) => {
      const key = i.domain?.trim() || 'Uncategorized';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
    const total = ideas.length;
    return { entries, total };
  }, [ideas]);

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Domains</h3>
        <span className="text-sm text-neutral-500">Total: {stats.total}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect('All')}
          className={`px-3 py-1.5 rounded-full text-sm border ${selected === 'All' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
        >
          All ({stats.total})
        </button>
        {stats.entries.map(([name, count]) => (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={`px-3 py-1.5 rounded-full text-sm border ${selected === name ? 'bg-indigo-600 text-white border-indigo-600' : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
            title={`${count} idea${count !== 1 ? 's' : ''} in ${name}`}
          >
            {name} ({count})
          </button>
        ))}
      </div>

      {selected !== 'All' && (
        <div className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          Number of ideas from {selected}: {stats.entries.find(([n]) => n === selected)?.[1] || 0}
        </div>
      )}
    </div>
  );
}

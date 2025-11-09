import React from 'react';

export default function DomainSegmentation({ ideas = [], selectedDomain, onSelect }) {
  const counts = ideas.reduce((acc, i) => {
    const d = i.domain && i.domain.trim() ? i.domain : 'Uncategorized';
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});

  const domains = Object.keys(counts).sort();
  const total = ideas.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Domains</h3>
        <span className="text-xs text-gray-500">{total} total</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect('')}
          className={`rounded-full border px-3 py-1.5 text-sm shadow-sm transition ${
            !selectedDomain ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          All <span className="ml-1 text-xs opacity-80">{total}</span>
        </button>
        {domains.map((d) => (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className={`rounded-full border px-3 py-1.5 text-sm shadow-sm transition ${
              selectedDomain === d ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {d} <span className="ml-1 text-xs opacity-80">{counts[d]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

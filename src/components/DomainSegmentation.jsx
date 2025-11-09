import React from 'react';

const PRESET_DOMAINS = [
  'AI/ML',
  'Web Apps',
  'Mobile',
  'Fintech',
  'HealthTech',
];

export default function DomainSegmentation({ ideas, selectedDomain, onSelect }) {
  const counts = React.useMemo(() => {
    const base = Object.fromEntries(PRESET_DOMAINS.map((d) => [d, 0]));
    for (const i of ideas) {
      if (i.domain && base[i.domain] !== undefined) base[i.domain] += 1;
    }
    return base;
  }, [ideas]);

  const Button = ({ domain, count }) => (
    <button
      onClick={() => onSelect(domain)}
      className={`w-full justify-between inline-flex items-center rounded-lg px-4 py-2 text-sm transition shadow-sm border ${
        selectedDomain === domain
          ? 'bg-indigo-600 text-white border-indigo-500'
          : 'bg-white/5 text-white/90 border-white/10 hover:bg-white/10'
      }`}
    >
      <span>{domain}</span>
      <span className="text-xs opacity-80">{count}</span>
    </button>
  );

  return (
    <aside className="space-y-3">
      <h3 className="text-white/90 text-sm tracking-wide uppercase">Domains</h3>
      <div className="grid gap-2">
        <button
          onClick={() => onSelect('All')}
          className={`w-full justify-between inline-flex items-center rounded-lg px-4 py-2 text-sm transition shadow-sm border ${
            selectedDomain === 'All'
              ? 'bg-indigo-600 text-white border-indigo-500'
              : 'bg-white/5 text-white/90 border-white/10 hover:bg-white/10'
          }`}
        >
          <span>All</span>
          <span className="text-xs opacity-80">{ideas.length}</span>
        </button>
        {PRESET_DOMAINS.map((d) => (
          <Button key={d} domain={d} count={counts[d]} />
        ))}
      </div>
      <p className="text-xs text-white/60">
        Tip: Click a dashboard card to filter by domain or stage.
      </p>
    </aside>
  );
}

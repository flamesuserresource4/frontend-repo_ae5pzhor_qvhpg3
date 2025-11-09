import React from 'react';

export default function DomainTag({ value, onChange, options }) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');

  const filtered = React.useMemo(() => {
    const set = new Set([...(options || [])].filter(Boolean));
    if (value) set.add(value);
    const list = Array.from(set).sort((a, b) => a.localeCompare(b));
    if (!input.trim()) return list;
    return list.filter((d) => d.toLowerCase().includes(input.toLowerCase()));
  }, [input, options, value]);

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
    setInput('');
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-1">Domain</label>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Fintech, Health, AI, Education"
          className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 px-3 py-2"
        />
        <button type="button" onClick={() => setOpen((o) => !o)} className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700">
          Pick
        </button>
      </div>

      {open && (
        <div className="absolute z-10 mt-2 w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow">
          <div className="p-2 border-b border-neutral-200 dark:border-neutral-800">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search domains"
              className="w-full px-2 py-1.5 text-sm rounded border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/60"
            />
          </div>
          <div className="max-h-40 overflow-auto p-2">
            {filtered.length === 0 && (
              <div className="text-xs text-neutral-500 px-2 py-1">No matches</div>
            )}
            {filtered.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left text-sm px-2 py-1 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800 ${opt === value ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

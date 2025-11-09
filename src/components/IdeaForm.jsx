import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

function DomainTag({ domains = [], value, onChange }) {
  const [input, setInput] = useState(value || '');
  const suggestions = useMemo(() => {
    const v = input.toLowerCase();
    return domains.filter((d) => d.toLowerCase().includes(v)).slice(0, 6);
  }, [domains, input]);

  return (
    <div className="relative">
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          onChange?.(e.target.value);
        }}
        placeholder="e.g., AI, Fintech, Health"
        className="w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
      />
      {input && suggestions.length > 0 && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border bg-white shadow-lg">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setInput(s);
                onChange?.(s);
              }}
              className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function IdeaForm({ onAdd, existingDomains = [] }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stage, setStage] = useState('Ideated');
  const [deadline, setDeadline] = useState('');
  const [progress, setProgress] = useState(0);
  const [domain, setDomain] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newIdea = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      stage,
      deadline: deadline || null,
      progress: Number(progress) || 0,
      checklist: [],
      createdAt: new Date().toISOString(),
      domain: domain.trim() || 'Uncategorized',
    };
    onAdd?.(newIdea);
    setTitle('');
    setDescription('');
    setStage('Ideated');
    setDeadline('');
    setProgress(0);
    setDomain('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-white p-4 md:p-6 shadow-sm space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <label className="text-sm font-medium text-gray-700">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
          placeholder="Your brilliant idea"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
          rows={3}
          placeholder="What is it about?"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Stage</label>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            {['Ideated', 'Prototyped', 'In Progress', 'Deployed'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Progress</label>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            className="mt-3 w-full accent-rose-500"
          />
          <div className="mt-1 text-xs text-gray-500">{progress}%</div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Domain</label>
        <DomainTag domains={existingDomains} value={domain} onChange={setDomain} />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-white shadow-sm transition hover:bg-rose-600 active:scale-[0.99]"
        >
          <Plus className="h-4 w-4" />
          Add Idea
        </button>
      </div>
    </motion.form>
  );
}

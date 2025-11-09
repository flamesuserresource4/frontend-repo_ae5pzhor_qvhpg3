import React from 'react';
import DomainTag from './DomainTag';

const STAGES = ['Ideated', 'Prototyped', 'In Progress', 'Deployed'];

export default function IdeaForm({ onAdd, existingDomains = [] }) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [stage, setStage] = React.useState(STAGES[0]);
  const [deadline, setDeadline] = React.useState('');
  const [domain, setDomain] = React.useState('');
  const [checkItem, setCheckItem] = React.useState('');
  const [checklist, setChecklist] = React.useState([]);

  const addCheckItem = () => {
    const text = checkItem.trim();
    if (!text) return;
    setChecklist((c) => [...c, { id: crypto.randomUUID(), text, done: false }]);
    setCheckItem('');
  };

  const removeCheckItem = (id) => setChecklist((c) => c.filter((i) => i.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const idea = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      stage,
      deadline: deadline || null,
      progress: 0,
      checklist,
      createdAt: new Date().toISOString(),
      domain: domain.trim() || 'Uncategorized',
    };
    onAdd(idea);
    setTitle('');
    setDescription('');
    setStage(STAGES[0]);
    setDeadline('');
    setChecklist([]);
    setDomain('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Name your idea"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stage</label>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 px-3 py-2"
          >
            {STAGES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 px-3 py-2"
          />
        </div>
        <DomainTag value={domain} onChange={setDomain} options={existingDomains} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 px-3 py-2"
          placeholder="What is this about?"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Checklist</label>
          <div className="flex gap-2">
            <input
              value={checkItem}
              onChange={(e) => setCheckItem(e.target.value)}
              className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 px-3 py-2"
              placeholder="Add milestone item"
            />
            <button type="button" onClick={addCheckItem} className="px-3 py-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">Add</button>
          </div>
        </div>
      </div>

      {checklist.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {checklist.map((item) => (
            <span key={item.id} className="inline-flex items-center gap-2 text-sm px-2 py-1 rounded-full border border-neutral-300 dark:border-neutral-700">
              {item.text}
              <button type="button" onClick={() => removeCheckItem(item.id)} className="text-neutral-500 hover:text-red-600">×</button>
            </span>
          ))}
        </div>
      )}

      <div className="pt-2">
        <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Add Idea</button>
      </div>
    </form>
  );
}

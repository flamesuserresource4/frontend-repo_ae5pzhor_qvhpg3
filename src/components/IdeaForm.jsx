import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, CheckCircle2, Tag } from 'lucide-react';

const STAGES = ['Ideated', 'Prototyped', 'In Progress', 'Deployed'];
const SUGGESTED_DOMAINS = ['AI/ML', 'Web Apps', 'Mobile', 'Fintech', 'HealthTech'];

export default function IdeaForm({ onAdd }) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [stage, setStage] = React.useState(STAGES[0]);
  const [deadline, setDeadline] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [domain, setDomain] = React.useState('AI/ML');
  const [milestones, setMilestones] = React.useState([{ text: 'Initial research', done: false, due: '' }]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const addMilestone = () => setMilestones((m) => [...m, { text: '', done: false, due: '' }]);
  const updateMilestone = (idx, patch) =>
    setMilestones((m) => m.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  const removeMilestone = (idx) => setMilestones((m) => m.filter((_, i) => i !== idx));

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      id: crypto.randomUUID(),
      title,
      description,
      stage,
      deadline,
      progress: Number(progress),
      domain,
      createdAt: new Date().toISOString(),
      checklist: milestones,
    });
    setTitle('');
    setDescription('');
    setStage(STAGES[0]);
    setDeadline('');
    setProgress(0);
    setDomain('AI/ML');
    setMilestones([{ text: 'Initial research', done: false, due: '' }]);
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-white"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-1 sm:col-span-2">
          <label className="text-sm text-white/70">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="e.g., AI-powered note summarizer"
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label className="text-sm text-white/70">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="Briefly describe the idea"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Stage</label>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-indigo-500"
          >
            {STAGES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm text-white/70"><CalendarIcon size={14}/> Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">Progress: {progress}%</label>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            className="mt-2 w-full"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm text-white/70"><Tag size={14}/> Domain</label>
          <div className="relative mt-1">
            <input
              value={domain}
              onChange={(e) => { setDomain(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-indigo-500"
              placeholder="Choose a domain"
            />
            {showSuggestions && (
              <div className="absolute z-10 mt-1 w-full rounded-lg border border-white/10 bg-black/60 backdrop-blur-md p-1">
                {SUGGESTED_DOMAINS.filter((d) => d.toLowerCase().includes(domain.toLowerCase())).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onMouseDown={() => { setDomain(d); setShowSuggestions(false); }}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-sm"
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <CheckCircle2 size={16} />
          Milestones
        </div>

        <div className="mt-2 space-y-2">
          {milestones.map((m, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-6 gap-2 items-center">
              <input
                value={m.text}
                onChange={(e) => updateMilestone(idx, { text: e.target.value })}
                placeholder={`Milestone #${idx + 1}`}
                className="sm:col-span-4 rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-indigo-500"
              />
              <input
                type="date"
                value={m.due}
                onChange={(e) => updateMilestone(idx, { due: e.target.value })}
                className="sm:col-span-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-indigo-500"
              />
              <div className="flex items-center gap-2 sm:col-span-6">
                <label className="inline-flex items-center gap-2 text-xs text-white/70">
                  <input
                    type="checkbox"
                    checked={m.done}
                    onChange={(e) => updateMilestone(idx, { done: e.target.checked })}
                    className="accent-indigo-500"
                  />
                  Done
                </label>
                <button type="button" onClick={() => removeMilestone(idx)} className="ml-auto text-xs text-rose-300 hover:text-rose-200">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addMilestone} className="mt-3 text-sm text-indigo-300 hover:text-indigo-200">
          + Add milestone
        </button>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-600 px-4 py-2 font-medium shadow hover:brightness-110 transition"
        >
          Add Idea
        </button>
      </div>
    </motion.form>
  );
}

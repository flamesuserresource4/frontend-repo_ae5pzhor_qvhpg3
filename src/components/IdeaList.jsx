import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Clock, CheckSquare } from 'lucide-react';

export default function IdeaList({ ideas, onRemove, onToggleMilestone }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 text-white">
      <h3 className="text-sm text-white/70 mb-3">Ideas</h3>
      <AnimatePresence initial={false}>
        {ideas.length === 0 ? (
          <div className="text-white/60 text-sm">No ideas yet. Add your first one!</div>
        ) : (
          ideas.map((idea) => (
            <motion.div
              key={idea.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="rounded-xl border border-white/10 bg-black/30 p-4 mb-3"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white/95">{idea.title}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10">{idea.domain}</span>
                    <span className="ml-auto text-xs text-white/70">{idea.stage}</span>
                  </div>
                  {idea.description && (
                    <p className="mt-1 text-sm text-white/80">{idea.description}</p>
                  )}

                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-white/70">
                    <div className="flex items-center gap-1"><Clock size={14}/> Deadline: {idea.deadline || '—'}</div>
                    <div className="col-span-1 sm:col-span-2 flex items-center gap-2">
                      <span>Progress</span>
                      <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500" style={{ width: `${idea.progress || 0}%` }} />
                      </div>
                      <span>{idea.progress || 0}%</span>
                    </div>
                  </div>

                  {Array.isArray(idea.checklist) && idea.checklist.length > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2 text-xs text-white/70"><CheckSquare size={14}/> Milestones</div>
                      <ul className="mt-1 space-y-1">
                        {idea.checklist.map((m, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              className="accent-indigo-500"
                              checked={m.done}
                              onChange={() => onToggleMilestone(idea.id, idx)}
                            />
                            <span className={m.done ? 'line-through text-white/50' : 'text-white/90'}>{m.text || `Milestone ${idx+1}`}</span>
                            <span className="ml-auto text-xs text-white/60">{m.due || ''}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onRemove(idea.id)}
                  className="shrink-0 rounded-md p-2 text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition"
                  aria-label="Remove idea"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}

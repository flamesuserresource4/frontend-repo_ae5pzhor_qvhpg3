import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Trash2 } from 'lucide-react';

export default function IdeaList({ ideas = [], onRemove, selectedDomain }) {
  return (
    <div className="rounded-2xl border bg-white p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Ideas {selectedDomain ? `· ${selectedDomain}` : ''}</h3>
        <span className="text-xs text-gray-500">{ideas.length} items</span>
      </div>
      <div className="mt-4">
        <AnimatePresence initial={false}>
          {ideas.map((idea) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="group flex items-start justify-between rounded-xl border p-3 mb-3 bg-white hover:shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 text-rose-600 px-2 py-0.5 text-xs border border-rose-100">
                    {idea.domain || 'Uncategorized'}
                  </span>
                  <span className="text-xs text-gray-400">{idea.stage}</span>
                </div>
                <h4 className="mt-1 font-medium text-gray-900">{idea.title}</h4>
                {idea.description && (
                  <p className="mt-1 text-sm text-gray-600">{idea.description}</p>
                )}
                <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full">
                  <div
                    className="h-1.5 rounded-full bg-rose-500"
                    style={{ width: `${idea.progress || 0}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="hidden group-hover:inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
                  onClick={() => onRemove?.(idea.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  remove
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {ideas.length === 0 && (
          <div className="text-sm text-gray-500">No ideas yet. Add your first one on the left.</div>
        )}
      </div>
    </div>
  );
}

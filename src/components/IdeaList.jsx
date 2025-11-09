import React from 'react';
import { Calendar, CheckCircle2, Circle, Trash2, Edit2 } from 'lucide-react';

export default function IdeaList({ ideas, onToggleChecklist, onProgressChange, onDelete, onEdit }) {
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : 'No deadline');

  return (
    <div className="space-y-3">
      {ideas.length === 0 && (
        <div className="text-sm text-neutral-500 text-center py-6">No ideas yet. Add your first one above.</div>
      )}
      {ideas.map((idea) => {
        const total = idea.checklist.length || 1;
        const done = idea.checklist.filter((c) => c.done).length;
        const percent = Math.round((done / total) * 100);
        return (
          <div key={idea.id} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="font-semibold text-lg">{idea.title}</h3>
                <p className="text-sm text-neutral-500 mt-1">{idea.description || 'No description'}</p>
                <div className="flex items-center gap-3 text-xs text-neutral-500 mt-2">
                  <span className="px-2 py-1 rounded-full border border-neutral-200 dark:border-neutral-800">{idea.stage}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(idea.deadline)}</span>
                </div>
              </div>
              <div className="w-full md:w-64">
                <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600" style={{ width: `${percent}%` }} />
                </div>
                <div className="text-right text-xs text-neutral-500 mt-1">{percent}%</div>
              </div>
            </div>

            {idea.checklist.length > 0 && (
              <div className="mt-3 space-y-2">
                {idea.checklist.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onToggleChecklist(idea.id, item.id)}
                    className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <Circle className="w-4 h-4 text-neutral-400" />
                    )}
                    <span className={item.done ? 'line-through text-neutral-400' : ''}>{item.text}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => onEdit(idea)}
                className="px-3 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 inline-flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => onDelete(idea.id)}
                className="px-3 py-1.5 text-sm rounded-md border border-red-200 text-red-600 hover:bg-red-50 inline-flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

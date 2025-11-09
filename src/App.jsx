import React, { useEffect, useMemo, useState } from 'react';
import HeroCover from './components/HeroCover';
import InteractiveDashboard from './components/InteractiveDashboard';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import DomainSegmentation from './components/DomainSegmentation';

const STORAGE_KEY = 'ideas';

export default function App() {
  const [ideas, setIdeas] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [selectedDomain, setSelectedDomain] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
  }, [ideas]);

  const existingDomains = useMemo(() => {
    const s = new Set();
    ideas.forEach((i) => {
      if (i.domain && i.domain.trim()) s.add(i.domain.trim());
    });
    return Array.from(s);
  }, [ideas]);

  const filteredIdeas = useMemo(() => {
    if (!selectedDomain) return ideas;
    return ideas.filter((i) => (i.domain || 'Uncategorized') === selectedDomain);
  }, [ideas, selectedDomain]);

  const handleAdd = (idea) => setIdeas((prev) => [idea, ...prev]);
  const handleRemove = (id) => setIdeas((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50/40">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8">
        <HeroCover />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <InteractiveDashboard ideas={filteredIdeas} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IdeaForm onAdd={handleAdd} existingDomains={existingDomains} />
              <IdeaList ideas={filteredIdeas} onRemove={handleRemove} selectedDomain={selectedDomain} />
            </div>
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border bg-white p-4 md:p-6 shadow-sm">
              <DomainSegmentation
                ideas={ideas}
                selectedDomain={selectedDomain}
                onSelect={setSelectedDomain}
              />
              {selectedDomain && (
                <button
                  onClick={() => setSelectedDomain('')}
                  className="mt-4 text-xs text-rose-600 hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <h3 className="text-sm font-semibold text-gray-900">Tips</h3>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Click the cover to interact with the cubes.</li>
                <li>Use Domains to filter your workspace.</li>
                <li>Adjust progress to visualize momentum.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Header from './components/Header';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import Analytics from './components/Analytics';
import RepoHelper from './components/RepoHelper';
import DomainSegmentation from './components/DomainSegmentation';

function App() {
  const [ideas, setIdeas] = React.useState(() => {
    try {
      const raw = localStorage.getItem('ideas');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [selectedDomain, setSelectedDomain] = React.useState('All');

  React.useEffect(() => {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }, [ideas]);

  const addIdea = (idea) => setIdeas((list) => [idea, ...list]);

  const toggleChecklist = (ideaId, itemId) => {
    setIdeas((list) =>
      list.map((i) =>
        i.id === ideaId
          ? {
              ...i,
              checklist: i.checklist.map((c) => (c.id === itemId ? { ...c, done: !c.done } : c)),
            }
          : i
      )
    );
  };

  const updateProgress = (ideaId, progress) => {
    setIdeas((list) => list.map((i) => (i.id === ideaId ? { ...i, progress } : i)));
  };

  const deleteIdea = (id) => setIdeas((list) => list.filter((i) => i.id !== id));

  const editIdea = (updated) => {
    setIdeas((list) => list.map((i) => (i.id === updated.id ? updated : i)));
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(ideas, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ideas.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (data) => {
    if (!Array.isArray(data)) return;
    setIdeas(data);
  };

  const domains = React.useMemo(() => {
    const set = new Set(
      ideas
        .map((i) => (i.domain ? String(i.domain).trim() : ''))
        .filter((d) => d && d.length > 0)
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [ideas]);

  const filteredIdeas = React.useMemo(() => {
    if (selectedDomain === 'All') return ideas;
    return ideas.filter((i) => (i.domain?.trim() || 'Uncategorized') === selectedDomain);
  }, [ideas, selectedDomain]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Header onExport={handleExport} onImport={handleImport} />

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 p-5">
            <h2 className="text-xl font-semibold mb-4">Add a new idea</h2>
            <IdeaForm onAdd={addIdea} existingDomains={domains} />
          </div>

          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your ideas</h2>
              {selectedDomain !== 'All' && (
                <span className="text-sm text-neutral-500">Showing domain: {selectedDomain}</span>
              )}
            </div>
            <IdeaList
              ideas={filteredIdeas}
              onToggleChecklist={toggleChecklist}
              onProgressChange={updateProgress}
              onDelete={deleteIdea}
              onEdit={editIdea}
            />
          </div>
        </section>

        <aside className="space-y-6">
          <DomainSegmentation ideas={ideas} selected={selectedDomain} onSelect={setSelectedDomain} />
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 p-5">
            <Analytics ideas={filteredIdeas} />
          </div>
          <RepoHelper />
        </aside>
      </main>

      <footer className="py-6 text-center text-xs text-neutral-500">Built with ❤️ — Track ideas, milestones, and progress at a glance.</footer>
    </div>
  );
}

export default App;

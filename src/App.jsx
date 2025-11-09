import React from 'react';
import HeroCover from './components/HeroCover';
import InteractiveDashboard from './components/InteractiveDashboard';
import DomainSegmentation from './components/DomainSegmentation';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';

const STAGES = ['Ideated', 'Prototyped', 'In Progress', 'Deployed'];

const STORAGE_KEY = 'ideas';

function useIdeas() {
  const [ideas, setIdeas] = React.useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
    } catch {}
  }, [ideas]);

  const addIdea = (idea) => setIdeas((arr) => [idea, ...arr]);
  const removeIdea = (id) => setIdeas((arr) => arr.filter((i) => i.id !== id));
  const toggleMilestone = (ideaId, index) =>
    setIdeas((arr) =>
      arr.map((i) => {
        if (i.id !== ideaId) return i;
        const checklist = (i.checklist || []).map((m, idx) => (idx === index ? { ...m, done: !m.done } : m));
        const doneCount = checklist.filter((m) => m.done).length;
        const autoProgress = checklist.length ? Math.round((doneCount / checklist.length) * 100) : i.progress || 0;
        return { ...i, checklist, progress: autoProgress };
      })
    );

  return { ideas, addIdea, removeIdea, toggleMilestone };
}

export default function App() {
  const { ideas, addIdea, removeIdea, toggleMilestone } = useIdeas();
  const [selectedDomain, setSelectedDomain] = React.useState('All');
  const [selectedStage, setSelectedStage] = React.useState('');

  const filtered = React.useMemo(() => {
    return ideas.filter((i) => {
      const domainOK = selectedDomain === 'All' || i.domain === selectedDomain;
      const stageOK = !selectedStage || i.stage === selectedStage;
      return domainOK && stageOK;
    });
  }, [ideas, selectedDomain, selectedStage]);

  return (
    <div className="min-h-screen bg-[#0b0c14] text-white">
      <HeroCover />

      <main className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <InteractiveDashboard
            ideas={ideas}
            onFilterByStage={(s) => setSelectedStage((prev) => (prev === s ? '' : s))}
            onFilterByDomain={(d) => setSelectedDomain((prev) => (prev === d ? 'All' : d))}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IdeaForm onAdd={addIdea} />
            <IdeaList ideas={filtered} onRemove={removeIdea} onToggleMilestone={toggleMilestone} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <DomainSegmentation ideas={ideas} selectedDomain={selectedDomain} onSelect={setSelectedDomain} />
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 text-white/80 text-sm">
            <p>
              Major domains we support:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-white/80">
              <li>AI/ML</li>
              <li>Web Apps</li>
              <li>Mobile</li>
              <li>Fintech</li>
              <li>HealthTech</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="mx-auto max-w-7xl px-6 pb-8 text-xs text-white/50">
        Built with a dark, futuristic palette and smooth motion. Click stages/domains in the dashboard to filter.
      </footer>
    </div>
  );
}

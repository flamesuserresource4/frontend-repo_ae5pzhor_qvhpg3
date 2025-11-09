import React from 'react';
import { Rocket, Github } from 'lucide-react';

export default function Header({ onExport, onImport }) {
  const fileInputRef = React.useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(String(evt.target?.result || '[]'));
        onImport(Array.isArray(data) ? data : []);
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-600 text-white">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">IdeaFlow Manager</h1>
            <p className="text-xs text-neutral-500">Capture. Plan. Ship.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExport}
            className="px-3 py-2 text-sm rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            title="Export data as JSON"
          >
            Export
          </button>
          <button
            onClick={handleImportClick}
            className="px-3 py-2 text-sm rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            title="Import data from JSON"
          >
            Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleFileChange}
            className="hidden"
          />
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            title="Connect GitHub later to auto-create repos"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

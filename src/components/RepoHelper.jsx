import React from 'react';
import { Github } from 'lucide-react';

export default function RepoHelper() {
  const [status, setStatus] = React.useState('');

  const guide = () => {
    setStatus('');
    const steps = [
      '1) Create a new GitHub repository (Public/Private).',
      '2) In your terminal, run: git init',
      '3) Add files: git add .',
      '4) Commit: git commit -m "Initial commit: IdeaFlow Manager"',
      '5) Connect remote: git branch -M main && git remote add origin <YOUR_REPO_URL>',
      '6) Push: git push -u origin main',
    ];
    alert(steps.join('\n'));
  };

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 flex items-start gap-3">
      <div className="p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"><Github className="w-5 h-5" /></div>
      <div className="flex-1">
        <h3 className="font-semibold">GitHub Repository</h3>
        <p className="text-sm text-neutral-500 mt-1">Use this helper to quickly push your project to a new repository.</p>
        <div className="mt-3 flex items-center gap-2">
          <button onClick={guide} className="px-3 py-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">Show Steps</button>
          {status && <span className="text-sm text-neutral-500">{status}</span>}
        </div>
      </div>
    </div>
  );
}

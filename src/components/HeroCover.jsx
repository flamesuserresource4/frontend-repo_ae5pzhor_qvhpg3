import React from 'react';
import Spline from '@splinetool/react-spline';
import { Moon, Sun } from 'lucide-react';

function useTheme() {
  const [dark, setDark] = React.useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true
  );

  React.useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

export default function HeroCover() {
  const { dark, toggle } = useTheme();

  return (
    <section className="relative w-full h-[60vh] min-h-[420px] overflow-hidden bg-gradient-to-b from-[#0b0c14] via-[#0b0c14] to-transparent">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Grainy gradient overlay that doesn't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(900px_500px_at_80%_10%,rgba(147,51,234,0.20),transparent)] mix-blend-screen dark:mix-blend-normal" />

      {/* Header / Theme toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/90 backdrop-blur-md transition hover:scale-[1.02] hover:bg-black/40"
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
          <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-end text-center px-6 pb-10">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-indigo-300 to-sky-300 drop-shadow-[0_2px_12px_rgba(99,102,241,0.25)]">
          idealow
        </h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/80">
          Manage ideas across domains with milestones, deadlines, and rich, futuristic visuals.
        </p>
      </div>
    </section>
  );
}

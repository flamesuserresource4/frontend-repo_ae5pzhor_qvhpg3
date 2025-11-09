import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function HeroCover() {
  return (
    <section className="relative h-[55vh] w-full overflow-hidden rounded-2xl bg-black/5">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient overlay that doesn't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/20 to-white" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 shadow-sm backdrop-blur">
          <Rocket className="h-4 w-4 text-rose-500" />
          <span className="text-xs font-medium tracking-wide text-gray-600">idea management — interactive & modern</span>
        </div>
        <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-gray-900">
          idealow
        </h1>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-gray-600">
          Organize ideas by domain, track progress, visualize trends, and ship faster with a beautiful, animated workspace.
        </p>
      </div>
    </section>
  );
}

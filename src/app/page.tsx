'use client';

import { useState } from 'react';
import { FilterData } from '@/types/filter';
import { defaultAppState } from '@/lib/filterDefaults';
import SortableFilterList from '@/components/SortableFilterList';
import PreviewArea from '@/components/PreviewArea';
import ClientOnlyWrapper from '@/components/ClientOnlyWrapper';
import FilterListSkeleton from '@/components/FilterListSkeleton';
import FloatingParticles from '@/components/FloatingParticles';

export default function Home() {
  const [filters, setFilters] = useState<Record<string, FilterData>>(defaultAppState.filters);

  const updateFilter = (filterId: string, updates: Partial<FilterData>) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: { ...prev[filterId], ...updates }
    }));
  };

  const resetFilters = () => {
    setFilters(defaultAppState.filters);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 gradient-surface"></div>
      
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Header */}
      <header className="relative z-10 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                CSSFilter.com
              </h1>
              <p className="text-slate-400 mt-2 font-medium">
                Version 2.0 • Advanced CSS Filter Generator with Drag & Drop
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="px-4 py-2 glass-card rounded-full">
                <span className="text-xs font-medium text-slate-300">Modern • Fast • Beautiful</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Filter Controls */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-100">Filter Controls</h2>
                  <p className="text-sm text-slate-400">
                    Drag to reorder • Toggle to enable/disable
                  </p>
                </div>
              </div>
              
              <ClientOnlyWrapper fallback={<FilterListSkeleton />}>
                <SortableFilterList
                  filters={filters}
                  onUpdateFilter={updateFilter}
                />
              </ClientOnlyWrapper>
            </div>
          </div>

          {/* Preview Area */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center border border-slate-600/30">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-300">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-100">Live Preview</h2>
                  <p className="text-sm text-slate-400">
                    Real-time filter application • Hover to see original
                  </p>
                </div>
              </div>
              
              <PreviewArea filters={filters} onReset={resetFilters} />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <section className="mt-12 glass-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 gradient-secondary rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-100">How It Works</h3>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              CSS filters are graphical effects similar to filters found in photography apps, 
              allowing in-browser post-processing of images. Create Instagram-like filters with 
              non-destructive edits and copy the CSS code to use on your website!
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-200 text-lg">Features:</h4>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-primary-400 mt-1">•</span>
                    Drag the grip icon to reorder filters
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-400 mt-1">•</span>
                    Toggle switches to enable/disable filters
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-400 mt-1">•</span>
                    Adjust values with sliders or inputs
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-200 text-lg">Getting Started:</h4>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-400 mt-1">•</span>
                    Change preview images to test effects
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-400 mt-1">•</span>
                    Hover over preview to see original image
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-400 mt-1">•</span>
                    Show CSS to see generated code
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-400 mt-1">•</span>
                    Copy CSS for use in your projects
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 glass-card border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 gradient-primary rounded-full"></div>
              <span className="font-semibold text-slate-200">CSSFilter.com</span>
            </div>
            <p className="text-slate-400 text-sm">
              <a href="https://greggant.com" className="hover:text-slate-200 transition-colors">
                by Greg Gant
              </a>
              {' • '}
              <a href="https://github.com/fuzzywalrus/cssfiltergenerator.com" className="hover:text-slate-200 transition-colors">
                View on GitHub
              </a>
            </p>
            <div className="mt-4 text-xs text-slate-500">
              Made with Next.js, TypeScript & Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { FilterData, OverlayConfig, Preset } from '@/types/filter';
import { defaultAppState } from '@/lib/filterDefaults';
import { filterConfigs } from '@/lib/filterDefaults';
import SortableFilterList from '@/components/SortableFilterList';
import PreviewArea from '@/components/PreviewArea';
import OverlayControls from '@/components/OverlayControls';
import PresetGallery from '@/components/PresetGallery';
import ClientOnlyWrapper from '@/components/ClientOnlyWrapper';
import FilterListSkeleton from '@/components/FilterListSkeleton';
import FloatingParticles from '@/components/FloatingParticles';
import { saveToLocalStorage, loadFromLocalStorage, createShareableURL, loadFromURL } from '@/lib/storage';

export default function Home() {
  const [filters, setFilters] = useState<Record<string, FilterData>>(defaultAppState.filters);
  const [overlay, setOverlay] = useState<OverlayConfig>(defaultAppState.overlay);
  const [currentImageSrc, setCurrentImageSrc] = useState('/demo.jpg');
  const [filtersExpanded, setFiltersExpanded] = useState(true);

  // Load from URL or localStorage on mount
  useEffect(() => {
    try {
      const urlState = loadFromURL();
      if (urlState && urlState.filters && urlState.overlay) {
        setFilters(urlState.filters);
        setOverlay(urlState.overlay);
      } else {
        const savedState = loadFromLocalStorage();
        if (savedState && savedState.filters && savedState.overlay) {
          setFilters(savedState.filters);
          setOverlay(savedState.overlay);
        }
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
      // Continue with default state if loading fails
    }
  }, []);

  const updateFilter = (filterId: string, updates: Partial<FilterData>) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: { ...prev[filterId], ...updates }
    }));
  };

  const updateOverlay = (updates: Partial<OverlayConfig>) => {
    setOverlay(prev => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(defaultAppState.filters);
    setOverlay(defaultAppState.overlay);
  };

  const applyPreset = (preset: Preset) => {
    // Reset to defaults first
    const newFilters = { ...defaultAppState.filters };
    
    // Apply preset filter values
    Object.entries(preset.filters).forEach(([filterId, value]) => {
      if (newFilters[filterId] && value !== undefined) {
        newFilters[filterId] = {
          ...newFilters[filterId],
          value,
          active: true
        };
      }
    });

    // Apply preset overlay if it exists
    let newOverlay = { ...defaultAppState.overlay };
    if (preset.overlay) {
      newOverlay = { ...newOverlay, ...preset.overlay };
    }

    setFilters(newFilters);
    setOverlay(newOverlay);
  };

  const saveFilter = () => {
    const state = { filters, overlay };
    const success = saveToLocalStorage(state);
    if (success) {
      alert('Filter saved successfully!');
    } else {
      alert('Failed to save filter. Please try again.');
    }
  };

  const createShareURL = () => {
    const state = { filters, overlay };
    const url = createShareableURL(state);
    navigator.clipboard.writeText(url).then(() => {
      alert('Share URL copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy URL. Please try manually: ' + url);
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 gradient-surface"></div>
      
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Header */}
      <header className="relative z-10 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              CSSFilter.com
            </h1>
            <p className="text-slate-400 mt-1 font-medium">
              Version 2.0 • Advanced CSS Filter Generator with Drag & Drop
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Filter Controls */}
            <div className="glass-card rounded-2xl p-6">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setFiltersExpanded(!filtersExpanded)}
              >
                <div className="flex items-center gap-3">
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
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className={`text-slate-400 transition-transform duration-200 ${filtersExpanded ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              {filtersExpanded && (
                <div className="mt-6">
                  <ClientOnlyWrapper fallback={<FilterListSkeleton />}>
                    <SortableFilterList
                      filters={filters}
                      onUpdateFilter={updateFilter}
                    />
                  </ClientOnlyWrapper>
                </div>
              )}
            </div>

            {/* Overlay Controls */}
            <OverlayControls
              overlay={overlay}
              onOverlayChange={updateOverlay}
            />

            {/* Save/Load Controls */}
            <div className="glass-card rounded-xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center border border-slate-600/30">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-300">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Save & Share</h3>
                  <p className="text-sm text-slate-400">
                    Save locally or create shareable URL
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={saveFilter}
                  className="btn-secondary flex-1 py-3 rounded-xl font-medium"
                >
                  Save Filter
                </button>
                <button
                  onClick={createShareURL}
                  className="btn-primary flex-1 py-3 rounded-xl font-medium"
                >
                  Share URL
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            {/* Preview Area */}
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
              
              <PreviewArea 
                filters={filters} 
                overlay={overlay}
                onReset={resetFilters}
                onImageChange={setCurrentImageSrc}
              />
            </div>

            {/* Presets */}
            <PresetGallery
              onApplyPreset={applyPreset}
              currentImageSrc={currentImageSrc}
            />
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
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Preset } from '@/types/filter';
import { presets } from '@/lib/presets';
import { generateFilterCSS } from '@/lib/cssGenerator';
import { defaultAppState } from '@/lib/filterDefaults';

interface PresetGalleryProps {
  onApplyPreset: (preset: Preset) => void;
  currentImageSrc: string;
}

export default function PresetGallery({ onApplyPreset, currentImageSrc }: PresetGalleryProps) {
  const [presetsExpanded, setPresetsExpanded] = useState(false);

  const extremePresets = presets.filter(p => p.category === 'extreme');
  const cssgramPresets = presets.filter(p => p.category === 'cssgram');

  // Generate filter CSS for a preset
  const getPresetFilterStyle = (preset: Preset): string => {
    const presetFilters = { ...defaultAppState.filters };
    Object.entries(preset.filters).forEach(([filterId, value]) => {
      if (presetFilters[filterId] && value !== undefined) {
        presetFilters[filterId] = {
          ...presetFilters[filterId],
          value,
          active: true
        };
      }
    });
    return generateFilterCSS(presetFilters);
  };

  // Generate overlay CSS for a preset
  const getPresetOverlayCSS = (preset: Preset): string => {
    if (!preset.overlay || preset.overlay.type === 'none') return '';
    
    let background = '';
    if (preset.overlay.type === 'solid' && preset.overlay.solidColor) {
      background = preset.overlay.solidColor;
    } else if (preset.overlay.type === 'gradient' && preset.overlay.gradientColor1 && preset.overlay.gradientColor2 && preset.overlay.gradientOrientation) {
      background = `${preset.overlay.gradientOrientation}, ${preset.overlay.gradientColor1}, ${preset.overlay.gradientColor2})`;
    }
    
    if (!background) return '';
    
    return `
      .preset-preview[data-preset-id="${preset.id}"] .myfilter::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${background};
        mix-blend-mode: ${preset.overlay.blendMode || 'normal'};
        pointer-events: none;
      }
    `;
  };

  // Generate overlay CSS for all presets with overlays
  const allOverlayCSS = [...extremePresets, ...cssgramPresets]
    .map(preset => getPresetOverlayCSS(preset))
    .filter(css => css)
    .join('\n');

  return (
    <div className="glass-card rounded-xl p-6 border border-white/10">
      {/* Inject overlay CSS for preset previews */}
      {allOverlayCSS && (
        <style dangerouslySetInnerHTML={{ __html: allOverlayCSS }} />
      )}
      
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setPresetsExpanded(!presetsExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 gradient-accent rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
              <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">Filter Presets</h3>
            <p className="text-sm text-slate-400">
              Professional filter combinations
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            className={`text-slate-400 transition-transform duration-200 ${presetsExpanded ? 'rotate-180' : ''}`}
          >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {presetsExpanded && (
        <div className="mt-6">
          {/* Extreme Presets */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-slate-200 mb-4">
              CSSFilter <span className="text-primary-400">EXTREME</span> Presets
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {extremePresets.map((preset) => (
                <div
                  key={preset.id}
                  className="cursor-pointer group"
                  onClick={() => onApplyPreset(preset)}
                >
                  <div className="relative w-full h-24 mb-2 rounded-lg overflow-hidden ring-2 ring-transparent group-hover:ring-primary-400/50 transition-all duration-300 preset-preview" data-preset-id={preset.id}>
                    <div className="relative w-full h-full myfilter">
                      <Image
                        src={currentImageSrc}
                        alt={`${preset.name} preset`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        style={{ filter: getPresetFilterStyle(preset) }}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <small className="text-xs text-slate-300 font-medium">{preset.name}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CSSGram Presets */}
          <div>
            <h4 className="text-lg font-semibold text-slate-200 mb-2">
              CSSGram Presets
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              courtesy of <a href="https://una.im/CSSgram/" className="text-primary-400 hover:text-primary-300">CSSGram</a>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {cssgramPresets.map((preset) => (
                <div
                  key={preset.id}
                  className="cursor-pointer group"
                  onClick={() => onApplyPreset(preset)}
                >
                  <div className="relative w-full h-20 mb-2 rounded-lg overflow-hidden ring-2 ring-transparent group-hover:ring-primary-400/50 transition-all duration-300 preset-preview" data-preset-id={preset.id}>
                    <div className="relative w-full h-full myfilter">
                      <Image
                        src={currentImageSrc}
                        alt={`${preset.name} preset`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        style={{ filter: getPresetFilterStyle(preset) }}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <small className="text-xs text-slate-300 font-medium">{preset.name}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
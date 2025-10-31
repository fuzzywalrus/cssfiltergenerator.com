'use client';

import { useState } from 'react';
import { OverlayConfig, OverlayType, BlendMode, GradientOrientation } from '@/types/filter';

interface OverlayControlsProps {
  overlay: OverlayConfig;
  onOverlayChange: (updates: Partial<OverlayConfig>) => void;
}

const blendModes: { value: BlendMode; label: string }[] = [
  { value: 'multiply', label: 'multiply' },
  { value: 'screen', label: 'screen' },
  { value: 'overlay', label: 'overlay' },
  { value: 'darken', label: 'darken' },
  { value: 'lighten', label: 'lighten' },
  { value: 'color-dodge', label: 'color-dodge' },
  { value: 'color-burn', label: 'color-burn' },
  { value: 'hard-light', label: 'hard-light' },
  { value: 'soft-light', label: 'soft-light' },
  { value: 'difference', label: 'difference' },
  { value: 'exclusion', label: 'exclusion' },
  { value: 'hue', label: 'hue' },
  { value: 'saturation', label: 'saturation' },
  { value: 'color', label: 'color' },
  { value: 'luminosity', label: 'luminosity' },
  { value: 'normal', label: 'normal' }
];

const gradientOrientations: { value: GradientOrientation; label: string }[] = [
  { value: 'linear-gradient(to right', label: 'horizontal →' },
  { value: 'linear-gradient(to left', label: 'horizontal ←' },
  { value: 'linear-gradient(to bottom', label: 'vertical ↓' },
  { value: 'linear-gradient(to top', label: 'vertical ↑' },
  { value: 'linear-gradient(45deg', label: 'diagonal ↗' },
  { value: 'linear-gradient(135deg', label: 'diagonal ↘' },
  { value: 'linear-gradient(225deg', label: 'diagonal ↙' },
  { value: 'linear-gradient(315deg', label: 'diagonal ↖' },
  { value: 'radial-gradient(ellipse at center', label: 'radial ○' }
];

export default function OverlayControls({ overlay, onOverlayChange }: OverlayControlsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="glass-card rounded-xl p-6 border border-white/10">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 gradient-secondary rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="m2 17 10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="m2 12 10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">Mix-Blend Overlay</h3>
            <p className="text-sm text-slate-400">
              Add color overlays with blend modes
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-6">
          {/* Overlay Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Overlay Type:
            </label>
            <div className="flex gap-4">
              {(['none', 'solid', 'gradient'] as OverlayType[]).map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="overlayType"
                    value={type}
                    checked={overlay.type === type}
                    onChange={(e) => onOverlayChange({ type: e.target.value as OverlayType })}
                    className="w-4 h-4 text-primary-600 bg-black/30 border-white/20 focus:ring-primary-500"
                  />
                  <span className="text-slate-300 capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Solid Color Controls */}
          {overlay.type === 'solid' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Solid Color:
              </label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={overlay.solidColor.startsWith('rgba') ? '#5367ce' : overlay.solidColor}
                  onChange={(e) => onOverlayChange({ solidColor: e.target.value })}
                  className="w-12 h-12 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={overlay.solidColor}
                  onChange={(e) => onOverlayChange({ solidColor: e.target.value })}
                  placeholder="rgba(255, 0, 0, 0.5)"
                  className="flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
                />
              </div>
            </div>
          )}

          {/* Gradient Color Controls */}
          {overlay.type === 'gradient' && (
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Gradient Color 1:
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={overlay.gradientColor1.startsWith('rgba') ? '#ffffff' : overlay.gradientColor1}
                    onChange={(e) => onOverlayChange({ gradientColor1: e.target.value })}
                    className="w-12 h-12 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={overlay.gradientColor1}
                    onChange={(e) => onOverlayChange({ gradientColor1: e.target.value })}
                    placeholder="rgba(255, 255, 255, 0.4)"
                    className="flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Gradient Color 2:
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={overlay.gradientColor2.startsWith('rgba') ? '#ff003e' : overlay.gradientColor2}
                    onChange={(e) => onOverlayChange({ gradientColor2: e.target.value })}
                    className="w-12 h-12 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={overlay.gradientColor2}
                    onChange={(e) => onOverlayChange({ gradientColor2: e.target.value })}
                    placeholder="rgba(255, 0, 62, 0.9)"
                    className="flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Gradient Direction:
                </label>
                <div className="relative">
                  <select
                    value={overlay.gradientOrientation}
                    onChange={(e) => onOverlayChange({ gradientOrientation: e.target.value as GradientOrientation })}
                    className="w-full px-4 py-3 pr-10 bg-black/30 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all appearance-none cursor-pointer hover:bg-black/40"
                  >
                    {gradientOrientations.map((orientation) => (
                      <option key={orientation.value} value={orientation.value} className="bg-slate-800 text-slate-200">
                        {orientation.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-400">
                      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blend Mode Selection */}
          {overlay.type !== 'none' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Blend Mode:
              </label>
              <div className="relative">
                <select
                  value={overlay.blendMode}
                  onChange={(e) => onOverlayChange({ blendMode: e.target.value as BlendMode })}
                  className="w-full px-4 py-3 pr-10 bg-black/30 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all appearance-none cursor-pointer hover:bg-black/40"
                >
                  {blendModes.map((mode) => (
                    <option key={mode.value} value={mode.value} className="bg-slate-800 text-slate-200">
                      {mode.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-400">
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
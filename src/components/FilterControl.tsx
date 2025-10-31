'use client';

import { FilterConfig, FilterData } from '@/types/filter';

interface FilterControlProps {
  config: FilterConfig;
  data: FilterData;
  onValueChange: (value: number) => void;
  onActiveChange: (active: boolean) => void;
  dragHandleProps?: any;
}

export default function FilterControl({
  config,
  data,
  onValueChange,
  onActiveChange,
  dragHandleProps
}: FilterControlProps) {
  return (
    <div className="glass-card rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-glow group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div {...dragHandleProps} className="drag-handle">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="transition-colors duration-300"
            >
              <circle cx="9" cy="12" r="1" fill="currentColor"/>
              <circle cx="9" cy="5" r="1" fill="currentColor"/>
              <circle cx="9" cy="19" r="1" fill="currentColor"/>
              <circle cx="15" cy="12" r="1" fill="currentColor"/>
              <circle cx="15" cy="5" r="1" fill="currentColor"/>
              <circle cx="15" cy="19" r="1" fill="currentColor"/>
            </svg>
          </div>
          <label className="font-semibold text-slate-200 text-sm tracking-wide">
            {config.label}
          </label>
        </div>
        
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={data.active}
            onChange={(e) => onActiveChange(e.target.checked)}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>
      
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={data.value}
          onChange={(e) => onValueChange(parseFloat(e.target.value))}
          className="flex-1 filter-slider"
          disabled={!data.active}
        />
        <div className="relative">
          <input
            type="number"
            min={config.min}
            max={config.max}
            step={config.step}
            value={data.value}
            onChange={(e) => onValueChange(parseFloat(e.target.value) || 0)}
            className="w-20 px-3 py-2 text-sm font-medium text-center"
            disabled={!data.active}
          />
          {config.unit && (
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-slate-400">
              {config.unit}
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-3 h-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-20"></div>
    </div>
  );
}
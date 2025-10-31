'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FilterData, OverlayConfig } from '@/types/filter';
import { generateFilterCSS, generateCSSCode } from '@/lib/cssGenerator';

interface PreviewAreaProps {
  filters: Record<string, FilterData>;
  overlay: OverlayConfig;
  onReset?: () => void;
  onImageChange?: (imageSrc: string) => void;
}

const demoImages = [
  { src: '/demo.jpg', alt: 'Demo Image', name: 'Demo' },
  { src: '/dalles.jpg', alt: 'The Dalles, Oregon', name: 'The Dalles' },
  { src: '/paintedhills.jpg', alt: 'Painted Hills, Oregon', name: 'Painted Hills' },
  { src: '/hood.jpg', alt: 'Mt Hood, Oregon', name: 'Mt. Hood' },
  { src: '/columbia-gorge.jpg', alt: 'Columbia Gorge, Oregon', name: 'Columbia Gorge' },
  { src: '/south-sister.jpg', alt: 'South Sister, Oregon', name: 'South Sister' },
];

export default function PreviewArea({ filters, overlay, onReset, onImageChange }: PreviewAreaProps) {
  const [currentImage, setCurrentImage] = useState(demoImages[0]);
  const [cssExpanded, setCssExpanded] = useState(true);
  const [includePrefixes, setIncludePrefixes] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');

  const filterStyle = generateFilterCSS(filters);
  const cssCode = generateCSSCode(filters, overlay, includePrefixes);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customImageUrl.trim()) {
      const newImage = {
        src: customImageUrl.trim(),
        alt: 'Custom Image',
        name: 'Custom Image'
      };
      setCurrentImage(newImage);
      onImageChange?.(newImage.src);
      setShowImageSelector(false);
    }
  };

  // Generate overlay CSS for preview
  const overlayCSS = overlay.type !== 'none' ? (() => {
    let background = '';
    if (overlay.type === 'solid') {
      background = overlay.solidColor;
    } else if (overlay.type === 'gradient') {
      background = `${overlay.gradientOrientation}, ${overlay.gradientColor1}, ${overlay.gradientColor2})`;
    }
    
    return `
      .preview-container .myfilter::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${background};
        mix-blend-mode: ${overlay.blendMode};
        pointer-events: none;
      }
    `;
  })() : '';

  return (
    <div className="space-y-6">
      {/* Inject overlay CSS for preview */}
      {overlayCSS && (
        <style dangerouslySetInnerHTML={{ __html: overlayCSS }} />
      )}
      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <button
          onClick={() => setShowImageSelector(!showImageSelector)}
          className="btn-primary px-6 py-3 rounded-xl font-medium"
        >
          Change Image
        </button>
        
        <button
          onClick={onReset}
          className="btn-danger px-6 py-3 rounded-xl font-medium"
        >
          Reset
        </button>
      </div>

      {/* Image Selector */}
      {showImageSelector && (
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <h4 className="text-lg font-semibold text-slate-200 mb-6">Choose Preview Image</h4>
          
          {/* URL Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Or use a custom image URL:
            </label>
            <form onSubmit={handleUrlSubmit} className="flex gap-3">
              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
              />
              <button
                type="submit"
                className="btn-primary px-6 py-3 rounded-lg font-medium"
              >
                Use URL
              </button>
            </form>
          </div>
          
          {/* Demo Images */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Or choose from demo images:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {demoImages.map((image) => (
                <div
                  key={image.src}
                  className="cursor-pointer text-center hover:scale-105 transition-all duration-300 group"
                  onClick={() => {
                    setCurrentImage(image);
                    onImageChange?.(image.src);
                    setShowImageSelector(false);
                  }}
                >
                  <div className="relative w-full h-20 mb-2 rounded-lg overflow-hidden ring-2 ring-transparent group-hover:ring-primary-400/50 transition-all duration-300">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                    />
                  </div>
                  <small className="text-xs text-slate-300 font-medium">{image.name}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Preview Image */}
      <div className="relative glass-card rounded-2xl overflow-hidden border border-white/10 preview-container group">
        <div className="relative w-full h-96 myfilter">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-cover preview-image"
            style={{ filter: filterStyle }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Hover overlay indicator */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white text-xs font-medium bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
              Original Image
            </div>
          </div>
          {/* Image name overlay */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white text-sm font-medium bg-black/70 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
              {currentImage.name}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="gradient-surface p-4 border-b border-white/10">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setCssExpanded(!cssExpanded)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 gradient-accent rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="m18 16 4-4-4-4m-6 8-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h5 className="text-slate-100 font-bold text-lg">Generated CSS</h5>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-3 text-slate-300 text-sm">
                <span>Browser Prefixes</span>
                <label className="toggle-switch scale-75">
                  <input
                    type="checkbox"
                    checked={includePrefixes}
                    onChange={(e) => setIncludePrefixes(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </label>
              
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className={`text-slate-400 transition-transform duration-200 ${cssExpanded ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {cssExpanded && (
          <div className="p-6 space-y-4">
            <div>
              <p className="text-slate-400 text-sm font-medium mb-2">HTML:</p>
              <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                <code className="text-blue-300 text-sm">
                  &lt;div class=&quot;myfilter&quot;&gt;&lt;img src=&quot;my/path/to/image.jpg&quot;&gt;&lt;/div&gt;
                </code>
              </div>
            </div>
            
            <div>
              <p className="text-slate-400 text-sm font-medium mb-2">CSS:</p>
              <div className="bg-black/30 rounded-lg p-4 border border-white/5 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                  {cssCode}
                </pre>
              </div>
            </div>
            
            <button 
              onClick={() => navigator.clipboard.writeText(cssCode)}
              className="btn-primary w-full py-3 rounded-xl font-medium"
            >
              Copy CSS to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
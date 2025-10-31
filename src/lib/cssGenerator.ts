import { FilterData, OverlayConfig } from '@/types/filter';
import { filterConfigs } from './filterDefaults';

const isDefaultValue = (filterId: string, value: number): boolean => {
  const config = filterConfigs[filterId];
  return value === config.defaultValue;
};

const hasEffect = (filterId: string, value: number): boolean => {
  // For filters where default value means "no effect", exclude them
  switch (filterId) {
    case 'blur':
      return value > 0;
    case 'brightness':
    case 'contrast':
    case 'opacity':
    case 'saturate':
      return value !== 1;
    case 'grayscale':
    case 'invert':
    case 'sepia':
      return value > 0;
    case 'huerotate':
      return value !== 0;
    default:
      return !isDefaultValue(filterId, value);
  }
};

export const generateFilterCSS = (filters: Record<string, FilterData>): string => {
  const activeFilters = Object.entries(filters)
    .filter(([_, filter]) => filter.active)
    .filter(([filterId, filter]) => hasEffect(filterId, filter.value))
    .sort((a, b) => a[1].position - b[1].position)
    .map(([filterId, filter]) => {
      const config = filterConfigs[filterId];
      const unit = config.unit || '';
      
      if (filterId === 'huerotate') {
        return `hue-rotate(${filter.value}${unit})`;
      }
      
      return `${filterId}(${filter.value}${unit})`;
    });

  return activeFilters.length > 0 ? activeFilters.join(' ') : 'none';
};

const generateOverlayCSS = (overlay: OverlayConfig): string => {
  if (overlay.type === 'none') {
    return '';
  }

  let background = '';
  
  if (overlay.type === 'solid') {
    background = overlay.solidColor;
  } else if (overlay.type === 'gradient') {
    background = `${overlay.gradientOrientation}, ${overlay.gradientColor1}, ${overlay.gradientColor2})`;
  }

  return `
.myfilter {
  position: relative;
}

.myfilter:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${background};
  mix-blend-mode: ${overlay.blendMode};
  pointer-events: none;
}`;
};

export const generateCSSCode = (
  filters: Record<string, FilterData>, 
  overlay: OverlayConfig,
  withPrefixes: boolean = false
): string => {
  const filterValue = generateFilterCSS(filters);
  const overlayCSS = generateOverlayCSS(overlay);
  
  const baseCSS = `.myfilter img {
  filter: ${filterValue};
}`;

  const prefixedCSS = `.myfilter img {
  filter: ${filterValue};
  -webkit-filter: ${filterValue};
  -moz-filter: ${filterValue};
}`;

  const filterCSS = withPrefixes ? prefixedCSS : baseCSS;
  
  return overlayCSS ? `${filterCSS}${overlayCSS}` : filterCSS;
};
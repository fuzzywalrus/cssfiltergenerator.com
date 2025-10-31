import { FilterData } from '@/types/filter';
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

export const generateCSSCode = (filters: Record<string, FilterData>, withPrefixes: boolean = false): string => {
  const filterValue = generateFilterCSS(filters);
  
  const baseCSS = `.myfilter img {
  filter: ${filterValue};
}`;

  if (!withPrefixes) {
    return baseCSS;
  }

  return `.myfilter img {
  filter: ${filterValue};
  -webkit-filter: ${filterValue};
  -moz-filter: ${filterValue};
}`;
};
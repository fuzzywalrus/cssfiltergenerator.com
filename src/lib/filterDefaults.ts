import { FilterConfig, FilterData, AppState } from '@/types/filter';

export const filterConfigs: Record<string, FilterConfig> = {
  blur: {
    id: 'blur',
    label: 'Blur',
    min: 0,
    max: 75,
    step: 0.01,
    defaultValue: 0,
    unit: 'px'
  },
  brightness: {
    id: 'brightness',
    label: 'Brightness',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 1
  },
  contrast: {
    id: 'contrast',
    label: 'Contrast',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 1
  },
  grayscale: {
    id: 'grayscale',
    label: 'Grayscale',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0
  },
  huerotate: {
    id: 'huerotate',
    label: 'Hue-Rotate',
    min: -360,
    max: 360,
    step: 1,
    defaultValue: 0,
    unit: 'deg'
  },
  invert: {
    id: 'invert',
    label: 'Invert',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0
  },
  opacity: {
    id: 'opacity',
    label: 'Opacity',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 1
  },
  saturate: {
    id: 'saturate',
    label: 'Saturate',
    min: 0,
    max: 3,
    step: 0.01,
    defaultValue: 1
  },
  sepia: {
    id: 'sepia',
    label: 'Sepia',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0
  }
};

export const createDefaultFilters = (): Record<string, FilterData> => {
  const filters: Record<string, FilterData> = {};
  
  Object.values(filterConfigs).forEach((config, index) => {
    filters[config.id] = {
      value: config.defaultValue,
      position: index,
      active: true
    };
  });
  
  return filters;
};

export const defaultAppState: AppState = {
  filters: createDefaultFilters(),
  overlay: {
    type: 'none',
    solidColor: '#5367ce',
    gradientColor1: 'rgba(255, 255, 255, 0.4)',
    gradientColor2: 'rgba(255, 0, 62, 0.9)',
    blendMode: 'multiply',
    gradientOrientation: 'linear-gradient(to right'
  }
};
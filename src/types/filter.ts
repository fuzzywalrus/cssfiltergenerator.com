export interface FilterData {
  value: number;
  position: number;
  active: boolean;
}

export interface FilterConfig {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
}

export type OverlayType = 'none' | 'solid' | 'gradient';
export type BlendMode = 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity' | 'normal';
export type GradientOrientation = 'linear-gradient(to right' | 'linear-gradient(to left' | 'linear-gradient(to bottom' | 'linear-gradient(to top' | 'linear-gradient(45deg' | 'linear-gradient(135deg' | 'linear-gradient(225deg' | 'linear-gradient(315deg' | 'radial-gradient(ellipse at center';

export interface OverlayConfig {
  type: OverlayType;
  solidColor: string;
  gradientColor1: string;
  gradientColor2: string;
  blendMode: BlendMode;
  gradientOrientation: GradientOrientation;
}

export interface Preset {
  id: string;
  name: string;
  filters: Partial<Record<string, number>>;
  overlay?: Partial<OverlayConfig>;
  category: 'extreme' | 'cssgram';
}

export interface AppState {
  filters: Record<string, FilterData>;
  overlay: OverlayConfig;
  currentImageSrc?: string;
}
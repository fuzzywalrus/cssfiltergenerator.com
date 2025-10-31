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

export interface OverlayConfig {
  color0: string;
  color1: string;
  color2: string;
  select: string;
  blend: string;
  gradientOrientation: string;
}

export interface AppState {
  filters: Record<string, FilterData>;
  overlay: OverlayConfig;
}
import { AppState } from '@/types/filter';

const STORAGE_KEY = 'cssfilter-saved-state';

export const saveToLocalStorage = (state: AppState): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
};

export const loadFromLocalStorage = (): AppState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (validateAppState(parsed)) {
        return parsed;
      } else {
        console.warn('Invalid app state structure in localStorage');
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
};

export const createShareableURL = (state: AppState): string => {
  try {
    const encoded = btoa(JSON.stringify(state));
    const url = new URL(window.location.href);
    url.searchParams.set('filter', encoded);
    return url.toString();
  } catch (error) {
    console.error('Failed to create shareable URL:', error);
    return window.location.href;
  }
};

const validateAppState = (state: any): state is AppState => {
  try {
    return (
      state &&
      typeof state === 'object' &&
      state.filters &&
      typeof state.filters === 'object' &&
      state.overlay &&
      typeof state.overlay === 'object' &&
      typeof state.overlay.type === 'string' &&
      ['none', 'solid', 'gradient'].includes(state.overlay.type) &&
      (state.currentImageSrc === undefined || typeof state.currentImageSrc === 'string')
    );
  } catch (error) {
    console.error('Error validating app state:', error);
    return false;
  }
};

export const loadFromURL = (): AppState | null => {
  try {
    if (typeof window === 'undefined') return null;
    
    const url = new URL(window.location.href);
    const filterParam = url.searchParams.get('filter');
    
    if (filterParam) {
      try {
        const decoded = atob(filterParam);
        const parsed = JSON.parse(decoded);
        
        // Validate the parsed state
        if (validateAppState(parsed)) {
          return parsed;
        } else {
          console.warn('Invalid app state structure in URL');
          return null;
        }
      } catch (parseError) {
        console.error('Failed to parse URL filter parameter:', parseError);
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to load from URL:', error);
    return null;
  }
};
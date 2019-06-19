import { themes } from './themes';

export const STORAGE_KEY = 'THEME_ID';
export type Theme = typeof themes[0];
export * from './StyleGuide';
export * from './themes';
export * from './ThemeHelper';

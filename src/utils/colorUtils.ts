import { contrast } from './contrast';

export const isLight = (color: string) => contrast(color) === 'light';

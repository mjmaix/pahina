import hexToRgb from 'hex-to-rgb';

function toRgb(hex: string) {
  const rgb = hexToRgb(hex);
  const o = Math.round(
    (parseInt(rgb[0], 10) * 299 +
      parseInt(rgb[1], 10) * 587 +
      parseInt(rgb[2], 10) * 114) /
      1000,
  );

  return o;
}

export function contrast(hex: string) {
  return toRgb(hex) <= 180 ? 'dark' : 'light';
}

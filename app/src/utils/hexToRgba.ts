export const hexToRgbA = (hex: string, opacity: number = 1) => {
  let c: string[] | string;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    const d: any = '0x' + c.join('');
    return (
      // tslint:disable-next-line: no-bitwise
      `rgba( ${[(d >> 16) & 255, (d >> 8) & 255, d & 255].join(
        ',',
      )},${opacity})`
    );
  }
  throw new Error('Bad Hex');
};

export const pretty = (obj: any) => JSON.stringify(obj, undefined, 2);
export const isoNow = () => new Date(Date.now()).toISOString();

export const pretty = (obj: any) => JSON.stringify(obj, undefined, 2);
export const utcNow = () => new Date(Date.now()).toUTCString();

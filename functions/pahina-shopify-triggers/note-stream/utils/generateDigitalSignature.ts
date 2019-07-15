export const generateDigitalSignature = (obj: any) => {
  return new Buffer(obj).toString('base64');
};

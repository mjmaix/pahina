import crypto from 'crypto';
export const hmacEncrypt = (secret: string, jsonStringifiedData: string) => {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(jsonStringifiedData)
    .digest('base64');

  return hash;
};

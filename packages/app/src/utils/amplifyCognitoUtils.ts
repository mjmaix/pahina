export const generateTotpLink = (
  user: string,
  secret: string,
  issuer: string,
) => {
  return `otpauth://totp/AWSCognito:${user}?secret=${secret}&issuer=${issuer}`;
};

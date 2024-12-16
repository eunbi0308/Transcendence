import * as speakeasy from 'speakeasy';

export function verifyTwoFactorAuthentication(secret: string, token: string): boolean {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32', // Ensure the encoding matches how the secret was generated
    token: token,
  });
}
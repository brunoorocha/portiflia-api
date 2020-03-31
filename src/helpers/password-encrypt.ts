import * as crypto from 'crypto';

const interations = 10000;
const keylen = 512;
const digest = 'sha512';

export const encryptPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, interations, keylen, digest).toString('hex');
  return { salt, hash };
}

export const isPasswordValid = (password: string, hash: string, salt: string): boolean => {
  const hashFromGivenPassword = crypto.pbkdf2Sync(password, salt, interations, keylen, digest).toString('hex');
  return hash === hashFromGivenPassword;
}
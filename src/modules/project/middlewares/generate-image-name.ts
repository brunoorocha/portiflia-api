import * as crypto from 'crypto';

export const GenerateImageName = (res, file, callback) => {
  const randomName = crypto.randomBytes(16).toString('hex');
  callback(null, randomName);
}

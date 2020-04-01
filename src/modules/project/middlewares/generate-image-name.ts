import * as crypto from 'crypto';

export const GenerateImageName = (res, file, callback) => {
  const randomName = crypto.randomBytes(16).toString('hex');
  const fileExtension = (file.originalname as string).split('.').pop();
  callback(null, `${randomName}.${fileExtension}`);
}

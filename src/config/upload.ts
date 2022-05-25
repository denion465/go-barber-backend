import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const tmpFolder =  path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomUUID().replaceAll('-', '');
        const fileName = `${fileHash}_${file.originalname}`;

        return callback(null, fileName);
      }
    })
  }
};

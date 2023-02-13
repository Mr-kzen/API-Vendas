import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadFoolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFoolder,
  storage: multer.diskStorage({
    destination: uploadFoolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');

      const fileName = `${fileHash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};

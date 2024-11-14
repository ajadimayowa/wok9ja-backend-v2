import { S3Client } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-providers';
import multer from 'multer';
import multerS3 from 'multer-s3';
import doten from 'dotenv';

doten.config();

console.log("AWS Region:", process.env.AWS_REGION);
console.log("Bucket Name:", process.env.AWS_BUCKET_NAME);
console.log("Access Key ID:", process.env.AWS_ACCESS_KEY_ID);


// Initialize S3Client with AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: fromEnv(),
});
console.log("Bucket name:", process.env.AWS_BUCKET_NAME);

// Set up multer with multer-s3 and S3Client
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME || '',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

export default upload;

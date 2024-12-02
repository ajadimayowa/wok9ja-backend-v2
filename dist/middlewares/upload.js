"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const credential_providers_1 = require("@aws-sdk/credential-providers");
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("AWS Region:", process.env.AWS_REGION);
console.log("Bucket Name:", process.env.AWS_BUCKET_NAME);
console.log("Access Key ID:", process.env.AWS_ACCESS_KEY_ID);
// Initialize S3Client with AWS SDK v3
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: (0, credential_providers_1.fromEnv)(),
});
console.log("Bucket name:", process.env.AWS_BUCKET_NAME);
// Set up multer with multer-s3 and S3Client
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
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
exports.default = upload;

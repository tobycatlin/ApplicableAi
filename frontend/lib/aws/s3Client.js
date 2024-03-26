import { S3Client } from "@aws-sdk/client-s3";

const region = process.env.AWS_DEFAULT_REGION;

const cloudWatchClient = new S3Client({
  region: region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default cloudWatchClient;

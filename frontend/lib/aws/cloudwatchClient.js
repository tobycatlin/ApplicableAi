import { CloudWatchClient } from "@aws-sdk/client-cloudwatch";

const region = process.env.AWS_DEFAULT_REGION;

const cloudWatchClient = new CloudWatchClient({
  region: region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default cloudWatchClient;

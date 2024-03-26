import * as Minio from "minio";

const region = process.env.AWS_DEFAULT_REGION;

var minioClient = new Minio.Client({
  endPoint: "172.18.0.2",
  port: 9000,
  useSSL: false,
  accessKey: "XAiZcRZfpdqyH0LHxGyS",
  secretKey: "7kZmznmkdXsR0ihbk3P95lGXhJPOlqWR84Xp9UKx",
});

export default minioClient;

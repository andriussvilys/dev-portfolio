import { S3Client } from "@aws-sdk/client-s3";

const Bucket = process.env.AWS_S3_BUCKET_NAME;
const s3 = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_IAM_USER_ID as string,
    secretAccessKey: process.env.AWS_IAM_USER_SECRET as string,
  },
});

export { s3, Bucket };

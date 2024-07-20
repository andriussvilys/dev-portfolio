import { PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
  
  const Bucket = process.env.AWS_S3_BUCKET_NAME;
  const s3 = new S3Client({
    region: process.env.AWS_S3_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_IAM_USER_ID as string,
      secretAccessKey: process.env.AWS_IAM_USER_SECRET as string,
    },
  });

export async function GET() {
    return NextResponse.json({ message: "Hello World" }, {status: 200});
  }

export async function POST(request: Request) {
    try {
      console.log("-----------------POST")
      console.log(request)
        const formData = await request.formData();

        console.log(formData)
    
        const file = formData.get("file") as File;
        const buffer = Buffer.from(await file.arrayBuffer());

        const params:PutObjectCommandInput = {
          Bucket,
          Key: file.name,
          Body: buffer,
        }

        await  s3.send(new PutObjectCommand(params));

        return NextResponse.json({ succes: true }, {status: 200});
      } catch (e) {
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
      }
}
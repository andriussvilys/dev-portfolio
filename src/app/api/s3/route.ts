import { ListObjectsV2Command, ListObjectsV2CommandInput, PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
  
  const Bucket = process.env.AWS_S3_BUCKET_NAME;
  const s3 = new S3Client({
    region: process.env.AWS_S3_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_IAM_USER_ID as string,
      secretAccessKey: process.env.AWS_IAM_USER_SECRET as string,
    },
  });

export async function GET(request: Request) {
  try{
    const params:ListObjectsV2CommandInput = {
      Bucket
    }
    const res = await s3.send(new ListObjectsV2Command(params));
    
    return NextResponse.json({data: res}, {status: 200});
  }
  catch(e){
    return NextResponse.json({ status: "fail", error: e }, {status: 500});
  }
}

export async function PUT(request: Request) {
  try {
    console.log("being upload ----------------------")
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const buffer = Buffer.from(await file.arrayBuffer());

    console.log(formData.get("metadata"))

    const params:PutObjectCommandInput = {
      Bucket,
      Key: file.name,
      Body: buffer,
      Metadata: formData.get("metadata") ? JSON.parse(formData.get("metadata") as string) : {}
    }

    console.log(params)

    await  s3.send(new PutObjectCommand(params));
    return NextResponse.json({ succes: true }, {status: 200});
  } 
  catch (e) {
    return NextResponse.json({ status: "fail", error: e }, {status: 500});
  }
}

export async function POST(request: Request) {
  try{
    const res = await PUT(request);
    return NextResponse.json({status: "success"}, {status: res.status});
  }
  catch (e) {
    return NextResponse.json({ status: "fail", error: e }, {status: 500});
  }
}
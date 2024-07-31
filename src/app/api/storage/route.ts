import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { Bucket, s3 } from "./vars";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const buffer = Buffer.from(await file.arrayBuffer());
    const params:PutObjectCommandInput = {
      Bucket,
      Key: formData.get("key")?.toString(),
      Body: buffer,
    }
    const res = await s3.send(new PutObjectCommand(params));
    if(res.$metadata.httpStatusCode === 200){
      return NextResponse.json({...res, key: params.Key}, {status: 200});
    }
    else{
      throw new Error("failed to upload");
    }
  } 
  catch (e) {
    return NextResponse.json({ status: "fail", error: e }, {status: 500});
  }
}
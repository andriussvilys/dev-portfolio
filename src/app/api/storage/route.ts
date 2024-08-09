import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { Bucket, s3 } from "./vars";
import { createKey } from "@/src/lib/storage";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const collection = formData.get("collection") as string;
    const Body = Buffer.from(await file.arrayBuffer());
    const Key = createKey(file, collection);
    const params:PutObjectCommandInput = {
      Bucket,
      Key,
      Body,
    }
    const res = await s3.send(new PutObjectCommand(params));
    if(res.$metadata.httpStatusCode === 200){
      return NextResponse.json({...res, key: Key}, {status: 200});
    }
    else{
      throw new Error("failed to upload");
    }
  } 
  catch (e) {
    return NextResponse.json({ status: "fail", error: e }, {status: 500});
  }
}
import { ListObjectsV2Command, ListObjectsV2CommandInput, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { Bucket, s3 } from "./vars";
  
export async function GET(request: Request) {
  try{
    const params:ListObjectsV2CommandInput = {
      Bucket
    }
    const res = await s3.send(new ListObjectsV2Command(params));
    
    return NextResponse.json(res, {status: 200});
  }
  catch(e){
    return NextResponse.json({ status: "fail", error: e }, {status: 500});
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const buffer = Buffer.from(await file.arrayBuffer());
    const params:PutObjectCommandInput = {
      Bucket,
      Key: file.name,
      Body: buffer,
    }
    const res = await s3.send(new PutObjectCommand(params));
    return NextResponse.json({...res, key: params.Key}, {status: 200});
  } 
  catch (e) {
    return NextResponse.json({ status: "fail", error: e }, {status: 500});
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const buffer = Buffer.from(await file.arrayBuffer());
    const params:PutObjectCommandInput = {
      Bucket,
      Key: file.name,
      Body: buffer,
    }
    const res = await s3.send(new PutObjectCommand(params));
    return NextResponse.json({...res, key: params.Key}, {status: 200});
  } 
  catch (e) {
    return NextResponse.json({ status: "fail", error: e }, {status: 500});
  }
}
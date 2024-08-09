import { DeleteObjectCommand, DeleteObjectCommandInput, GetObjectCommand, GetObjectCommandInput, HeadObjectCommand } from "@aws-sdk/client-s3";
import { Bucket, s3 } from "../vars";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  key: string;
};

export async function DELETE(request: Request, {params}:{params:Params}) {
  const Key = decodeURIComponent(params.key);
  const command:DeleteObjectCommandInput = {
    Bucket,
    Key
  };

  try {
    const res = await s3.send(new DeleteObjectCommand(command));
    return NextResponse.json(res, {status: 200});
  } 
  catch (err) {
    return NextResponse.json({ status: "fail", error: err }, {status: 500});
  }
};  

export async function HEAD(request: NextRequest, {params}:{params:Params}) {
    const Key = params.key;
    try{
        const res = await s3.send(new HeadObjectCommand({ Bucket, Key }));
        return NextResponse.json(res, {status: 200});
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
    }
}
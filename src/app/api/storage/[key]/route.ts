import { DeleteObjectCommand, DeleteObjectCommandInput, GetObjectCommand, GetObjectCommandInput, HeadObjectCommand } from "@aws-sdk/client-s3";
import { Bucket, s3 } from "../vars";
import { NextRequest, NextResponse } from "next/server";
import { deleteFile } from "../utils";

type Params = {
  key: string;
};

export async function DELETE(request: Request, {params}:{params:Params}) {
  return deleteFile(params.key);
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
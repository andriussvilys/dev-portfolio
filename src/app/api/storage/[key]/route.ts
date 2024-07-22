import { DeleteObjectCommand, DeleteObjectCommandInput } from "@aws-sdk/client-s3";
import { Bucket, s3 } from "../vars";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  key: string;
};

export async function DELETE(request: Request, {params}:{params:Params}) {
  const Key = params.key;
  const command:DeleteObjectCommandInput = {
    Bucket,
    Key
  };

  try {
    await s3.send(new DeleteObjectCommand(command));
    return NextResponse.json({ status: "success" }, {status: 200});
  } 
  catch (err) {
    return NextResponse.json({ status: "fail", error: err }, {status: 500});
  }
};  

export async function GET(request: NextRequest, {params}:{params:Params}) {
  return NextResponse.json({key: params.key}, {status: 200});
}
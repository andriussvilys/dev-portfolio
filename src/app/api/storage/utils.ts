import { createKey } from "@/src/lib/storage";
import { Bucket, s3 } from "./vars";
import { DeleteObjectCommand, DeleteObjectCommandInput, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { FileMetadata } from "@/src/lib/definitions/fileUpload";
import sharp from "sharp";

const getMetadata = async (file: File): Promise<FileMetadata> => {

  try{
    const buffer = Buffer.from(await file.arrayBuffer());
    const metadata = await sharp(buffer).metadata();
    if(!metadata || !metadata.width || !metadata.height){
      throw new Error("failed to get metadata")
    }
    return {
        width: metadata.width,
        height: metadata.height,
    };
  }
  catch(e){
    throw e
  }
};

const getURL = (key: string) => {
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/${key}`
}

type UploadFileSuccessResponse = NextResponse<{ key: string; metadata: FileMetadata, url:string }>;
type UploadFileErrorResponse = NextResponse<{ status: "fail"; error: string }>;

type UploadFileResponse = UploadFileSuccessResponse | UploadFileErrorResponse;

const uploadFile = async (file: File, collection: string):Promise<UploadFileResponse> => {
    try {
        const Body = Buffer.from(await file.arrayBuffer());
        const Key = createKey(file, collection);
        const params:PutObjectCommandInput = {
          Bucket,
          Key,
          Body,
          ContentType: file.type,
          ContentDisposition: "inline"
        }
        const res = await s3.send(new PutObjectCommand(params));
        if(res.$metadata.httpStatusCode === 200){
            const metadata = await getMetadata(file)
            const url = getURL(Key);
            return NextResponse.json({...res, key: Key, metadata, url, name:file.name}, {status: 200});
        }
        else{
          return NextResponse.json({ status: "fail", error: "failed to upload to storage" }, {status: 500}) as UploadFileErrorResponse;
        }
      } 
    catch (e) {
        return NextResponse.json({ status: "fail", error: (e as Error).message }, {status:500}) as UploadFileErrorResponse;
    }
}

const deleteFile = async (Key: string):Promise<NextResponse> => {
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
}

export { uploadFile, deleteFile, getURL };
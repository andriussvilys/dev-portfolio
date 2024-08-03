import { NextRequest, NextResponse } from "next/server";
import { MongoInstance } from "../connection";
import { collections, getCollection } from "../collections";
import { PostFormData, PostFormRequest } from "@/src/lib/definitions/posts";
import { FileData } from "@/src/lib/definitions/fileUpload";
import { upload } from "@/src/lib/storage";

const parsePostFormData = (formData: FormData): PostFormRequest => {
    const tags = formData.getAll("tags") ? formData.getAll("tags").map(entry => entry.toString()) : []
    const files = formData.getAll("files") ? formData.getAll("files").map((entry) => {
        const fileData = entry as unknown as FileData
        return fileData
    }) : []
    return {
        name: formData.get("name")?.toString() ?? "",
        description: formData.get("description")?.toString() ?? "",
        liveSite: formData.get("liveSite")?.toString() ?? "",
        github: formData.get("github")?.toString() ?? "",
        files,
        tags,
    }
}

export async function POST(request: Request) {
  try{
    const formData = await request.formData();
    const collection = await getCollection(collections.posts);
    const body = {
      name: formData.get("name")?.toString() ?? "",
      description: formData.get("description")?.toString() ?? "",
      liveSite: formData.get("liveSite")?.toString() ?? "",
      github: formData.get("github")?.toString() ?? "",
      files: formData.getAll("files") ? formData.getAll("files").map(entry => {
        const {key, metadata} = JSON.parse(entry as string)
        const parsedMetadata = JSON.parse(metadata)
        return {key, metadata: parsedMetadata}
      }) : [],
      tags: formData.get("tags") ? JSON.parse(formData.get("tags") as string) : []
    }
    const res = await collection.insertOne(body);
    return NextResponse.json(true, {status: 200});  
  }
  catch(e){
    return NextResponse.json({ status: "fail", error: e }, {status: 500});
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get("page")
  const limit = searchParams.get("limit")
  try{
        const query = {}
        const db = await MongoInstance.getDb();
        const collection = db.collection(collections.posts);
        const total = await collection.countDocuments()
        const cursor = collection.find(query)
        if(page && limit){
          const pageInt = parseInt(page)
          const limitInt = parseInt(limit)
          cursor.skip((pageInt-1) * limitInt).limit(limitInt)
        }
        const res = await cursor.toArray();
        const resWithTotal = {res, total}
        return NextResponse.json({posts:res, total}, {status: 200});
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
    }
}
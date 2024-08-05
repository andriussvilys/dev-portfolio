import { NextRequest, NextResponse } from "next/server";
import { MongoInstance } from "../connection";
import { TagFormData } from "@/src/lib/definitions/tags";
import { FileMetadata } from "@/src/lib/definitions/fileUpload";
import { getPaging } from "@/src/lib/data/commons/utils";
import { createItem, queryCollection } from "../commons";
import { collections } from "@/src/lib/data/commons/definitions";

const parseTagFormData = (formData: FormData): TagFormData => {
  const name = formData.get("name")?.toString() ?? "";
  const key = formData.get("key")?.toString() ?? "";
  const metadata:FileMetadata = formData.get("metadata") ? JSON.parse(formData.get("metadata") as string) : {width: 0, height: 0}
  const category = formData.get("category")?.toString() ?? "";
  const body:TagFormData = {name, key, metadata, category}
  return body
}

export async function POST(request: Request) {
  try{
    const formData = await request.formData();
    const body = parseTagFormData(formData)
    const res = await createItem({collection: collections.tags, body})
    return NextResponse.json(res, {status: 200});  
  }
  catch(e){
    return NextResponse.json({ status: "fail", error: e }, {status: 500});
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const paging = getPaging(searchParams)
  return queryCollection({collection: collections.tags, paging})
}
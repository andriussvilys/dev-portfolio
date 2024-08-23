import { NextRequest, NextResponse } from "next/server";
import { collections } from "@/src/lib/data/commons/definitions";
import { getPaging } from "@/src/lib/data/commons/utils";
import { createItem, queryCollection } from "../commons";
import { parsePostFormData } from "@/src/lib/posts";

export async function POST(request: Request) {
  try{
    const formData = await request.formData();
    const parsedFormData = parsePostFormData(formData)
    const res = await createItem({collection: collections.posts, body: parsedFormData})
    return NextResponse.json(res, {status: 200});  
  }
  catch(e){
    return NextResponse.json({ status: "fail", error: e }, {status: 500});
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const paging = getPaging(searchParams)
  return queryCollection({collection: collections.posts, paging})
}
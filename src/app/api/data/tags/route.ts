import { NextRequest, NextResponse } from "next/server";
import { TagInput } from "@/src/lib/definitions/tags";
import { getPaging } from "@/src/lib/data/commons/utils";
import { createItem, queryCollection } from "../commons";
import { collections } from "@/src/lib/data/commons/definitions";

const parseTagFormData = (formData: FormData): TagInput => {
  const name = formData.get("name")?.toString() ?? "";
  const category = formData.get("category")?.toString() ?? "";
  const file = JSON.parse(formData.get("file") as string)
  const categoryIndex = JSON.parse(formData.get("categoryIndex") as string)
  const body:TagInput = {name, category, file, categoryIndex}
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
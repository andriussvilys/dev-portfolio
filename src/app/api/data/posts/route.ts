import { NextRequest, NextResponse } from "next/server";
import { PostFormData } from "@/src/lib/definitions/posts";
import { collections } from "@/src/lib/data/commons/definitions";
import { getPaging } from "@/src/lib/data/commons/utils";
import { createItem, queryCollection } from "../commons";

const parsePostFormData = (formData: FormData): PostFormData => {
  const files = formData.getAll("files") ? formData.getAll("files").map(entry => {
    const {key, metadata} = JSON.parse(entry as string)
    const parsedMetadata = JSON.parse(metadata)
    return {key, metadata: parsedMetadata}
  }) : []
  const tags = formData.get("tags") ? JSON.parse(formData.get("tags") as string) : []
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
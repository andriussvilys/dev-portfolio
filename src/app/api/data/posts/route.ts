import { NextRequest, NextResponse } from "next/server";
import { collections } from "@/src/lib/data/commons/definitions";
import { getPaging } from "@/src/lib/data/commons/utils";
import { createItem, queryCollection } from "../commons";
import { PostInput } from "@/src/lib/definitions/posts";

const parsePostFormData = (formData: FormData): PostInput => {
  const files = formData.get("storageFile") ? formData.getAll("storageFile").map(entry => {
    const {key, metadata} = JSON.parse(entry as string)
    return {key, metadata, url:""}
  }) : []
  const tags = formData.get("tags") ? JSON.parse(formData.get("tags") as string) : []
  const order = formData.get("order") ? parseInt(formData.get("order") as string) : 0
    return {
        name: formData.get("name")?.toString() ?? "",
        description: formData.get("description")?.toString() ?? "",
        liveSite: formData.get("liveSite")?.toString() ?? "",
        github: formData.get("github")?.toString() ?? "",
        order,
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

export { parsePostFormData }
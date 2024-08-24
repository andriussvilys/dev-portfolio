import { NextRequest } from "next/server";
import { getPaging } from "@/src/lib/data/commons/utils";
import { createPost, listPosts } from "./utils";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    return createPost(formData)
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const paging = getPaging(searchParams)
  return listPosts({paging})
}
import { NextRequest } from "next/server";
import { getPaging } from "@/src/lib/data/commons/utils";
import { createTag, listTags } from "./utils";

export async function POST(request: Request) {
  const formData = await request.formData();
  return createTag(formData);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const paging = getPaging(searchParams)
  return listTags({paging})
}
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { deleteTag, findTag, updateTag } from "../utils";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}:{params:Params}):Promise<NextResponse> {
    const _id = params._id;
    return await findTag(_id);
}

export async function DELETE(request: Request, {params}:{params:Params}):Promise<NextResponse> {
    const _id = params._id;
    return await deleteTag(_id);
}

export async function PUT(request: Request, {params}:{params:Params}):Promise<NextResponse> {
    const _id = params._id;
    const formData = await request.formData();
    return await updateTag(formData, _id);
}
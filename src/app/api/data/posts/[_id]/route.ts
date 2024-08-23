import { collections, UpdateItemReq } from "@/src/lib/data/commons/definitions";
import { deleteItem, findItem, updateItem } from "../../commons";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import { PostInput } from "@/src/lib/definitions/posts";
import { parsePostFormData } from "@/src/lib/posts";

export async function GET(request: Request, {params}:{params:Params}) {
    const _id = params._id;
    return await findItem({collection: collections.posts, _id});
}

export async function DELETE(request: Request, {params}:{params:Params}) {
    const _id = params._id;
    return await deleteItem({collection: collections.posts, _id});
}

export async function PUT(request: Request, {params}:{params:Params}) {

    const _id = params._id;
    const formData = await request.formData();

    const body:UpdateItemReq<PostInput> = {
        collection: collections.posts,
        _id,
        body: parsePostFormData(formData)
    }
  
    try{
        const res = await updateItem(body);
        if(!res){
            return NextResponse.json({}, {status: 404});
        }
        return NextResponse.json(res, {status: 200});
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
    }
}

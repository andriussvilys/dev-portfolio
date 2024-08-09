import { collections, UpdateItemReq } from "@/src/lib/data/commons/definitions";
import { deleteItem, findItem, updateItem } from "../../commons";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import { PostInput } from "@/src/lib/definitions/posts";

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
    const parsedTags = formData.get("tags") ? JSON.parse(formData.get("tags") as string) : []

    const body:UpdateItemReq<PostInput> = {
        collection: collections.posts,
        _id,
        body: {
            name: formData.get("name")?.toString() ?? "",
            description: formData.get("description")?.toString() ?? "",
            liveSite: formData.get("liveSite")?.toString() ?? "",
            github: formData.get("github")?.toString() ?? "",
            files: formData.get("storageFile") ? formData.getAll("storageFile").map(entry => {
                const {key, metadata} = JSON.parse(entry as string)
                return {key, metadata, url:""}
              }) : [],
            tags: parsedTags
        }
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
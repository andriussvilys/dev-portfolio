import { NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { collections, UpdateItemReq } from "@/src/lib/data/commons/definitions";
import { deleteItem, findItem, updateItem } from "../../commons";
import { TagInput } from "@/src/lib/definitions/tags";

export async function GET(request: Request, {params}:{params:Params}) {
    const _id = params._id;
    return await findItem({collection: collections.tags, _id});
}

export async function DELETE(request: Request, {params}:{params:Params}) {
    const _id = params._id;
    return await deleteItem({collection: collections.tags, _id});
}

export async function PUT(request: Request, {params}:{params:Params}) {
    
    try{
        const _id = params._id;
        const formData = await request.formData();
    
        const name = formData.get("name") as string
        const category = formData.get("category") as string
        const file = JSON.parse(formData.get("file") as string)
        const categoryIndex = JSON.parse(formData.get("categoryIndex") as string)

        if(name && category && file){
            const body:UpdateItemReq<TagInput> = {
                collection: collections.tags,
                _id,
                body: {name, category, file, categoryIndex}
            }
            const res = await updateItem(body);
            if(!res){
                return NextResponse.json({}, {status: 404});
            }
            return NextResponse.json(res, {status: 200});
        }
        else{
            throw new Error ("Failed to upload tags: missing form data")
        }
    
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
    }
}
import { NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { collections } from "@/src/lib/data/commons/definitions";
import { deleteItem, findItem, updateItem } from "../../commons";

export async function GET(request: Request, {params}:{params:Params}) {
    const _id = params._id;
    return await findItem({collection: collections.tags, _id});
}

export async function DELETE(request: Request, {params}:{params:Params}) {
    const _id = params._id;
    return await deleteItem({collection: collections.tags, _id});
}

export async function PUT(request: Request, {params}:{params:Params}) {
    const _id = params._id;
    const formData = await request.formData();
    const body: { [key: string]: any } = {};

    formData.forEach((value, key) => {
      body[key] = value;
    });
  
    try{
        const res = await updateItem({collection: collections.tags, _id, body});
        if(!res){
            return NextResponse.json({}, {status: 404});
        }
        return NextResponse.json(res, {status: 200});
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
    }
}
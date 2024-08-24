import { collections } from "@/src/lib/data/commons/definitions";
import { findItem } from "../../commons";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { deletePost, updatePost } from "../utils";

export async function GET(request: Request, {params}:{params:Params}) {
    const _id = params._id;
    return await findItem({collection: collections.posts, _id});
}

export async function DELETE(request: Request, {params}:{params:Params}) {
    const _id = params._id;
    return await deletePost(_id);
}

export async function PUT(request: Request, {params}:{params:Params}) {
    const formData = await request.formData();
    const _id = params._id;
    return await updatePost(formData, _id);
}

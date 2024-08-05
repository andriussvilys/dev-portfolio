import { collections } from "@/src/lib/data/commons/definitions";
import { findById } from "../../commons";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(request: Request, {params}:{params:Params}) {
    const _id = params._id;
    console.log(`api/data/posts/${_id}`);
    return await findById({collection: collections.posts, _id});
}
import { NextResponse } from "next/server"
import { MongoInstance } from "./connection"
import { collections } from "@/src/lib/data/commons/definitions"

interface QueryCollectionReq{
    collection: collections,
    paging?: {page:number, limit:number}
    query?: any
}

const queryCollection = async (request: QueryCollectionReq):Promise<NextResponse> => {
    const {paging, query} = request
    try{
        const query = {}
        const db = await MongoInstance.getDb();
        const collection = db.collection(request.collection);
        const total = await collection.countDocuments()
        const cursor = collection.find(query)
        if(paging){
            const {page, limit} = paging
            cursor.skip((page-1) * limit).limit(limit)
        }
        const res = await cursor.toArray();
        return NextResponse.json({items:res, total}, {status: 200});
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
    }
}

export {queryCollection}
export type {QueryCollectionReq}
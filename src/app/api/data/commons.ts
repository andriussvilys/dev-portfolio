import { NextResponse } from "next/server"
import { MongoInstance } from "./connection"
import { collections, CreateItemReq, CreateItemType, ListCollectionReq } from "@/src/lib/data/commons/definitions"
import { ObjectId } from "mongodb"
import { getCollection } from "./collections"

const queryCollection = async (params: ListCollectionReq):Promise<NextResponse> => {
    const {paging} = params
    try{
        const query = {}
        const collection = await getCollection(params.collection);
        const total = await collection.countDocuments()
        const cursor = collection.find(query).sort({_id: -1})
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

async function createItem(params: CreateItemReq<CreateItemType>):Promise<NextResponse>{
    const {collection:collectionName, body} = params;
    try{
        const collection = await getCollection(collectionName);
        const res = await collection.insertOne(body);
        return NextResponse.json(res, {status: 200});  
      }
      catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
      }
}

const findById = async (params: {collection: collections, _id: string}):Promise<NextResponse> => {
    try{
        const db = await MongoInstance.getDb();
        const collection = db.collection(params.collection);
        const result = await collection.findOne({_id: new ObjectId(params._id)});
        if(!result){
            throw new Error("Not found")
        }
        return NextResponse.json(result, {status: 200});
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
    }
}

export {queryCollection, findById, createItem}
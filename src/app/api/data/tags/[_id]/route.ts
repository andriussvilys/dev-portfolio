import { NextResponse } from "next/server";
import { MongoInstance } from "../../connection";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { ObjectId } from "mongodb";

export async function GET(request: Request, {params}:{params:Params}) {
    const _id = params._id;
    try{
        const db = await MongoInstance.getDb();
        const collection = db.collection("tags");
        const result = await collection.findOne({_id: new ObjectId(_id)});
        if(!result){
            return NextResponse.json({}, {status: 404});
        }
        return NextResponse.json({result}, {status: 200});
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
    }
}

export async function DELETE(request: Request, {params}:{params:Params}) {
    const _id = params._id;
    try{
        const db = await MongoInstance.getDb();
        const collection = db.collection("tags");
        const result = await collection.deleteOne({_id: new ObjectId(_id)});
        if(!result){
            return NextResponse.json({}, {status: 404});
        }
        return NextResponse.json({...result}, {status: 200});
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
    }
}
import { NextResponse } from "next/server";
import { MongoInstance } from "../connection";
import { collections } from "../collections";

export async function POST(request: Request) {
  try{
    const formData = await request.formData();
    const db = await MongoInstance.getDb();
    const collection = db.collection(collections.tags);
    const body = {
      name: formData.get("name"),
      key: formData.get("key"),
      metadata: formData.get("metadata")
    }
    const res = await collection.insertOne(body);
    return NextResponse.json({status: "success", data: res}, {status: 200});  
  }
  catch(e){
    return NextResponse.json({ status: "fail", error: e }, {status: 500});
  }
}

export async function GET(request: Request) {
    try{
        const db = await MongoInstance.getDb();
        const collection = db.collection(collections.tags);
        const cursor = collection.find({});
        const results = await cursor.toArray();
        return NextResponse.json({results}, {status: 200});
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
    }
}
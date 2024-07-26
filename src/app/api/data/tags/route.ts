import { NextRequest, NextResponse } from "next/server";
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
    return NextResponse.json(res, {status: 200});  
  }
  catch(e){
    return NextResponse.json({ status: "fail", error: e }, {status: 500});
  }
}

export async function GET(request: NextRequest) {
  console.log(request.nextUrl.searchParams)
  try{
        const query = {}
        const db = await MongoInstance.getDb();
        const collection = db.collection(collections.tags);
        const cursor = collection.find(query);
        const res = await cursor.toArray();
        return NextResponse.json(res, {status: 200});
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
    }
}
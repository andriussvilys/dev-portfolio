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
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get("page")
  const limit = searchParams.get("limit")
  try{
        const query = {}
        const db = await MongoInstance.getDb();
        const collection = db.collection(collections.tags);
        const total = await collection.countDocuments()
        const cursor = collection.find(query)
        if(page && limit){
          const pageInt = parseInt(page)
          const limitInt = parseInt(limit)
          cursor.skip((pageInt-1) * limitInt).limit(limitInt)
        }
        const res = await cursor.toArray();
        const resWithTotal = {res, total}
        return NextResponse.json({tags:res, total}, {status: 200});
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
    }
}
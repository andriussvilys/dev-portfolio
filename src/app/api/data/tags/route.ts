import { NextResponse } from "next/server";
import { MongoInstance } from "../connection";
import { collections } from "../collections";
import { Filter } from "mongodb";
import queryString from "query-string";

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

export async function GET(request: Request, {searchParams}:{searchParams:any}) {
    try{
        // const url = new URL(request.url);
        // const searchParams = url.searchParams;

        // const query = queryString.parse(searchParams.toString());
        // console.log(`-----------query`, query)
        const query = {}
        const db = await MongoInstance.getDb();
        const collection = db.collection(collections.tags);
        const cursor = collection.find(query);
        const results = await cursor.toArray();
        return NextResponse.json({results}, {status: 200});
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
    }
}
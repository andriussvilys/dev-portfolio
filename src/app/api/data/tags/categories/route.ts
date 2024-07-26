import { NextRequest, NextResponse } from "next/server";
import { MongoInstance } from "../../connection";
import { collections } from "../../collections";

export async function GET(request: NextRequest) {
    try{
          const db = await MongoInstance.getDb();
          const collection = db.collection(collections.tags);
          const categories = await collection.distinct('category');
          console.log({categories})
          return NextResponse.json(categories, {status: 200});
      }
      catch(e){
          return NextResponse.json({ status: "fail", error: e }, {status: 500});
      }
  }
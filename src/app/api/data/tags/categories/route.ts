import { NextRequest, NextResponse } from "next/server";
import { collections } from "@/src/lib/data/commons/definitions";
import { getCollection } from "../../collections";

export async function GET(request: NextRequest) {
    try{
          const collection = await getCollection(collections.tags);
          const categories = await collection.distinct('category');
          return NextResponse.json(categories, {status: 200});
      }
      catch(e){
          return NextResponse.json({ status: "fail", error: e }, {status: 500});
      }
  }
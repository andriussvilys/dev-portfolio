import { collections } from "@/src/lib/data/commons/definitions";
import { MongoInstance } from "./connection";

const getCollection = async (collectionName: collections) => {
    const db = await MongoInstance.getDb();
    const collection = db.collection(collectionName);
    return collection
}

export { getCollection };
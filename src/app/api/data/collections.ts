import { MongoInstance } from "./connection";

enum collections {
    tags = "tags",
    posts = "posts",
}

const getCollection = async (collectionName: collections) => {
    const db = await MongoInstance.getDb();
    const collection = db.collection(collectionName);
    return collection
}

export { collections, getCollection };
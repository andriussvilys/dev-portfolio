import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);
const dbName = "Dashboard";

class MongoInstance {
    static db: Db | null = null;
    static async getDb(): Promise<Db> {
        if (this.db) {
            return this.db;
        }
        try {
            await client.connect();
            this.db = client.db(dbName);
            return this.db;
        } catch (e) {
            throw new Error("failed to connect to db: " + e);
        }
    }
}

export {MongoInstance}
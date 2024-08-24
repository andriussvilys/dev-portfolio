
import { uploadFile } from "./utils";

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const collection = formData.get("collection") as string;
    return uploadFile(file, collection);
}
import { StorageFile } from "./fileUpload"

interface PostRequest {
    name: string,
    description: string,
    liveSite?: string,
    github?: string,
    files: StorageFile[],
    tags: string[]
}

interface Post extends PostRequest {
    _id: string
}

interface PostFormInput extends Omit<PostRequest, "files"> {
    files: Blob[],
    storageFiles?: StorageFile[]
}

export type {Post, PostFormInput, PostRequest}
import { StorageFile } from "./fileUpload"

interface PostInput {
    name: string,
    description: string,
    liveSite?: string,
    github?: string,
    files: StorageFile[],
    tags: string[]
}

interface PostRecord extends PostInput {
    _id: string
}

interface PostFormInput extends Omit<PostInput, "files"> {
    files: Blob[],
    storageFiles?: StorageFile[]
}

export type {PostRecord as Post, PostFormInput, PostInput}
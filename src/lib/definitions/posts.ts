import { StorageFile } from "./fileUpload"
import { TagRecord } from "./tags"

interface PostInput {
    name: string,
    description: string,
    liveSite?: string,
    github?: string,
    files: StorageFile[],
    tags: string[],
    order: number,
}

interface PostRecord extends PostInput {
    _id: string
}

interface PostFormInput extends Omit<PostInput, "files"> {
    files: Blob[],
    storageFiles?: StorageFile[],
    fileOrder: {[key:string]:any}
}

interface PostWithTags extends Omit<PostRecord, "tags">{
    tags: TagRecord[]
}

export type {PostRecord, PostFormInput, PostInput, PostWithTags}
import { FileData, FileMetadata } from "./fileUpload"

interface Post extends PostFormData {
    _id: string
}

interface PostFormData {
    name: string,
    description: string,
    liveSite?: string,
    github?: string
    files: string[], //storage keys
    metadata: FileMetadata[],
    tags: string[], //db ids
}


interface PostFormInput {
    fileDataList: FileData[],
    name: string,
    description: string,
    liveSite?: string,
    github?: string,
    tags: string[]
}

export type {Post, PostFormData, PostFormInput}
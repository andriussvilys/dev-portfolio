import { FileMetadata, StorageFile } from "./fileUpload"

interface TagInput{
    file: StorageFile,
    name: string,
    category: string,
}

interface TagRecord extends TagInput{
    _id: string
}

interface TagFormInput{ 
    file: File,
    name: string,
    category: string
}

export type {TagRecord, TagInput, TagFormInput}
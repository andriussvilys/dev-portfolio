import { StorageFile } from "./fileUpload"

interface TagInput{
    file: StorageFile,
    name: string,
    category: string,
    categoryIndex: number
}

interface TagRecord extends TagInput{
    _id: string
}

interface TagFormInput{ 
    file: File | StorageFile,
    name: string,
    category: string,
    categoryIndex: number
}

export type {TagRecord, TagInput, TagFormInput}
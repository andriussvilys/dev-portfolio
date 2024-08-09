import { FileMetadata } from "./fileUpload"


interface TagFormInput{ 
    file: File,
    name: string,
    category: string
}

interface TagFormData{
    key: string,
    metadata: FileMetadata,
    name: string,
    category?: string,
    url?: string,
}

interface Tag extends TagFormData{
    _id: string
}

export type {Tag, TagFormData, TagFormInput}
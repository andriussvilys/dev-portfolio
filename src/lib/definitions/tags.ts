import { FileMetadata, FileUpload } from "./fileUpload"

interface TagFormData{
    metadata: FileMetadata,
    name: string,
    key: string,
    url?: string,
    category?: string
}

interface TagFormInput{ 
    metadata: FileMetadata,
    file: File[],
    name: string,
    category: string
}

interface Tag extends TagFormData{
    _id: string
}

export type {Tag, TagFormData, TagFormInput}
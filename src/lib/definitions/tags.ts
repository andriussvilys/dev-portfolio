import { FileData, FileMetadata, FileUpload } from "./fileUpload"


interface TagFormInput{ 
    fileData: FileData,
    name: string,
    category: string
}

interface TagFormData{
    metadata: FileMetadata,
    name: string,
    key: string,
    url?: string,
    category?: string
}

interface Tag extends TagFormData{
    _id: string
}

export type {Tag, TagFormData, TagFormInput}
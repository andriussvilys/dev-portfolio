import { FileData, FileMetadata, FileUpload } from "./fileUpload"


interface TagFormInput{ 
    fileData: FileData,
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
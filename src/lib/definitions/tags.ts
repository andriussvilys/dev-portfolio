interface TagMetadata{
    width: number,
    height: number
}

interface TagFormData {
    name: string,
    key: string,
    metadata: TagMetadata,
    url?: string,
    category?: string
}

interface Tag extends TagFormData{
    _id: string
}

export type {Tag, TagFormData, TagMetadata}
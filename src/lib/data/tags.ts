

interface Tag extends TagFormData{
    _id: string
}

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

const tagsPerPage = 3

export {tagsPerPage}
export type {Tag, TagFormData, TagMetadata}
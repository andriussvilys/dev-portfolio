interface Post extends PostFormData {
    _id: string
}

interface PostFormData {
    name: string,
    description: string,
    liveSite?: string,
    github: string
    media: string[],
    tags: string[], //_id
}

export type {Post, PostFormData}
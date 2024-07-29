import type { Tag } from "../data/tags"

interface Post extends PostFormData {
    _id: string
}

interface PostFormData {
    name: string,
    description: string,
    media: string[],
    tags: string[], //_id
    liveSite?: string,
    github: string
}

const postsPerPage = 3

export {postsPerPage}
export type {Post, PostFormData}
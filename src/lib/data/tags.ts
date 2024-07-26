interface Tag {
    name: string,
    key: string,
    _id: string,
    url?: string,
    metadata: {
        width: number,
        height: number
    }
}

const tagsPerPage = 3

export {tagsPerPage}
export type {Tag}
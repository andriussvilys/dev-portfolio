import { PagingParams } from "../../definitions/pages";

enum collections {
    tags = "tags",
    posts = "posts",
}

interface ListCollectionReq{
    collection:collections,
    paging?: PagingParams
}

interface ListCollectionRes<CollectionType>{
    items: CollectionType[],
    total: number
}

export {collections}

export type {ListCollectionReq, ListCollectionRes}
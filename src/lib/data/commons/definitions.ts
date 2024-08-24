import { PagingParams } from "../../definitions/pages";
import { PostInput } from "../../definitions/posts";
import { TagInput } from "../../definitions/tags";

enum collections {
    tags = "tags",
    posts = "posts",
}

interface ListCollectionReq{
    collection:collections,
    paging?: PagingParams,
    query?: {[key:string]: any}
}

interface ListCollectionRes<CollectionType>{
    items: CollectionType[],
    total: number
}

type CreateItemType = PostInput | TagInput

interface CreateItemReq<CreateItemType>{
    collection: collections,
    body: CreateItemType
}

interface UpdateItemReq<CreateItemType>{
    collection: collections,
    body: CreateItemType
    _id: string
}

export {collections}

export type {ListCollectionReq, ListCollectionRes, CreateItemReq, CreateItemType, UpdateItemReq}
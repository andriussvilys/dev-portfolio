import { PagingParams } from "../../definitions/pages";
import { PostRequest } from "../../definitions/posts";
import { TagFormData } from "../../definitions/tags";

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

type CreateItemType = PostRequest | TagFormData

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
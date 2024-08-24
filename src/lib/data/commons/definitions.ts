import { PagingParams } from "../../definitions/pages";
import { PostInput, PostRecord, PostWithTags } from "../../definitions/posts";
import { TagInput, TagRecord } from "../../definitions/tags";

enum collections {
    tags = "tags",
    posts = "posts",
}

interface ListCollectionReq{
    collection:collections,
    paging?: PagingParams,
    query?: {[key:string]: any}
}

type ListCollectionItemType = TagRecord | PostRecord | PostWithTags

interface ListCollectionRes<ListCollectionItemType>{
    items: ListCollectionItemType[],
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

export type {ListCollectionReq, ListCollectionRes,ListCollectionItemType, CreateItemReq, CreateItemType, UpdateItemReq}
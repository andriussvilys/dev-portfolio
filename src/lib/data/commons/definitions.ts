import { OptionalId } from "mongodb";
import { PagingParams } from "../../definitions/pages";
import TagForm from "@/src/components/tags/tagForm";
import { PostFormData } from "../../definitions/posts";
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

type CreateItemType = PostFormData | TagFormData

interface CreateItemReq<CreateItemType>{
    collection: collections,
    body: CreateItemType
}

export {collections}

export type {ListCollectionReq, ListCollectionRes, CreateItemReq, CreateItemType}
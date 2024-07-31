"use client"

import { upload } from "@/src/lib/posts"
import PostForm from "./postForm"
import { Tag } from "@/src/lib/definitions/tags"

export default function TagFormCreate({tags}:{tags:Tag[]}){
    return(
        <PostForm onSubmit={upload} tags={tags}/>
    )
}
"use client"

import PostForm from "./postForm"
import { Tag } from "@/src/lib/definitions/tags"
import { PostFormInput } from "@/src/lib/definitions/posts"

export default function TagFormCreate({tags}:{tags:Tag[]}){
        const handleSubmit = async (data: PostFormInput) => {
    }
    return(
        <PostForm onSubmit={handleSubmit} tags={tags}/>
    )
}
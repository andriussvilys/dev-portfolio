"use client"

import { upload } from "@/src/lib/posts"
import PostForm from "./postForm"
import { Tag } from "@/src/lib/definitions/tags"
import { PostFormInput } from "@/src/lib/definitions/posts"

export default function TagFormCreate({tags}:{tags:Tag[]}){
    const handleSubmit = async (data: PostFormInput) => {
        console.log(data)
    }
    return(
        <PostForm onSubmit={handleSubmit} tags={tags}/>
    )
}
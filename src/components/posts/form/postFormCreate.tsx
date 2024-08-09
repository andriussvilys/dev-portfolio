"use client"

import PostForm from "./postForm"
import { Tag } from "@/src/lib/definitions/tags"
import { PostFormInput } from "@/src/lib/definitions/posts"
import { createPost, processInput } from "@/src/lib/posts"

export default function PostFormCreate({tags}:{tags:Tag[]}){
    const handleSubmit = async (inputs: PostFormInput) => {
        const formData = processInput(inputs)
        await createPost(formData)
    }
    return(
        <PostForm onSubmit={handleSubmit} tags={tags}/>
    )
}
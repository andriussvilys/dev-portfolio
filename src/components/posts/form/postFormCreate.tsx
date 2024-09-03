"use client"

import PostForm from "./postForm"
import { TagRecord } from "@/src/lib/definitions/tags"
import { PostFormInput } from "@/src/lib/definitions/posts"
import { createPost, processInput } from "@/src/lib/posts"

export default function PostFormCreate({tags}:{tags:TagRecord[]}){
    const handleSubmit = async (inputs: PostFormInput) => {
        const formData = processInput(inputs)
        try{
            return await createPost(formData)
        }
        catch(e){
            throw e
        }
    }
    return(
        <PostForm onSubmit={handleSubmit} tags={tags} successMessage="Post created"/>
    )
}
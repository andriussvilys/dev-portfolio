"use client"

import PostForm, { PostFormProps } from "./postForm"
import { Tag } from "@/src/lib/definitions/tags"
import { Post, PostFormInput } from "@/src/lib/definitions/posts"

interface PostFormEditProps extends Omit<PostFormProps, "onSubmit">{
    initialData: Post
}

export default function PostFormEdit({tags, initialData}:PostFormEditProps){
        const handleSubmit = async (inputs: PostFormInput) => {
            throw new Error("Not implemented")
        }
    return(
        <PostForm onSubmit={handleSubmit} tags={tags}/>
    )
}
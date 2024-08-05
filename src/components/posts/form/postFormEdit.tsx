"use client"

import PostForm, { PostFormProps } from "./postForm"
import { Post, PostFormInput } from "@/src/lib/definitions/posts"

interface PostFormEditProps extends Omit<PostFormProps, "onSubmit">{
    initialData: Post
}

export default function PostFormEdit({tags, initialData}:PostFormEditProps){
    console.log("PostFormEdit",{initialData})
    const handleSubmit = async (inputs: PostFormInput) => {
        console.log(inputs)
        throw new Error("Not implemented")
    }
    return(
        <PostForm onSubmit={handleSubmit} tags={tags} initialData={initialData}/>
    )
}
"use client"

import { processInput, updatePost } from "@/src/lib/posts"
import PostForm, { PostFormProps } from "./postForm"
import { Post, PostFormInput } from "@/src/lib/definitions/posts"

interface PostFormEditProps extends Omit<PostFormProps, "onSubmit">{
    initialData: Post
}

export default function PostFormEdit({tags, initialData}:PostFormEditProps){
    console.log("PostFormEdit",{initialData})
    const handleSubmit = async (inputs: PostFormInput) => {
        console.log({inputs})
        try{
            const formData = processInput(inputs);
            await updatePost(formData, initialData._id);
        }
        catch(e){
            throw e
        }
    }
    return(
        <PostForm onSubmit={handleSubmit} tags={tags} initialData={initialData}/>
    )
}
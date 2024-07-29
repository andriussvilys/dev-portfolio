"use client"

import { upload } from "@/src/lib/posts"
import PostForm from "./postForm"

export default function TagFormCreate(){
    return(
        <PostForm onSubmit={upload}/>
    )
}
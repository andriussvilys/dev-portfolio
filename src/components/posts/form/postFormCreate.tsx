"use client"

import PostForm from "./postForm"
import { Tag } from "@/src/lib/definitions/tags"
import { PostFormInput } from "@/src/lib/definitions/posts"
import { createPost } from "@/src/lib/posts"

export default function PostFormCreate({tags}:{tags:Tag[]}){
        const handleSubmit = async (inputs: PostFormInput) => {
            inputs.fileDataList = inputs.fileDataList.filter(fileData => {
                return !!fileData.data
            })
            const tags = !!inputs.tags ? JSON.stringify(inputs.tags) : JSON.stringify([])
            const formData = new FormData()
            formData.append("name", inputs.name)
            formData.append("description", inputs.description)
            formData.append("liveSite", inputs?.liveSite ?? "")
            formData.append("github", inputs?.github ?? "")
            formData.append("tags", tags)
            inputs.fileDataList.forEach((fileData) => {
                formData.append("files", fileData.data)
            })
            inputs.fileDataList.forEach((fileData) => {
                formData.append("metadata", JSON.stringify(fileData.metadata))
            })
            await createPost(formData)
        }
    return(
        <PostForm onSubmit={handleSubmit} tags={tags}/>
    )
}
"use client"

import { patchById } from "@/src/lib/tags"
import TagForm from "./tagForm"
import type {TagFormProps} from "./tagForm"
import { Tag, TagFormInput } from "@/src/lib/definitions/tags"

interface TagFormEditProps extends Omit<TagFormProps, 'onSubmit'> {tagData: Tag}

export default function TagFormEdit ({tagData, categories}: TagFormEditProps){
    const handleSubmit = async (inputs: TagFormInput) => {
        try{
            const formData = new FormData()
            const name = inputs.name ?? tagData.name
            const category = inputs.category ?? tagData.category
            const metadata = inputs.fileData.metadata ?? tagData.metadata
            const file = inputs.fileData.data ?? null
            formData.append("name", name)
            formData.append("category", category)
            formData.append("metadata", JSON.stringify(metadata))
            if(file){
                formData.append("key", tagData.key) //add current key which will be used to delete the current image
                formData.append("file", file)
            }
            await patchById(formData, tagData._id)
        }
        catch(e){
            throw e
        }
    }
    return (
        <TagForm categories={categories} onSubmit={handleSubmit} tagData={tagData}/>
    )
}

export type {TagFormEditProps}
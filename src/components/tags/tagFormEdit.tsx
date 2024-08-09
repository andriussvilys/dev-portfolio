"use client"

import { updateTag } from "@/src/lib/tags"
import TagForm from "./tagForm"
import type {TagFormProps} from "./tagForm"
import { Tag, TagFormInput } from "@/src/lib/definitions/tags"
import { collections } from "@/src/lib/data/commons/definitions"

interface TagFormEditProps extends Omit<TagFormProps, 'onSubmit'> {tagData: Tag}

export default function TagFormEdit ({tagData, categories}: TagFormEditProps){
    const handleSubmit = async (inputs: TagFormInput) => {
        try{
            const formData = new FormData()
            const name = inputs.name ?? tagData.name
            const category = inputs.category ?? tagData.category
            const file = inputs.file ?? null
            formData.append("name", name)
            formData.append("category", category)
            if(file){
                formData.append("key", tagData.key) //add current key which will be used to delete the current image once it is replaced with new image
                formData.append("file", file)
                formData.append("collection", collections.tags)
            }
            await updateTag(formData, tagData._id)
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
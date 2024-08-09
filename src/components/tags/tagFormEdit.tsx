"use client"

import { updateTag } from "@/src/lib/tags"
import TagForm from "./tagForm"
import type {TagFormProps} from "./tagForm"
import { TagRecord, TagFormInput } from "@/src/lib/definitions/tags"
import { collections } from "@/src/lib/data/commons/definitions"

interface TagFormEditProps extends Omit<TagFormProps, 'onSubmit'> {
    tag: TagRecord
}

export default function TagFormEdit ({tag, categories}: TagFormEditProps){
    const handleSubmit = async (inputs: TagFormInput) => {
        try{
            const formData = new FormData()
            const name = inputs.name ?? tag.name
            const category = inputs.category ?? tag.category
            const file = inputs.file ?? null
            formData.append("name", name)
            formData.append("category", category)
            if(file instanceof File){
                formData.append("file", file)
            }
            else{
                formData.append("file", JSON.stringify(file))
            }
            console.log("tagFormEdit", {inputs, formData})
            await updateTag(formData, tag._id)
        }
        catch(e){
            throw e
        }
    }
    return (
        <TagForm categories={categories} onSubmit={handleSubmit} tag={tag}/>
    )
}

export type {TagFormEditProps}
"use client"

import { processInput, updateTag } from "@/src/lib/tags"
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
            const formData = processInput(inputs)
            console.log(formData)
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
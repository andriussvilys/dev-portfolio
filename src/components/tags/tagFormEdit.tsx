"use client"

import { processInput, updateTag } from "@/src/lib/tags"
import TagForm from "./tagForm"
import type {TagFormProps} from "./tagForm"
import { TagRecord, TagFormInput } from "@/src/lib/definitions/tags"

interface TagFormEditProps extends Omit<TagFormProps, 'onSubmit'> {
    tag: TagRecord
}

export default function TagFormEdit ({tag, categories}: TagFormEditProps){
    const handleSubmit = async (inputs: TagFormInput) => {
        try{
            const formData = processInput(inputs)
            await updateTag(formData, tag._id)
        }
        catch(e){
            throw e
        }
    }
    return (
        <TagForm categories={categories} onSubmit={handleSubmit} tag={tag} successMessage="Tag updated"/>
    )
}

export type {TagFormEditProps}
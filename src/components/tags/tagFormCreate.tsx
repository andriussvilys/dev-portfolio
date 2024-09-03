"use client"
import { createTag, processInput } from "@/src/lib/tags";
import TagForm from "./tagForm";
import { TagFormInput } from "@/src/lib/definitions/tags";

interface TagFormCreateProps{
    categories: string[]
}

export default function TagFormCreate({categories}:TagFormCreateProps){
    const handleSubmit = async (inputs: TagFormInput) => {
        try{
            const formData = processInput(inputs)
            await createTag(formData)
        }
        catch(e){
            throw e
        }
    }
    return(
        <TagForm categories={categories} onSubmit={handleSubmit} successMessage="Tag created"/>
    )
}
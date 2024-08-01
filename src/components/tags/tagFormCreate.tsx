"use client"
import { upload } from "@/src/lib/tags";
import TagForm from "./tagForm";
import { TagFormInput } from "@/src/lib/definitions/tags";

interface TagFormCreateProps{
    categories: string[]
}

export default function TagFormCreate({categories}:TagFormCreateProps){
    const handleSubmit = async (inputs: TagFormInput) => {
        try{
            const formData = new FormData()
            formData.append("name", inputs.name)
            formData.append("category", inputs.category)
            formData.append("metadata", JSON.stringify(inputs.metadata))
            formData.append("file", inputs.file[0])
            await upload(formData)
        }
        catch(e){
            throw e
        }
    }
    return(
        <TagForm categories={categories} onSubmit={handleSubmit}/>
    )
}
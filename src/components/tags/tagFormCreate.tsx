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
            // const formData = new FormData()
            // formData.append("name", inputs.name)
            // formData.append("category", inputs.category)
            // formData.append("file", inputs.file)
            const formData = processInput(inputs)
            console.log(formData)
            // await createTag(formData)
        }
        catch(e){
            throw e
        }
    }
    return(
        <TagForm categories={categories} onSubmit={handleSubmit}/>
    )
}
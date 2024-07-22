"use client"

import TagForm from "./tagForm"
import type {TagFormProps} from "./tagForm"

interface TagFormEditProps extends Omit<TagFormProps, 'onSubmit'> {}

export default function TagFormEdit ({tagData}: TagFormEditProps){
    const submitFunc = async (formData: FormData) => {return true}

    return (
        <TagForm onSubmit={submitFunc} tagData={tagData}/>
    )
}
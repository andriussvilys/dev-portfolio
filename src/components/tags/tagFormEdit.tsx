"use client"

import { patchById } from "@/src/lib/tags"
import TagForm from "./tagForm"
import type {TagFormProps} from "./tagForm"

interface TagFormEditProps extends Omit<TagFormProps, 'onSubmit'> {_id: string}

export default function TagFormEdit ({tagData, _id}: TagFormEditProps){
    return (
        <>
        <p>id: {_id}</p>
        <TagForm onSubmit={(formData) => {return patchById(formData, _id)}} tagData={tagData}/>
        </>
    )
}
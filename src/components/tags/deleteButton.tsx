"use client"

import { deleteById } from "@/src/lib/tags"

interface DeleteButtonProps {
    _id: string,
    disabled?: boolean
}

export default function DeleteButton({disabled, _id}: DeleteButtonProps) {
    const onDelete = async () => {
        try{
            const res = await deleteById(_id); 
            location.reload()
        }
        catch(err){
            throw err
        }
    }
    return(
        <button disabled={disabled} onClick={onDelete}>Delete</button>
    )
}

export type {DeleteButtonProps}

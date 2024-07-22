"use client"

import { deleteOne } from "@/src/lib/tags"

interface DeleteButtonProps {
    _id: string,
    disabled?: boolean
}

export default function DeleteButton({disabled, _id}: DeleteButtonProps) {
    const onDelete = async () => {await deleteOne(_id); location.reload()}
    return(
        <button disabled={disabled} onClick={onDelete}>Delete</button>
    )
}

export type {DeleteButtonProps}

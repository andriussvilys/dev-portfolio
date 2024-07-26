"use client"

import { deleteById } from "@/src/lib/tags"
import { Button } from "@mui/material";
import {Delete as DeleteIcon } from "@mui/icons-material"

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
        <Button color="error" startIcon={<DeleteIcon/>} variant="outlined" disabled={disabled} onClick={onDelete}>Delete</Button>
    )
}

export type {DeleteButtonProps}

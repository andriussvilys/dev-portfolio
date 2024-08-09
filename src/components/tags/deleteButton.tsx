"use client"

import { deleteTag } from "@/src/lib/tags"
import { Button } from "@mui/material";
import {Delete as DeleteIcon } from "@mui/icons-material"
import LoadingBackdrop from "../loading/backdrop/loadingBackdrop";
import useLoading from "../loading/backdrop/useLoading";
import { useState } from "react";
import { set } from "react-hook-form";

interface DeleteButtonProps {
    _id: string,
    disabled?: boolean
}

export default function DeleteButton({disabled, _id}: DeleteButtonProps) {
    const [loading, setLoading] = useState(false)
    const onDelete = async () => {
        try{
            setLoading(true)
            const res = await deleteTag(_id); 
            location.reload()
            setLoading(false)
        }
        catch(err){
            throw err
        }
    }
    return(
        <>
            <LoadingBackdrop open={loading}/>
            <Button color="error" startIcon={<DeleteIcon/>} variant="outlined" disabled={disabled} onClick={() => onDelete()}>Delete</Button>
        </>
    )
}

export type {DeleteButtonProps}

"use client"

import { deletePost } from "@/src/lib/posts";
import { Button } from "@mui/material";
import LoadingBackdrop from "../loading/backdrop/loadingBackdrop";
import { useState } from "react";

export default function DeletePostButton({_id}:{_id: string}){
    const [loading, setLoading] = useState(false)
    const onDelete = async () => {
        try{
            setLoading(true)
            await deletePost(_id); 
            location.reload()
            setLoading(false)
        }
        catch(err){
            throw err
        }
    }
    return (
        <>
            <LoadingBackdrop open={loading}/>
            <Button onClick={() => onDelete()} variant="outlined" color="error">Delete</Button>
        </>
    )
}
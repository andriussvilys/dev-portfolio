"use client"

import { deletePost } from "@/src/lib/posts";
import { Button } from "@mui/material";

export default function DeletePostButton({_id}:{_id: string}){
    const onDelete = async () => {
        try{
            await deletePost(_id); 
            location.reload()
        }
        catch(err){
            throw err
        }
    }
    return <Button onClick={() => onDelete()} variant="outlined" color="error">Delete</Button>
}
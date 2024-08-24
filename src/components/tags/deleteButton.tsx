"use client"

import { deleteTag } from "@/src/lib/tags"
import { Button } from "@mui/material";
import {Delete as DeleteIcon } from "@mui/icons-material"
import LoadingBackdrop from "../loading/backdrop/loadingBackdrop";
import useLoading from "../loading/backdrop/useLoading";

interface DeleteButtonProps {
    _id: string,
    disabled?: boolean
}

export default function DeleteButton({disabled, _id}: DeleteButtonProps) {
    const {backdrop, toast} = useLoading()
    const {loading, setLoading} = backdrop
    const {toastStatus, setToastStatus, closeToast} = toast
    const onDelete = async () => {
        try{
            setLoading(true)
            await deleteTag(_id); 
            setToastStatus({message: "Tag deleted.", open:true, severity:"success"})
            location.reload()
        }
        catch(e){
            setToastStatus({message: (e as Error).message, open:true, severity:"error"})
            throw e
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <>
            <LoadingBackdrop open={loading} toastStatus={toastStatus} closeToast={() => closeToast()}/>
            <Button color="error" startIcon={<DeleteIcon/>} variant="outlined" disabled={disabled} onClick={() => onDelete()}>Delete</Button>
        </>
    )
}

export type {DeleteButtonProps}

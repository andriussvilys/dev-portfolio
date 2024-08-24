"use client"

import { deletePost } from "@/src/lib/posts";
import { Button } from "@mui/material";
import LoadingBackdrop from "../loading/backdrop/loadingBackdrop";
import useLoading from "../loading/backdrop/useLoading";

export default function DeletePostButton({_id}:{_id: string}){
    const {backdrop, toast} = useLoading()
    const {loading, setLoading} = backdrop
    const {toastStatus, setToastStatus, closeToast} = toast
    const onDelete = async () => {
        setLoading(true)
        try{
            await deletePost(_id); 
            setToastStatus({message:"Post deleted", open:true, severity:"success"})
            location.reload()
        }
        catch(e){
            setToastStatus({message:(e as Error).message, open:true, severity:"error"})
            throw e
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <>
            <LoadingBackdrop open={loading} toastStatus={toastStatus} closeToast={closeToast}/>
            <Button onClick={() => onDelete()} variant="outlined" color="error">Delete</Button>
        </>
    )
}
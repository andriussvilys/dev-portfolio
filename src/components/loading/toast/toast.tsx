"use client"
import { Alert, Snackbar } from "@mui/material";

interface ToastData{
    message: string,
    open: boolean,
}
interface ToastProps extends ToastData{
    toggleOpen: (open:boolean) => void
}

export type {ToastData, ToastProps}

export default function Toast({message, open, toggleOpen}:ToastProps){
    return(
        <Snackbar open={open} autoHideDuration={5000} onClose={()=>toggleOpen(false)}>
            <Alert
                onClose={()=>toggleOpen(false)}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}
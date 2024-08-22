"use client"
import { Alert, AlertColor, Snackbar } from "@mui/material";

interface ToastData{
    message: string,
    open: boolean,
    severity: AlertColor
}
interface ToastProps extends ToastData{
    toggleOpen: (open:boolean) => void
}

export type {ToastData, ToastProps}

export default function Toast({message, open, toggleOpen, severity}:ToastProps){
    return(
        <Snackbar open={open} autoHideDuration={5000} onClose={()=>toggleOpen(false)}>
            <Alert
                onClose={()=>toggleOpen(false)}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}
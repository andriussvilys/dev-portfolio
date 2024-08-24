"use client"
import { Alert, AlertColor, Snackbar } from "@mui/material";

interface ToastData{
    message: string,
    open: boolean,
    severity: AlertColor
}
interface ToastProps{
    toastStatus: ToastData,
    closeToast: () => void
}

export type {ToastData, ToastProps}

export default function Toast({toastStatus, closeToast}:ToastProps){
    const {message, open, severity} = toastStatus
    return(
        <Snackbar open={open} autoHideDuration={5000} onClose={()=>closeToast()}>
            <Alert
                onClose={()=>closeToast()}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}
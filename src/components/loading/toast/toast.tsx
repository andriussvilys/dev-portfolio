"use client"
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

interface ToastProps {
    message: string,
    open: boolean
}

export type {ToastProps}

export default function Toast(props:ToastProps){
    const {message} = props
    const [open, setOpen] = useState(props.open);
    const handleClose = () => {
        setOpen(false)
    }
    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}
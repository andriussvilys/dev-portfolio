"use client"

import { Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";

interface SigninButtonProps{
    signedIn: boolean
}

export default function SigninButton({signedIn}:SigninButtonProps) {
    return (
        <Button variant="contained" disabled={signedIn} onClick={()=>signIn("google", {callbackUrl: "/dashboard"})}>
            <Typography>sign in</Typography>
        </Button>
    );
}
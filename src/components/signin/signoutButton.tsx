"use client"

import { Button, Typography } from "@mui/material";
import { signOut } from "next-auth/react";

interface SignoutButtonProps{
  signedIn: boolean
}

export default function SignoutButton({signedIn}: SignoutButtonProps) {
    return (
      <Button variant="contained" disabled={!signedIn} onClick={()=>signOut({callbackUrl: "/"})}><Typography>sign out</Typography></Button>
    );
}
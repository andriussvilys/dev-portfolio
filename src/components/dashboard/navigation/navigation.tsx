import {Box, Toolbar } from "@mui/material";
import { useState } from "react";
import Drawer from "./drawer";


interface NavigationProps {
    children: React.ReactNode
}

export default function Navigation({children}: NavigationProps) {
    return(
        <Box sx={{display:"flex", height: "100vh"}}>
            <Drawer/>
            <Box sx={{flex:1, overflow:"hidden"}}>
                {children}
            </Box>
        </Box>
    )
}
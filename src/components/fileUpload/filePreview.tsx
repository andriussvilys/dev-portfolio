"use client"

import { getFixedSize } from "@/src/lib/utils"
import { Box } from "@mui/material"
import { useState } from "react"

interface FilePreviewProps {
    src?: string
}

const defaultSize = {width: 100, height: 100}

export default function FilePreview({src}: FilePreviewProps){
    return(
        <Box sx={{height: defaultSize.height, width: defaultSize.width, padding: 1, border: "1px solid grey", borderRadius: 2}}>
            {!!src ? 
                <Box 
                    component="img" 
                    src={src} 
                    height="100%"
                    width="100%"
                    sx={{objectFit:"contain"}}
                    alt="file upload"
                />
                : null}
        </Box>
    )
}
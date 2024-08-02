"use client"

import { Box } from "@mui/material"

interface FilePreviewProps {
    src?: string
}

export default function FilePreview({src}: FilePreviewProps){

    return(
        <Box sx={{height: 100, width: 100, padding: 1, border: "1px solid grey", borderRadius: 2}}>
            {!!src ? 
                <Box 
                    component="img" 
                    src={src} 
                    height={100} width={100} alt="file upload"
                />
                : null}
        </Box>
    )
}
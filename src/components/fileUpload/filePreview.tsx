"use client"

import { TagMetadata } from "@/src/lib/definitions/tags"
import { Box } from "@mui/material"

interface FilePreviewProps {
    src?: string,
    setMetadata: (metadata: TagMetadata) => void
}

export default function FilePreview({src, setMetadata}: FilePreviewProps){

    const onImageLoad = (img:HTMLImageElement) => {
        setMetadata({width: img.naturalWidth, height: img.naturalHeight})
    }

    return(
        <Box sx={{height: 100, width: 100, padding: 1, border: "1px solid grey", borderRadius: 2}}>
            {!!src ? 
                <Box 
                    component="img" 
                    src={src} 
                    height={100} width={100} alt="file upload" 
                    onLoad={(e) => {
                        onImageLoad(e.target as HTMLImageElement)
                    }}
                />
                : null}
        </Box>
    )
}
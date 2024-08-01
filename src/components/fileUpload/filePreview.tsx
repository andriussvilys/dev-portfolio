"use client"

import { FileMetadata } from "@/src/lib/definitions/fileUpload"
import { Box } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { UseFormRegister, UseFormSetValue } from "react-hook-form"

interface FilePreviewProps {
    setValue: UseFormSetValue<any>,
    src?: string
}

export default function FilePreview({src, setValue}: FilePreviewProps){

    return(
        <Box sx={{height: 100, width: 100, padding: 1, border: "1px solid grey", borderRadius: 2}}>
            {!!src ? 
                <Box 
                    component="img" 
                    src={src} 
                    height={100} width={100} alt="file upload"
                    onLoad={(e) => {
                        const target = e.target as HTMLImageElement
                        setValue("metadata",{
                            width: target.naturalWidth,
                            height: target.naturalHeight
                        })
                    }}
                />
                : null}
        </Box>
    )
}
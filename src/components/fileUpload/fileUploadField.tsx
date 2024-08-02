"use client"

import { Stack, TextField } from "@mui/material"
import FilePreview from "./filePreview"
import { UseFormSetValue } from "react-hook-form"
import { useEffect, useState } from "react"
import useFileUpload from "./useFileUpload"

interface FileUploadProps{
    src?: string,
    fieldName: string,
    setValue: UseFormSetValue<any>,
}

export default function FileUploadField({setValue, fieldName, src,}: FileUploadProps){
    const [imageSrc, setImageSrc] = useState<string>("")
    const {fileData, setFile} = useFileUpload()

    useEffect(() => {
        if(src){
            setImageSrc(src)
        }
    }, [src])

    useEffect(() => {
        if(fileData){
            setValue(fieldName, fileData)
            const url = URL.createObjectURL(fileData.data)
            setImageSrc(url)
        }
    }, [fileData, setValue, fieldName])

    return(
        <Stack gap={2}>
            <FilePreview src={imageSrc}/>
            <TextField 
                size="small" 
                InputLabelProps={{shrink:true}} 
                label="select file" 
                type="file" 
                id="new-file"
                onChange={e => {
                    const file: File|undefined = (e.target as HTMLInputElement).files?.[0]
                    if(!!file){
                        setFile(file)
                    }
                }}
            />
        </Stack>
    )
}

export type {FileUploadProps}
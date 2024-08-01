"use client"

import { Stack, TextField } from "@mui/material"
import FilePreview from "./filePreview"
import { UseFormRegister, UseFormSetValue } from "react-hook-form"
import { useEffect, useState } from "react"

interface FileUploadProps{
    register: UseFormRegister<any>,
    setValue: UseFormSetValue<any>,
    watch: any,
    src?: string
}

export default function FileUploadField({register, watch, setValue, src}: FileUploadProps){
    const fileWatcher = watch("file")
    const [imageSrc, setImageSrc] = useState<string>("")

    useEffect(() => {
        if(src){
            setImageSrc(src)
        }
    }, [src])
    
    useEffect(() => {
        if(fileWatcher?.length > 0){
            setImageSrc(URL.createObjectURL(fileWatcher[0]))
        }
    }, [fileWatcher])

    return(
        <Stack gap={2}>
            <FilePreview src={imageSrc} setValue={setValue}/>
            <TextField 
                size="small" 
                InputLabelProps={{shrink:true}} 
                label="select file" 
                type="file" 
                id="new-file"
                {...register("file")}
            />
        </Stack>
    )
}
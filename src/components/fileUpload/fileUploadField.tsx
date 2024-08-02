"use client"

import { Stack, TextField } from "@mui/material"
import FilePreview from "./filePreview"
import { Control, Controller, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { useEffect, useState } from "react"

interface FileUploadProps{
    control?: Control<any>,
    register: UseFormRegister<any>,
    setValue: UseFormSetValue<any>,
    fieldName: string,
    watch: any,
    src?: string
}

export default function FileUploadField({register, watch, fieldName, setValue, src, control}: FileUploadProps){
    const fileWatcher = watch(fieldName)
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
                {...register(fieldName)}
            />
        </Stack>

        // <Stack gap={2}>
        //     <FilePreview src={imageSrc} setValue={setValue}/>

        //     <Controller
        //         control={control}
        //         name={fieldName}
        //         render={({
        //             field: { onChange, value, name },
        //             fieldState: { invalid, isTouched, isDirty, error },
        //             formState,
        //         }) => (
        //             <TextField 
        //                 size="small" 
        //                 InputLabelProps={{shrink:true}} 
        //                 label="select file" 
        //                 type="file" 
        //                 id="new-file"
        //                 onChange={onChange}
        //                 value={value}
        //             />
        //         )}
        //     />
        // </Stack>
    )
}

export type {FileUploadProps}
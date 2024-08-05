"use client"

import { Stack, TextField } from "@mui/material"
import FilePreview from "./filePreview"
import { UseFieldArrayAppend, UseFormSetValue } from "react-hook-form"
import { forwardRef, useEffect, useState } from "react"
import useFileUpload from "./useFileUpload"
import { FileData } from "@/src/lib/definitions/fileUpload"

interface FileUploadProps{
    src?: string,
    fieldName: string,
    setValue: UseFormSetValue<any>,
    initialData?: FileData,
    append?: UseFieldArrayAppend<any>
}
const FileUploadField = forwardRef<HTMLDivElement, FileUploadProps>((props, ref) => {
        const {setValue, fieldName, src, initialData, append} = props
        const [imageSrc, setImageSrc] = useState<string>("")
        const {fileData, setFile} = useFileUpload({fieldName, setValue, append, dirty: !!src})
    
        useEffect(() => {
            if(src){
                setImageSrc(src)
            }
        }, [src])
    
        useEffect(() => {
            if(initialData){
                setFile(initialData.data)
            }
        }, [initialData, setFile])
    
        useEffect(() => {
            if(fileData){
                setValue(fieldName, fileData)
                const url = URL.createObjectURL(fileData.data)
                setImageSrc(url)
            }
        }, [fileData, setValue, fieldName])
    
        return(
            <Stack component="div" gap={2}>
                <FilePreview src={imageSrc}/>
                <TextField 
                    size="small" 
                    InputLabelProps={{shrink:true}} 
                    label="select file" 
                    type="file"
                    onChange={e => {
                        const file: File|undefined = (e.target as HTMLInputElement).files?.[0]
                        if(!!file){
                            setFile(file)
                        }
                    }}
                    // ref={ref}
                />
            </Stack>
        )
    }
)

FileUploadField.displayName = "FileUploadField"

export default FileUploadField
export type {FileUploadProps}
"use client"

import { Stack, TextField } from "@mui/material"
import FilePreview from "./filePreview"
import { UseFieldArrayAppend, UseFormSetValue } from "react-hook-form"
import { forwardRef, useEffect, useState } from "react"
import useFileUpload from "./useFileUpload"
import { FileData, StorageFile } from "@/src/lib/definitions/fileUpload"

interface FileUploadProps{
    fieldName: string,
    setValue: UseFormSetValue<any>,
    initialData?: StorageFile,
    append?: UseFieldArrayAppend<any>,
}
const FileUploadField = forwardRef<HTMLDivElement, FileUploadProps>((props, ref) => {
        const {setValue, fieldName, initialData, append} = props
        const [imageSrc, setImageSrc] = useState<string>("")
        const {fileData, setData} = useFileUpload({fieldName, setValue, append, dirty: !!initialData})
    
        useEffect(() => {
            console.log("FileUploadField",{initialData})
            if(initialData){
                setData(initialData)
            }
        }, [initialData, setData])
    
        useEffect(() => {
            if(fileData){
                setValue(fieldName, fileData)
                if(fileData instanceof Blob){
                    const url = URL.createObjectURL(fileData)
                    setImageSrc(url)
                }
                else{
                    setImageSrc(fileData.url as string)
                }
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
                            setData(file)
                        }
                    }}
                />
            </Stack>
        )
    }
)

FileUploadField.displayName = "FileUploadField"

export default FileUploadField
export type {FileUploadProps}
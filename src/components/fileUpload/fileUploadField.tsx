"use client"

import { Button, FormControl, InputAdornment, InputBase, InputLabel, OutlinedInput, Stack, TextField } from "@mui/material"
import FilePreview from "./filePreview"
import { UseFieldArrayAppend, UseFormSetValue } from "react-hook-form"
import { forwardRef, useEffect, useRef, useState } from "react"
import { StorageFile } from "@/src/lib/definitions/fileUpload"

interface FileUploadProps{
    fieldName: string,
    setValue: UseFormSetValue<any>,
    initialData?: StorageFile,
    append?: UseFieldArrayAppend<any>,
}
const FileUploadField = forwardRef<HTMLDivElement, FileUploadProps>((props, ref) => {
        const {setValue, fieldName, initialData, append} = props
        const [imageSrc, setImageSrc] = useState<string>("")
        const [file, setFile] = useState<StorageFile | File | undefined>(initialData)

        const isFileValid = (file: StorageFile | File | undefined):boolean => {
            const valid =  file instanceof File || !!file?.url 
            return valid
        }
        const dirty = useRef(isFileValid(initialData))

        const changeSrc = (file: StorageFile | File | undefined) => {
            if(isFileValid(file) && !!file){
                if(file instanceof File){
                    const url = URL.createObjectURL(file)
                    setImageSrc(url)
                }
                else{
                    setImageSrc(file.url as string)
                }
            }
        }

        useEffect(() => {
            if(isFileValid(file)){
                setValue(fieldName, file)
                changeSrc(file)
                if(!dirty.current && !!append){
                    append({})
                    dirty.current = true
                }
            }
        }, [file])

        return(
            <Stack component="div" gap={2} ref={ref}>
                <FilePreview src={imageSrc}/>
                <TextField 
                    size="small" 
                    InputLabelProps={{shrink:true}} 
                    label="select file" 
                    type="file"
                    onChange={e => {
                        const file: File | StorageFile | undefined = (e.target as HTMLInputElement).files?.[0]
                        if(!!file){
                            setFile(file)
                        }
                    }}
                    sx={{maxWidth:"30ch"}}
                />
            </Stack>
        )
    }
)

FileUploadField.displayName = "FileUploadField"

export default FileUploadField
export type {FileUploadProps}
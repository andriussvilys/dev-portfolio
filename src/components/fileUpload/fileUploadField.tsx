"use client"

import {Stack, TextField } from "@mui/material"
import FilePreview from "./filePreview"
import { FieldValues, UseFieldArrayAppend, useFormContext } from "react-hook-form"
import { forwardRef, useEffect, useRef, useState } from "react"
import { StorageFile } from "@/src/lib/definitions/fileUpload"

interface FileUploadProps{
    rootFieldName: string,
    fieldIndex?: number,
    initialData?: StorageFile,
    append?: UseFieldArrayAppend<FieldValues, string>,
    disabled?:boolean
}
const FileUploadField = forwardRef<HTMLDivElement, FileUploadProps>((props, ref) => {

        const {rootFieldName, fieldIndex, initialData, append, disabled=false} = props
        const fieldName = fieldIndex !== undefined ? `${rootFieldName}.${fieldIndex}` : rootFieldName
        const {setValue, watch, register} = useFormContext()

        const [imageSrc, setImageSrc] = useState<string>(initialData?.url || "")

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

        const fieldValue = watch(fieldName)

        useEffect(() => {
            if(isFileValid(fieldValue)){
                changeSrc(fieldValue)
                if(!dirty.current && !!append){
                    append({})
                    dirty.current = true
                }
            }
        }, [fieldValue])


        return(
            <Stack component="div" gap={2} ref={ref}>
                <FilePreview src={imageSrc}/>
                <TextField 
                    size="small" 
                    InputLabelProps={{shrink:true}} 
                    label="select file" 
                    type="file"
                    {...register}
                    onChange={e => {
                        const file: File | StorageFile | undefined = (e.target as HTMLInputElement).files?.[0]
                        if(!!file){
                            setValue(fieldName, file)
                        }
                    }}
                    sx={{maxWidth:"30ch"}}
                    disabled={disabled}
                />
            </Stack>
        )
    }
)

FileUploadField.displayName = "FileUploadField"

export default FileUploadField
export type {FileUploadProps}
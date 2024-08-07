import { FileData, FileMetadata, StorageFile } from "@/src/lib/definitions/fileUpload";
import { useEffect, useRef, useState } from "react";
import { UseFieldArrayAppend, UseFormSetValue } from "react-hook-form";

interface UseFileUploadProps{
    fieldName: string,
    setValue: UseFormSetValue<any>,
    append?: UseFieldArrayAppend<any>,
    dirty?: boolean
}

export default function useFileUpload(props: UseFileUploadProps){
    const {fieldName, setValue, append} = props
    const [fileData, setFileData] = useState<StorageFile | Blob | null>(null)
    
    const dirty = useRef(!!props.dirty)
    useEffect(() => {
        if(!dirty.current && fileData && append){
            append({})
            dirty.current = true
        }
    }, [fileData, append])

    const setData = async (data: StorageFile | Blob) => {
        setValue(fieldName, data)
        setFileData(data)
    }
    return {fileData, setData}
}
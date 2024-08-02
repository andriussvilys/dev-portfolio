import { Controller, UseFormSetValue } from "react-hook-form";
import FileUploadField from "./fileUploadField";
import type { FileUploadProps } from "./fileUploadField";
import useMultiFileUpload from "./useMultiFileUpload";
import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { metadata } from "@/src/app/layout";

interface MultiFileUploadProps extends FileUploadProps{
    initialSrcs?: string[]
    setValue: UseFormSetValue<any>,
    fields: any, 
    append: any, 
    remove: any,
    control: any
}

export default function MultiFileUpload({setValue, fieldName, initialSrcs, fields, append, remove, control}: MultiFileUploadProps){
    const {fileDataList, setFile, removeFile} = useMultiFileUpload()
    const [srcs, setSrcs] = useState<string[]>(initialSrcs ?? [])
    const mappableList = fileDataList ? [...fileDataList, null] : [null] 
    return (
        <Stack gap={2} sx={{width:1, height:1, overflow:"hidden"}}>
            <Box sx={{overflow:"auto", height:1, width:1}}>
                <Stack sx={{
                        flexDirection:"column-reverse", 
                        alignItems:"center",
                        justifyContent:"start", 
                        padding: 2, gap:2
                    }}>
                    {
                        fields.map((field: any, index: number) => {
                            return(
                                <Stack key={index} gap={2}>
                                    <Typography>index: {index}</Typography>
                                    <FileUploadField 
                                        setValue={setValue} 
                                        fieldName={`${fieldName}.${index}`}
                                        setFile={setFile}
                                    />
                                    <Button 
                                        variant="contained"
                                        color="error"
                                        onClick={()=>remove(index)}
                                    >
                                        Remove
                                    </Button>
                                </Stack>
                            )
                        })
                    }
                </Stack>
            </Box>
        </Stack>
    )
}
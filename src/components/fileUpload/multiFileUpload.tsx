import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, Stack, Typography } from "@mui/material";
import { StorageFile } from "@/src/lib/definitions/fileUpload";
import MultiFielUploadField from "./multiFielUploadField";

export default function MultiFileUpload(){
    const {control, watch} = useFormContext()
    const { fields:newFiles, remove:removeNewFile, append } = useFieldArray({
        control,
        name: "files"
    });
    const { fields:storageFiles, remove:removeStorageFile } = useFieldArray({
        control,
        name: "storageFiles"
    });
    const watchedNewFiles = watch("files")
    const lastNewFilesIndex = newFiles.length-1
    const lastNewFilesField = newFiles[lastNewFilesIndex]
    return (
        <Stack gap={2}>
            <Box>
                <Stack sx={{
                        justifyContent:"start",
                        padding: 2, gap:2
                    }}>
                    <Typography>New Files</Typography>
                    <Box sx={{
                        display:"flex", 
                        justifyContent:"start",
                        overflow:"hidden", 
                        }}
                        gap={2}
                    >
                        <Box sx={{border:"2px solid black", borderRadius:2, p:2, flex:0}}>
                            <MultiFielUploadField 
                                key={lastNewFilesField.id} 
                                initialData={watchedNewFiles[lastNewFilesIndex]} 
                                rootFieldName={"files"} 
                                fieldIndex={lastNewFilesIndex}
                                append={append}
                            />
                        </Box>
                        <Box sx={{
                            display:"flex",
                            overflow:"auto",
                            }} gap={2}>
                            {
                                newFiles.slice(0,-1).map((field: any, index: number) => {
                                    return(
                                        <MultiFielUploadField 
                                            key={field.id} 
                                            initialData={watchedNewFiles[index]} 
                                            rootFieldName={"files"} 
                                            fieldIndex={index}
                                            append={append}
                                            remove={removeNewFile}
                                        />
                                    )
                                })
                            }
                        </Box>
                    </Box>
                </Stack>
                <Box sx={{
                        alignItems:"center",
                        justifyContent:"start",
                        border: "1px solid",
                        padding: 2, gap:2
                    }}>
                    <Typography>Storage Files</Typography>
                    <Box sx={{
                            display:"flex",
                            overflow:"auto",
                        }} 
                        gap={2}
                    >
                        {
                            storageFiles.map((field: any, index: number) => {
                                const initialData = field as StorageFile
                                return(
                                    <MultiFielUploadField 
                                        key={field.id} 
                                        initialData={initialData} 
                                        rootFieldName={"storageFiles"} 
                                        fieldIndex={index}
                                        append={append}
                                        remove={removeStorageFile}
                                        disabled={true}
                                    />
                                )
                            })
                        }
                    </Box>
                </Box>
            </Box>
        </Stack>
    )
}
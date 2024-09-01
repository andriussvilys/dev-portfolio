import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, Divider, Stack, Typography } from "@mui/material";
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
        <Box gap={2} sx={{display:"flex", height:1}}>
            <Stack>
                    <Typography variant="overline">Add new file</Typography>
                    <Divider/>
                    <MultiFielUploadField 
                        key={lastNewFilesField.id} 
                        initialData={watchedNewFiles[lastNewFilesIndex]} 
                        rootFieldName={"files"} 
                        fieldIndex={lastNewFilesIndex}
                        append={append}
                    />
            </Stack>
            <Divider orientation="vertical"/>
            <Stack gap={2} sx={{overflow:"auto"}}>
                <Stack gap={2}>
                    <Stack>
                        <Typography variant="overline">New Files</Typography>
                        <Divider/>
                    </Stack>
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
                </Stack>
                <Stack gap={2}>
                    <Stack>
                        <Typography variant="overline">Storage Files</Typography>
                        <Divider/>
                    </Stack>
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
                </Stack>
            </Stack>
        </Box>
    )
}
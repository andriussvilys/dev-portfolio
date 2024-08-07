import { UseFieldArrayRemove } from "react-hook-form";
import FileUploadField from "./fileUploadField";
import type { FileUploadProps } from "./fileUploadField";
import { Box, Button, Stack, Typography } from "@mui/material";
import { StorageFile } from "@/src/lib/definitions/fileUpload";

interface MultiFileUploadProps extends FileUploadProps{
    fields: any, 
    append: any, 
    remove: UseFieldArrayRemove,
    storageFiles:any,
    removeStorageFile:any
}

export default function MultiFileUpload({setValue, fieldName, fields, append, remove, initialData, storageFiles, removeStorageFile}: MultiFileUploadProps){
    console.log("MultiFileUpload", initialData)
    console.log("MultiFileUpload", fields)
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
                                <Stack key={field.id} gap={2}>
                                    <Typography>index: {index}</Typography>                                 
                                    <FileUploadField
                                        setValue={setValue} 
                                        // fieldName={`${fieldName}.${index}`}
                                        fieldName={`files.${index}`}
                                        append={append}
                                    />
                                    <Button 
                                        disabled={fields.length-1 === index}
                                        variant="contained"
                                        color="error"
                                        onClick={() => remove(index)}
                                    >
                                        Remove
                                    </Button>
                                </Stack>
                            )
                        })
                    }
                </Stack>
                <Stack sx={{
                        flexDirection:"column-reverse", 
                        alignItems:"center",
                        justifyContent:"start",
                        border: "1px solid",
                        padding: 2, gap:2
                    }}>
                    <Typography>Storage Files</Typography>
                    {
                        storageFiles.map((field: any, index: number) => {
                            const initialData = field as StorageFile
                            return(
                                <Stack key={field.id} gap={2}>
                                    <Typography>index: {index}</Typography>                                 
                                    <FileUploadField
                                        initialData={initialData}
                                        setValue={setValue} 
                                        // fieldName={`${fieldName}.${index}`}
                                        fieldName={`storageFiles.${index}`}
                                        append={append}
                                    />
                                    <Button 
                                        variant="contained"
                                        color="error"
                                        onClick={() => removeStorageFile(index)}
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
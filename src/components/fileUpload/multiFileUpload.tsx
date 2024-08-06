import { UseFieldArrayRemove, UseFormSetValue } from "react-hook-form";
import FileUploadField from "./fileUploadField";
import type { FileUploadProps } from "./fileUploadField";
import { Box, Button, Stack, Typography } from "@mui/material";

interface MultiFileUploadProps extends FileUploadProps{
    initialSrcs?: string[]
    setValue: UseFormSetValue<any>,
    fields: any, 
    append: any, 
    remove: UseFieldArrayRemove,
}

export default function MultiFileUpload({setValue, fieldName, initialSrcs, fields, append, remove}: MultiFileUploadProps){
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
                                        src={field.url}
                                        setValue={setValue} 
                                        fieldName={`${fieldName}.${index}`}
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
            </Box>
        </Stack>
    )
}
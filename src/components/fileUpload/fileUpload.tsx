import { Box, Stack, TextField } from "@mui/material"
import { useEffect } from "react"
import { TagMetadata } from "../../lib/definitions/tags"
import FilePreview from "./filePreview"

interface FileUploadProps{
    setFile: (file: File) => void,
    setMetadata: (metadata: TagMetadata) => void,
    file?: File,
    src?: string
}

export default function FileUpload({setFile, setMetadata, file, src}: FileUploadProps){

    const onFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const inputFile = event.target.files && event.target.files[0]

        if(inputFile){
            setFile(inputFile)
        }
    }

    return(
        <Stack gap={2}>
            <FilePreview src={src} setMetadata={setMetadata}/>
            <TextField size="small" InputLabelProps={{shrink:true}} label="select file" type="file" id="new-file" variant="outlined" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFileChange(e)}/>
        </Stack>
    )
}
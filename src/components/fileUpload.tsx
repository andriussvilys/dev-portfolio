import { Box, Stack, TextField } from "@mui/material"
import { useState } from "react"
import Image from "next/image"
import { TagMetadata } from "../lib/definitions/tags"

interface FileUploadProps{
    setFile: (file: File) => void,
    setMetadata: (metadata: TagMetadata) => void
}

export default function FileUpload({setFile, setMetadata}: FileUploadProps){
    const [imageSrc, setImageSrc] = useState<string>("")

    const onFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const inputFile = event.target.files && event.target.files[0]

        if(inputFile){
            setFile(inputFile)
            setImageSrc(URL.createObjectURL(inputFile))
        }
    }

    const onImageLoad = (img:HTMLImageElement) => {
        setMetadata({width: img.naturalWidth, height: img.naturalHeight})
    }

    return(
        <Stack>
            <Box sx={{height: 100, width: 100, padding: 1, border: "1px solid grey", borderRadius: 2}}>
                {!!imageSrc ? <Image src={imageSrc} height={100} width={100} alt="file upload" onLoad={(e) => {onImageLoad(e.target as HTMLImageElement)}}/> : null}
            </Box>
            <TextField size="small" InputLabelProps={{shrink:true}} label="select file" type="file" id="new-file" variant="outlined" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFileChange(e)}/>
        </Stack>

    )
}
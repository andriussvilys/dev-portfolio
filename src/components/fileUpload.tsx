import { Box, Stack, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import Image from "next/image"
import { TagMetadata } from "../lib/definitions/tags"

interface FileUploadProps{
    setFile: (file: File) => void,
    setMetadata: (metadata: TagMetadata) => void,
    fileSrc?: string
}

export default function FileUpload({setFile, setMetadata, fileSrc:src}: FileUploadProps){
    const [fileSrc, setFileSrc] = useState<string>("")

    useEffect(() => {
        if(src) setFileSrc(src)
    }, [src])

    const onFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const inputFile = event.target.files && event.target.files[0]

        if(inputFile){
            setFile(inputFile)
            setFileSrc(URL.createObjectURL(inputFile))
        }
    }

    const onImageLoad = (img:HTMLImageElement) => {
        setMetadata({width: img.naturalWidth, height: img.naturalHeight})
    }

    return(
        <Stack gap={2}>
            <Box sx={{height: 100, width: 100, padding: 1, border: "1px solid grey", borderRadius: 2}}>
                {!!fileSrc ? <Image src={fileSrc} height={100} width={100} alt="file upload" onLoad={(e) => {onImageLoad(e.target as HTMLImageElement)}}/> : null}
            </Box>
            <TextField size="small" InputLabelProps={{shrink:true}} label="select file" type="file" id="new-file" variant="outlined" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFileChange(e)}/>
        </Stack>

    )
}
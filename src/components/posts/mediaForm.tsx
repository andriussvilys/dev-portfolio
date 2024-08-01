import { UseFormRegister } from "react-hook-form";
import FileUploadField from "../fileUpload/fileUploadField";
import { TagMetadata } from "@/src/lib/definitions/tags";
import { PostFormData } from "@/src/lib/definitions/posts";
import { Box } from "@mui/material";

interface MediaFormProps {
    setFile: (file:File) => void,
    setMetadata: (metadata: TagMetadata) => void,
    files?: File[],
    register?: UseFormRegister<PostFormData>
}

export default function MediaForm({setFile, files, setMetadata, register}: MediaFormProps){
    return (
        <Box sx={{display:"flex", alignItems:"center"}}>
            {
                files?.map((file, index) => {
                    return(
                        <FileUploadField 
                            key={crypto.randomUUID()} 
                            setFile={setFile} 
                            file={file}
                            setMetadata={setMetadata}
                        />
                    ) 
                })
            }
            <FileUploadField setFile={setFile} setMetadata={setMetadata}/>
            
        </Box>
    )
}
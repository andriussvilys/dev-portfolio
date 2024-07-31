import { UseFormRegister } from "react-hook-form";
import FileUpload from "../fileUpload/fileUpload";
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
        <Box>
            {
                files?.map((file, index) => {
                    return(
                        <FileUpload 
                            key={crypto.randomUUID()} 
                            setFile={setFile} 
                            file={file}
                            setMetadata={setMetadata}
                        />
                    ) 
                })
            }
            <FileUpload setFile={setFile} setMetadata={setMetadata}/>
            
        </Box>
    )
}
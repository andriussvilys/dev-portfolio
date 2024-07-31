import FileUpload from "../fileUpload/fileUpload";
import { TagMetadata } from "@/src/lib/definitions/tags";

interface MediaFormProps {
    setFile: (file:File) => void,
    setMetadata: (metadata: TagMetadata) => void,
    files?: File[]
}

export default function MediaForm({setFile, files, setMetadata}: MediaFormProps){
    return (
        <>
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
        </>
    )
}
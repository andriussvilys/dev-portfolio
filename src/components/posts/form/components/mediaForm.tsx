import { RegisterOptions, UseFormRegister, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import FileUploadField, { FileUploadProps } from "../../../fileUpload/fileUploadField";
import { Box } from "@mui/material";

interface MediaFormProps extends FileUploadProps{
    files?: FileList
}

export default function MediaForm({files, register, setValue, watch, fieldName}: MediaFormProps){
    return (
        <Box sx={{display:"flex", alignItems:"center"}}>
            {
                files && Array.from(files).map((file, index) => {
                    return(
                        <FileUploadField 
                            key={index} 
                            register={register} 
                            setValue={setValue} 
                            watch={watch}
                            fieldName={`${fieldName}.${index}`}
                        />
                    )
                })
            }
            <FileUploadField register={register} setValue={setValue} watch={watch} fieldName={`${fieldName}.${files?.length ?? 0}`} />
            
        </Box>
    )
}
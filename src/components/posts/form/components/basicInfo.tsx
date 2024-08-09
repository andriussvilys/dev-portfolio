import { PostFormInput } from "@/src/lib/definitions/posts";
import { Stack, TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

interface BasicInfoProps {
    register: UseFormRegister<PostFormInput>
}

export default function BasicInfo({register}: BasicInfoProps) {
    return(
        <Stack gap={2} sx={{justifyContent:"center", flexWrap:"wrap"}}>
            <TextField 
                size="small" 
                label="name" 
                variant="outlined"
                InputLabelProps={{shrink:true}} 
                {...register("name", {value: "name"})}
            />
            <TextField 
                size="small" 
                label="description" 
                variant="outlined" 
                InputLabelProps={{shrink:true}} 
                sx={{minWidth:"60ch"}} 
                multiline rows={4} 
                type="textArea"
                {...register("description")}
            />
            <TextField 
                size="small" 
                InputLabelProps={{shrink:true}} 
                label="live site" 
                variant="outlined"
                {...register("liveSite")}
            />
            <TextField 
                size="small" 
                InputLabelProps={{shrink:true}} 
                label="github" 
                variant="outlined"
                {...register("github")}
             />
        </Stack>
    )
}
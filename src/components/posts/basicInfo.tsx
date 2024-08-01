import { PostFormData } from "@/src/lib/definitions/posts";
import { Box, Button, Stack, TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

interface BasicInfoDefaults{
    name: string,
    description: string,
    liveSite?: string,
    github: string
}

interface BasicInfoProps {
    register: UseFormRegister<PostFormData>,
    defaults?: BasicInfoDefaults
}

export default function BasicInfo({register, defaults}: BasicInfoProps) {
    return(
        <Stack gap={2} sx={{justifyContent:"center", flexWrap:"wrap"}}>
            <TextField 
                size="small" 
                label="name" 
                variant="outlined"
                InputLabelProps={{shrink:true}} 
                defaultValue={defaults?.name ?? ""}
                {...register("name")}
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
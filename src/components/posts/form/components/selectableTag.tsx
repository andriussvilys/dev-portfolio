"use client"

import { TagRecord } from "@/src/lib/definitions/tags";
import { useFormContext, UseFormRegister } from "react-hook-form";
import { Box } from "@mui/material";
import Tag from "../../../tags/tag";

interface SelectableTagProps{
    tag: TagRecord,
    fieldName: string,
}

export default function SelectableTag({tag, fieldName}:SelectableTagProps){
    const {register} = useFormContext()
    return(
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", flex:1}}>
            <Tag data={tag} />
            <input type="checkbox" {...register(fieldName)} value={tag._id} />
        </Box>
    )
}
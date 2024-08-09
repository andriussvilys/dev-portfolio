"use client"

import { TagRecord } from "@/src/lib/definitions/tags";
import { UseFormRegister } from "react-hook-form";
import { Box } from "@mui/material";
import Tag from "../../../tags/tag";

interface SelectableTagProps{
    tag: TagRecord,
    register: UseFormRegister<any>
    fieldName: string,
}

export default function SelectableTag({tag, register, fieldName}:SelectableTagProps){
    return(
        <Box sx={{display:"flex", alignItems:"center"}}>
            <Tag tag={tag} />
            <input type="checkbox" {...register(fieldName)} value={tag._id} />
        </Box>
    )
}
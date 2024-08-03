"use client"

import { Tag as TagData } from "@/src/lib/definitions/tags";
import { UseFormRegister } from "react-hook-form";
import { Box, Checkbox, Stack } from "@mui/material";
import Tag from "../tags/tag";

interface SelectableTagProps{
    tag: TagData,
    register: UseFormRegister<any>
}

export default function SelectableTag({tag, register}:SelectableTagProps){
    return(
        <Box sx={{display:"flex", alignItems:"center"}}>
            <Tag tag={tag} /> 
            <Checkbox value={tag._id} {...register("tags")} />
        </Box>
    )
}
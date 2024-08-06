"use client"

import { Tag as TagData } from "@/src/lib/definitions/tags";
import { Controller, ControllerFieldState, ControllerRenderProps, FieldValues, UseFormRegister, UseFormStateReturn } from "react-hook-form";
import { Box, Checkbox, Stack } from "@mui/material";
import Tag from "../../../tags/tag";
import { ReactElement } from "react";

interface SelectableTagProps{
    tag: TagData,
    register: UseFormRegister<any>
    checked?: boolean
    control: any,
    fieldName: string,
}

export default function SelectableTag({tag, register, checked, control, fieldName}:SelectableTagProps){
    return(
        <Box sx={{display:"flex", alignItems:"center"}}>
            <Tag tag={tag} />
            <input type="checkbox" {...register("tags")} value={tag._id} />
        </Box>
    )
}
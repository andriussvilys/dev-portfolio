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
            {/* <Controller 
                name={fieldName} 
                control={control}        
                render={({ field, fieldState, formState, }) => {
                    return <Checkbox {...field} value={tag._id} onChange={e => field.onChange(e.target.value)}/>
                } } 
            /> */}
            {/* <Checkbox value={tag._id} {...register("tags")} /> */}
            <input type="checkbox" {...register("tags")} value={tag._id} />
        </Box>
    )
}
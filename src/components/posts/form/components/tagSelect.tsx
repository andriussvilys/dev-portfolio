"use client"

import { UseFormRegister } from "react-hook-form"
import SelectableTag from "./selectableTag"
import { Tag } from "@/src/lib/definitions/tags"
import { Box, List, ListItem } from "@mui/material"

interface TagSelectProps{
    register:UseFormRegister<any>,
    tags:Tag[],
    selected?: string[],
    control: any
}

export default function TagSelect({register, tags, selected, control}:TagSelectProps){
    return(
        <List sx={{display:"flex"}}>
            {tags.map((tag, index) => {
                return(
                    <ListItem key={tag.key}>
                        <SelectableTag control={control} register={register} tag={tag} fieldName={`tags.${index}`}/>
                    </ListItem>
                )
            })}
        </List>
    )
}
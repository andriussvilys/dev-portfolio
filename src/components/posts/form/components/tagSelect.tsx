"use client"

import { UseFormRegister } from "react-hook-form"
import SelectableTag from "./selectableTag"
import { TagRecord } from "@/src/lib/definitions/tags"
import { List, ListItem } from "@mui/material"

interface TagSelectProps{
    register:UseFormRegister<any>,
    tags:TagRecord[],
}

export default function TagSelect({register, tags}:TagSelectProps){
    return(
        <List sx={{display:"flex"}}>
            {tags.map((tag, index) => {
                return(
                    <ListItem key={tag._id}>
                        <SelectableTag register={register} tag={tag} fieldName={`tags.${index}`}/>
                    </ListItem>
                )
            })}
        </List>
    )
}
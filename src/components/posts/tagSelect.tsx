"use client"

import { UseFormRegister } from "react-hook-form"
import SelectableTag from "./selectableTag"
import { Tag } from "@/src/lib/definitions/tags"
import { Box, List, ListItem } from "@mui/material"

interface TagSelectProps{
    register:UseFormRegister<any>,
    tags:Tag[]
}

export default function TagSelect({register, tags}:TagSelectProps){
    return(
        <Box sx={{height:"100%", overflow:"auto"}}>
            <List>
                {tags.map(tag => {
                    return(
                        <ListItem key={tag.key}>
                            <SelectableTag register={register} tag={tag}/>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}
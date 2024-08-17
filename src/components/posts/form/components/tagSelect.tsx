"use client"

import { UseFormRegister } from "react-hook-form"
import SelectableTag from "./selectableTag"
import { TagRecord } from "@/src/lib/definitions/tags"
import { Box, List, ListItem, useTheme } from "@mui/material"

interface TagSelectProps{
    register:UseFormRegister<any>,
    tags:TagRecord[],
    watch: any
}

interface IndexedTag{
    record:TagRecord,
    index:number
}

export default function TagSelect({register, tags, watch}:TagSelectProps){
    const theme = useTheme()
    return(
        <List sx={{
            width:"100%",
            display:"grid",
            justifyContent:"center",
            gridTemplateColumns:"repeat(auto-fit, 150px)",
            gridAutoRows:"min-content",
            gap:0,   
        }}>
            {tags.map((tag,index) => {
                return(
                    <ListItem sx={{
                        flex:1,
                        border: "1px solid",
                        borderColor: theme.palette.divider
                        }} key={tag._id}>
                        <SelectableTag register={register} tag={tag} fieldName={`tags.${index}`}/>
                    </ListItem>
                )
            })}
        </List>
    )
}
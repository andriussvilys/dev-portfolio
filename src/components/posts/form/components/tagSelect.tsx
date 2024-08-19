"use client"

import SelectableTag from "./selectableTag"
import { TagRecord } from "@/src/lib/definitions/tags"
import { List, ListItem, useTheme } from "@mui/material"

interface TagSelectProps{
    tags:TagRecord[],
}

export default function TagSelect({tags}:TagSelectProps){
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
                        <SelectableTag tag={tag} fieldName={`tags.${index}`}/>
                    </ListItem>
                )
            })}
        </List>
    )
}
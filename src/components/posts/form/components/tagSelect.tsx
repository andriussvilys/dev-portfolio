"use client"

import SelectableTag from "./selectableTag"
import { TagRecord } from "@/src/lib/definitions/tags"
import { Box, List, ListItem, Stack, Typography, useTheme } from "@mui/material"
import { useFormContext } from "react-hook-form"

interface TagSelectProps{
    tags:TagRecord[],
}

export default function TagSelect({tags}:TagSelectProps){
    const theme = useTheme()
    const {watch} = useFormContext()
    const selectedValues = watch("tags")
    const indexedTags = tags.map((tag,index) => ({...tag, index}))
    const selected = indexedTags.filter((tag) => selectedValues.includes(tag._id))
    const unselected = indexedTags.filter((tag) => !selectedValues.includes(tag._id))
    return(
        <Box 
            sx={{display:"flex", flex:1}} gap={4}
        >
            <Stack 
                // sx={{flex:0}}
            >
                <Typography variant="h6">Selected Tags</Typography>
                <List>
                    {selected.map((tag) => {
                        return(
                            <ListItem sx={{
                                flex:1,
                                border: "1px solid",
                                borderColor: theme.palette.divider
                                }} key={tag._id}>
                                <SelectableTag tag={tag} fieldName={`tags.${tag.index}`}/>
                            </ListItem>
                        )
                    })}
                </List>
            </Stack>
            <Stack sx={{flex:1}}>
                <Typography variant="h6">Unselected Tags</Typography>
                <List sx={{
                    width:"100%",
                    display:"grid",
                    gridTemplateColumns:"repeat(auto-fit, 150px)",
                    gridAutoRows:"min-content",
                    gap:0,   
                }}>
                    {unselected.map((tag) => {
                        return(
                            <ListItem sx={{
                                flex:1,
                                border: "1px solid",
                                borderColor: theme.palette.divider
                                }} key={tag._id}>
                                <SelectableTag tag={tag} fieldName={`tags.${tag.index}`}/>
                            </ListItem>
                        )
                    })}
                </List>
            </Stack>
        </Box>
    )
}
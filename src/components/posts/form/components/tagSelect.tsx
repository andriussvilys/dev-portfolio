"use client"

import Sortable from "@/src/components/sortable/sortable"
import SelectableTag, { SelectableTagData } from "./selectableTag"
import { TagRecord } from "@/src/lib/definitions/tags"
import { Box, List, ListItem, Stack, Typography, useTheme } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { verticalListSortingStrategy } from "@dnd-kit/sortable"

interface TagSelectProps{
    tags:TagRecord[],
}

export default function TagSelect({tags}:TagSelectProps){
    const theme = useTheme()
    const {watch, setValue} = useFormContext()
    const selectedValues = watch("tags")
    const indexedTags:SelectableTagData[] = tags.map((tag,index) => ({...tag, formField: {root:"tags", index}}))
    const selected:SelectableTagData[] = selectedValues.map((id:string) => indexedTags.find(tag => tag._id === id))
    const unselected:SelectableTagData[] = indexedTags.filter((tag) => !selected.includes(tag))

    const rearrangeCallback = (items:SelectableTagData[]) => {
        setValue("tags", items.map(tag => tag._id))
    }

    return(
        <Box 
            sx={{display:"flex", flex:1}} gap={4}
        >
            <Stack>
                <Typography variant="h6">Sort Tags</Typography>
                <Sortable 
                    items={selected}
                    Component={SelectableTag}
                    rearrangeCallback={rearrangeCallback}
                    strategy={verticalListSortingStrategy}
                />
            </Stack>
            <Stack sx={{flex:1}}>
                <Typography variant="h6">Select tags</Typography>
                <List sx={{
                    width:"100%",
                    display:"grid",
                    gridTemplateColumns:"repeat(auto-fit, 150px)",
                    gridAutoRows:"min-content",
                    gap:0,
                    p:0
                }}>
                    {unselected.map((tag) => {
                        return(
                            <ListItem sx={{
                                flex:1,
                                border: "1px solid",
                                borderColor: theme.palette.divider
                                }} key={tag._id}
                            >
                                <SelectableTag data={tag}/>
                            </ListItem>
                        )
                    })}
                </List>
            </Stack>
        </Box>
    )
}
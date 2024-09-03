"use client"

import Sortable from "@/src/components/sortable/sortable"
import SelectableTag, { SelectableTagData } from "./selectableTag"
import { TagRecord } from "@/src/lib/definitions/tags"
import { Box, Divider, List, ListItem, Stack, Typography, useTheme } from "@mui/material"
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
            <Stack sx={{flex:1, maxWidth:"30ch"}} gap={2}>
                <Stack>
                    <Typography variant="overline">Sort Tags</Typography>
                    <Divider/>
                </Stack>
                <Sortable 
                    items={selected}
                    Component={SelectableTag}
                    rearrangeCallback={rearrangeCallback}
                    strategy={verticalListSortingStrategy}
                />
            </Stack>
            <Divider orientation="vertical"/>
            <Stack sx={{flex:4}} gap={2}>
                <Stack>
                    <Typography variant="overline">Select tags</Typography>
                    <Divider/>
                </Stack>
                <List sx={{
                    width:"100%",
                    display:"grid",
                    gridTemplateColumns:"repeat(auto-fit, 150px)",
                    gridAutoRows:"min-content",
                    gap:1,
                    p:0,
                    justifyContent:"center"
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
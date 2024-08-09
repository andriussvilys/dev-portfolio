import { Box, Stack, Typography } from "@mui/material";
import Section from "./section";
import { listTags } from "@/src/lib/tags";
import Tag from "../../tags/tag";
import type {Tag as TagData} from "@/src/lib/definitions/tags";

export default async function Skills(){
    const tags = (await listTags()).items
    const categories:{[key:string]:TagData[]} = {}
    tags?.forEach(tag => {
        if(tag.category){
            const categoryName = tag.category.toString()
            if(categories[categoryName]){
                categories[categoryName].push(tag)
            }
            else{
                categories[categoryName] = [tag]
            }
        }
    })
    const categoryNames:string[] = Object.keys(categories)
    return(
        <Section style={{height:"100vh"}}>
            <Typography variant="h2">Skills section</Typography>
            <Stack>
                {categoryNames.map(categoryName => {
                    const category = categories[categoryName]
                    return (
                        <Stack>
                            <Typography variant="h3">{categoryName}</Typography>
                            <Box sx={{display:"flex"}}>
                                {category.map(tag => {
                                    return <Tag key={tag._id} tag={tag}/>
                                })}
                            </Box>
                        </Stack>
                    )
                }
                )}
            </Stack>
        </Section>
    )
}
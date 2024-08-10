import { Box, Stack, Typography } from "@mui/material";
import Section from "./section";
import Tag from "../../tags/tag";
import type {TagRecord} from "@/src/lib/definitions/tags";

export default function Skills({tags}:{tags:TagRecord[]}){
    const categories:{[key:string]:TagRecord[]} = {}
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
                        <Stack key={categoryName}>
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
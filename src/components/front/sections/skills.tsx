import { Box, Card, Divider, Typography } from "@mui/material";
import Section from "./section";
import Tag from "../../tags/tag";
import type {TagRecord} from "@/src/lib/definitions/tags";
import { dividerColor, SectionName } from "../constants";

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
        <Section 
            style={{gap:4, justifyContent:"space-between"}}
            headline={SectionName.skills}
            id={SectionName.skills}
        >   
            <Box sx={{display:"flex", flexWrap:"wrap", justifyContent:"center"}} gap={2}>
                {categoryNames.map(categoryName => {
                    const category = categories[categoryName]
                    return (
                        <Card key={categoryName} sx={{
                            border:"1px solid",
                            borderColor: dividerColor,
                        }}>
                            <Box sx={{pl:2, pr:2}}>
                                <Typography variant="overline">{categoryName.toUpperCase()}</Typography>
                            </Box>
                            <Divider/>
                            <Box sx={{display:"flex", p:2, justifyContent:"center", alignItems:"center"}} gap={1}>
                                {category.map(tag => {
                                    return <Tag key={tag._id} tag={tag}/>
                                })}
                            </Box>
                        </Card>
                    )
                }
                )}
            </Box>
        </Section>
    )
}
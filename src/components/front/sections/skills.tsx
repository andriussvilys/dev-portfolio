"use client"

import { Box, Card, Divider, Typography, useTheme } from "@mui/material";
import Section from "./section";
import Tag from "../../tags/tag";
import {categories, category, type TagRecord} from "@/src/lib/definitions/tags";
import { SectionName } from "../constants";
import { FullscreenExit } from "@mui/icons-material";

const createCategoriesList = (tags:TagRecord[]) => {
    const categoriesMap:{[key:string]:TagRecord[]} = {}
    categories.forEach(categoryName => {
        categoriesMap[categoryName] = []
    })
    tags?.forEach(tag => {
        const tagCategory = tag.category
        if(tagCategory && categories.includes(tagCategory as category)){
            categoriesMap[tagCategory].push(tag)
        }
    })
    return categoriesMap
}

export default function Skills({tags}:{tags:TagRecord[]}){
    const categoriesMap = createCategoriesList(tags)
    const theme = useTheme()

    return(
        <Section 
            style={{gap:4, justifyContent:"space-between"}}
            headline={SectionName.skills}
            id={SectionName.skills}
        >   
            <Box sx={{display:"flex", flexWrap:"wrap", justifyContent:"center"}} gap={2}>
                {categories.map(categoryName => {
                    const category = categoriesMap[categoryName]
                    return (
                        <Card 
                            key={categoryName} 
                            sx={{
                                border:"1px solid",
                                borderColor: theme.palette.divider,
                                display:"flex",
                                flexDirection:"column",
                                [theme.breakpoints.down("md")]:{
                                    flex: "1 auto",
                                }
                            }}
                        >
                            <Box sx={{pl:2, pr:2}}>
                                <Typography variant="overline">{categoryName.toUpperCase()}</Typography>
                            </Box>
                            <Divider/>
                            <Box sx={{display:"flex", flex:1, p:2, justifyContent:"center", alignItems:"center"}} gap={1}>
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
import { Box, Card, Divider, Typography } from "@mui/material";
import Section from "./section";
import Tag from "../../tags/tag";
import {categories, category, type TagRecord} from "@/src/lib/definitions/tags";
import { dividerColor, SectionName } from "../constants";

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
    // const categoriesMap:{[key:string]:TagRecord[]} = {}
    // tags?.forEach(tag => {
    //     if(tag.category){
    //         const categoryName = tag.category.toString()
    //         if(categoriesMap[categoryName]){
    //             categoriesMap[categoryName].push(tag)
    //         }
    //         else{
    //             categoriesMap[categoryName] = [tag]
    //         }
    //     }
    // })
    // const categoryNames:string[] = Object.keys(categories)
    const categoriesMap = createCategoriesList(tags)

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
import Sortable from "@/src/components/sortable/sortable";
import Tag from "@/src/components/tags/tag";
import { defaultPaging } from "@/src/lib/definitions/pages";
import { TagRecord } from "@/src/lib/definitions/tags";
import { listTags } from "@/src/lib/tags";
import { Box, Container, Stack, Typography } from "@mui/material";

export default async function SortTagsPage() {
    const tagsData = (await listTags(defaultPaging))
    const tags = tagsData.items
    const total = tagsData.total

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
    return (
        <Container sx={{height:"100%", overflow:"auto"}}>
            {
                categoryNames.map(categoryName => {
                    return (
                        <Stack key={categoryName}>
                            <Typography variant="h6">{categoryName}</Typography>
                            <Box sx={{display:"flex"}} gap={1}>
                                <Sortable 
                                    items={categories[categoryName]}
                                />
                            </Box>
                        </Stack>
                        
                    )
                })
            }
        </Container>
    )
}
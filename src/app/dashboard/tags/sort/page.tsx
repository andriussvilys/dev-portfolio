import { listTags } from "@/src/app/api/data/tags/utils";
import SortTags from "@/src/components/tags/SortTags";
import { defaultPaging } from "@/src/lib/definitions/pages";
import { TagRecord } from "@/src/lib/definitions/tags";
import { Box, Container, Stack, Typography } from "@mui/material";
import Dashboard from "../../page";
import DashboardPage from "@/src/components/dashboard/dashboardPage/dashboardPage";
import { PageName } from "@/src/components/dashboard/constants";

export default async function SortTagsPage() {
    const tagsQuery = (await listTags({paging:defaultPaging}))
    const tags:TagRecord[] = (await tagsQuery.json()).items

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
        <DashboardPage name={PageName.TAGS_SORT}>
            <Container sx={{height:"100%", width:"100%", overflow:"auto"}}>
                {
                    categoryNames.map(categoryName => {
                        return (
                            <Stack key={categoryName}>
                                <Typography variant="h6">{categoryName}</Typography>
                                <Box sx={{display:"flex"}} gap={1}>
                                    <SortTags 
                                        items={categories[categoryName]}
                                    />
                                </Box>
                            </Stack>
                        )
                    })
                }
            </Container>
        </DashboardPage>
    )
}
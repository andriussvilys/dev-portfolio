import { listAll } from "@/src/lib/tags"
import { revalidatePath } from "next/cache"
import DashboardTag from "@/src/components/dashboard/dashboardTag"
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import {AddCircle as AddCircleIcon } from "@mui/icons-material"
import Pagination from "@/src/components/pagination"
import { tagsLimitPerPage } from "@/src/lib/constants"
import type {Tag} from "@/src/lib/data/tags"
import TagFormEdit from "@/src/components/tags/tagFormEdit"
import { getURL } from "@/src/lib/storage"

interface TagsPageParams{
    page: number,
    limit: number
}

const parseParams = (params:any):TagsPageParams => {
    const parsed:TagsPageParams = {
        page: 1,
        limit: tagsLimitPerPage
    }
    const pageParam = params.page
    const limitParam = params.limit
    if(pageParam){
        parsed.page = parseInt(pageParam)
    }
    if(limitParam){
        parsed.limit = parseInt(limitParam)
    }
    return parsed
}

export default async function Page({searchParams}:{searchParams:URLSearchParams}) {

    revalidatePath("/dashboard/tags")
    const {page, limit} = parseParams(searchParams)
    const tagsData = await listAll({page, limit})
    const tags:Tag[] = tagsData.tags.map((tag:Tag) => {return {...tag, url: getURL(tag.key)}})
    const total = tagsData.total

    return (
        <Container component="section" 
            sx={{
                overflow:"hidden", 
                height: "100%", 
                display:"flex",
                flexDirection:"column",
                }}
            >
            <Button sx={{alignSelf:"end", m:2}} startIcon={<AddCircleIcon/>} variant="contained" href="/dashboard/tags/create" color="success">
                <Typography>Add new tag</Typography>
            </Button>
            <Stack sx={{overflow:"auto", alignItems:"stretch", width: "100%"}} gap={2}>
                <Box sx={{display:"flex", flexWrap:"wrap"}}>
                    {tags.map((tag) => {
                        return(
                            <DashboardTag key={tag.key} tag={tag}>
                                <TagFormEdit tagData={tag} _id={tag._id}/>
                            </DashboardTag>
                        )
                    })}
                </Box>
                <Pagination page={page} totalPages={total} limit={limit} />
            </Stack>
        </Container>
    )
}
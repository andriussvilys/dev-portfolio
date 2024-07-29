import { getCategories, listAll } from "@/src/lib/tags"
import { revalidatePath } from "next/cache"
import DashboardTag from "@/src/components/dashboard/dashboardTag"
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import {AddCircle as AddCircleIcon } from "@mui/icons-material"
import Pagination from "@/src/components/pagination"
import { tagsLimitPerPage } from "@/src/lib/constants"
import TagFormEdit from "@/src/components/tags/tagFormEdit"
import { getURL } from "@/src/lib/storage"
import { Tag } from "@/src/lib/definitions/tags"

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

interface OverviewPageProps {
    searchParams: URLSearchParams,
    children: React.ReactNode,
    itemCount: number,
    actionButton: React.ReactNode
}

export default async function OverviewPage({searchParams, children, itemCount, actionButton}:OverviewPageProps) {

    revalidatePath("/dashboard/tags")
    const {page, limit} = parseParams(searchParams)
    const total = Math.ceil(itemCount / limit)

    return (
        <Container component="section" 
            sx={{
                overflow:"hidden", 
                height: "100%", 
                display:"flex",
                flexDirection:"column",
                }}
            >
            {actionButton}
            <Stack sx={{overflow:"auto", width: "100%", alignItems:"center"}} gap={2}>
                <Box sx={{display:"flex", flexWrap:"wrap"}}>
                    {children}
                </Box>
                <Pagination page={page} totalPages={total} limit={limit} />
            </Stack>
        </Container>
    )
}
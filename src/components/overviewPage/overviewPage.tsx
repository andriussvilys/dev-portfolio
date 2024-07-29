import { revalidatePath } from "next/cache"
import { Box, Container, Stack } from "@mui/material"
import Pagination from "@/src/components/pagination"
import { tagsLimitPerPage } from "@/src/lib/constants"

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
                <Pagination page={page} itemCount={itemCount} limit={limit} />
            </Stack>
        </Container>
    )
}
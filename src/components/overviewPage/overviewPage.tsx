import { Box, Container, Stack } from "@mui/material"
import Pagination from "@/src/components/pagination"
import { getPaging } from "@/src/lib/data/commons/utils"
import { defaultPaging } from "@/src/lib/definitions/pages"

interface OverviewPageProps {
    searchParams: URLSearchParams,
    children: React.ReactNode,
    itemCount: number,
}

export default async function OverviewPage({searchParams, children, itemCount}:OverviewPageProps) {

    const {page, limit} = getPaging(searchParams) ?? defaultPaging

    return (
        <Container component="section" 
            sx={{
                overflow:"hidden", 
                display:"flex",
                flexDirection:"column",
                p:0
                }}
            >
            <Stack sx={{overflow:"auto", width: "100%", alignItems:"center"}} gap={2}>
                <Box sx={{display:"flex", justifyContent:"center", flexWrap:"wrap", width:"100%"}}>
                    {children}
                </Box>
                <Pagination page={page} itemCount={itemCount} limit={limit} />
            </Stack>
        </Container>
    )
}
import { listAll } from "@/src/lib/tags"
import Tag from "@/src/components/tags/tag"
import { revalidatePath } from "next/cache"
import DashboardTag from "@/src/components/dashboard/dashboardTag"
import { Box, Button, Container, Typography } from "@mui/material"
import {AddCircle as AddCircleIcon } from "@mui/icons-material"

export default async function Page() {
    const tags = await listAll()
    revalidatePath("/dashboard/tags")
    return (
        <Container component="section" 
            sx={{
                overflow:"hidden", 
                height: "100%", 
                display:"flex",
                flexDirection:"column",
                }}>
            <Button sx={{alignSelf:"end"}} startIcon={<AddCircleIcon/>} variant="contained" href="/dashboard/tags/create" color="success">
                <Typography>Add new tag</Typography>
            </Button>
            <Box sx={{overflow:"auto"}}>
                    {tags.map((tag: any) => {
                        return(
                            <DashboardTag key={tag.key} tag={tag}>
                                <Tag tag={tag}/>
                            </DashboardTag>
                        )
                    })}
            </Box>
        </Container>
    )
}
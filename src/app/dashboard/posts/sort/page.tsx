import SortPosts from "@/src/components/posts/sort/sortPosts";
import { defaultPaging } from "@/src/lib/definitions/pages";
import { listPosts } from "@/src/lib/posts";
import { Box, Container, Stack, Typography } from "@mui/material";

export default async function SortPostsPage() {
    const postsData = (await listPosts(defaultPaging))
    const posts = postsData.items

    return (
        <Container sx={{height:"100%", overflow:"auto"}}>
            <Stack>
                <Box sx={{display:"flex"}} gap={1}>
                    <SortPosts 
                        items={posts}
                    />
                </Box>
            </Stack>
        </Container>
    )
}
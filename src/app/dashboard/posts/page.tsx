import ActionButton from "@/src/components/overviewPage/actionButton";
import OverviewPage from "@/src/components/overviewPage/overviewPage";
import { Post } from "@/src/lib/definitions/posts";
import { parseParams } from "@/src/lib/utils";
import { Box, Stack, Typography } from "@mui/material";
import { revalidatePath } from "next/cache";
import { listAll } from "@/src/lib/posts"

export default async function PostsPage({searchParams}:{searchParams:URLSearchParams}){
    revalidatePath("/dashboard/posts")
    const {page, limit} = parseParams(searchParams)
    const postsData = await listAll({page, limit})
    const posts:Post[] = postsData.posts.map((post:Post) => {return {...post}})
    const total = postsData.total
    return(
        <OverviewPage 
            searchParams={searchParams} 
            itemCount={total} 
            actionButton={<ActionButton href="/dashboard/posts/create" buttonText="Create new Post"/>}
        >
            <Stack gap={2}>
                {posts.map((post:Post) => {
                    return(
                        <Box key={crypto.randomUUID()} sx={{border: "1px solid black", p: 2}}>
                            <Typography>name: {post.name}</Typography>
                            <Typography>Description: {post.description}</Typography>
                        </Box>
                    )
                })}
            </Stack>
        </OverviewPage>
    )
}
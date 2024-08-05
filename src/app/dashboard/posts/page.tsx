import ActionButton from "@/src/components/overviewPage/actionButton";
import OverviewPage from "@/src/components/overviewPage/overviewPage";
import type { Post as PostData } from "@/src/lib/definitions/posts";
import { Box, Button, Stack } from "@mui/material";
import { revalidatePath } from "next/cache";
import Post from "@/src/components/posts/post";
import { getPaging } from "@/src/lib/data/commons/utils";
import { listPosts } from "@/src/lib/posts";
import { defaultPaging } from "@/src/lib/definitions/pages";
import { getURL } from "@/src/lib/storage";

export default async function PostsPage({searchParams}:{searchParams:URLSearchParams}){
    revalidatePath("/dashboard/posts")
    const paging = getPaging(searchParams)
    const postsData = await listPosts(paging ?? defaultPaging)
    const {items:posts, total} = postsData
    return(
        <OverviewPage 
            searchParams={searchParams} 
            itemCount={total} 
            actionButton={<ActionButton href="/dashboard/posts/create" buttonText="Create new Post"/>}
        >
            <Stack gap={2}>
                {posts.map((post:PostData) => {
                    return(
                        <Stack key={post._id}>
                            <Post post={post}/>
                            <Box gap={2} sx={{display:"flex", p:2, alignSelf:"end"}}>
                                <Button disabled variant="outlined" color="error">Delete</Button>
                                <Button href={`/dashboard/posts/edit/${post._id}`} variant='contained'>Edit</Button>
                            </Box>
                        </Stack>
                    )
                })}
            </Stack>
        </OverviewPage>
    )
}
import ActionButton from "@/src/components/overviewPage/actionButton";
import OverviewPage from "@/src/components/overviewPage/overviewPage";
import type { PostRecord, PostWithTags } from "@/src/lib/definitions/posts";
import { Box, Button, Stack } from "@mui/material";
import { revalidatePath } from "next/cache";
import Post from "@/src/components/posts/post";
import { getPaging } from "@/src/lib/data/commons/utils";
import { listPosts } from "@/src/lib/posts";
import { defaultPaging } from "@/src/lib/definitions/pages";
import DeletePostButton from "@/src/components/posts/deletePostButton";

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
                {posts.map((post:PostWithTags) => {
                    return(
                        <Stack key={post._id}>
                            <Post data={post}/>
                            <Box gap={2} sx={{display:"flex", p:2, alignSelf:"end"}}>
                                <DeletePostButton _id={post._id}/>
                                <Button href={`/dashboard/posts/edit/${post._id}`} variant='contained'>Edit</Button>
                            </Box>
                        </Stack>
                    )
                })}
            </Stack>
        </OverviewPage>
    )
}
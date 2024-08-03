import ActionButton from "@/src/components/overviewPage/actionButton";
import OverviewPage from "@/src/components/overviewPage/overviewPage";
import type { Post as PostData } from "@/src/lib/definitions/posts";
import { parseParams } from "@/src/lib/utils";
import { Box, Stack, Typography } from "@mui/material";
import { revalidatePath } from "next/cache";
import { listAll } from "@/src/lib/posts"
import Post from "@/src/components/posts/post";

export default async function PostsPage({searchParams}:{searchParams:URLSearchParams}){
    revalidatePath("/dashboard/posts")
    const {page, limit} = parseParams(searchParams)
    const postsData = await listAll({page, limit})
    const posts:PostData[] = postsData.posts.map((post:PostData) => {return {...post}})
    const total = postsData.total
    return(
        <OverviewPage 
            searchParams={searchParams} 
            itemCount={total} 
            actionButton={<ActionButton href="/dashboard/posts/create" buttonText="Create new Post"/>}
        >
            <Stack gap={2}>
                {posts.map((post:PostData) => {
                    return(
                        <Post key={post._id} post={post}/>
                    )
                })}
            </Stack>
        </OverviewPage>
    )
}
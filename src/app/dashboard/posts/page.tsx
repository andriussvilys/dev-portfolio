import OverviewPage from "@/src/components/overviewPage/overviewPage";
import type { PostWithTags } from "@/src/lib/definitions/posts";
import { Box, Button, Stack } from "@mui/material";
import { revalidatePath } from "next/cache";
import Post from "@/src/components/posts/post";
import { getPaging } from "@/src/lib/data/commons/utils";
import { defaultPaging } from "@/src/lib/definitions/pages";
import DeletePostButton from "@/src/components/posts/deletePostButton";
import { listPosts } from "../../api/data/posts/utils";
import Dashboard from "../page";
import DashboardPage from "@/src/components/dashboard/dashboardPage/dashboardPage";
import { PageName } from "@/src/components/dashboard/constants";

export default async function PostsPage({searchParams}:{searchParams:URLSearchParams}){
    revalidatePath("/dashboard/posts")
    const paging = getPaging(searchParams)
    const postsQuery = await listPosts({paging: paging ?? defaultPaging})
    const postsData = await postsQuery.json()
    const {items:posts, total} = postsData
    return(
        <DashboardPage 
            name={PageName.POSTS_OVERVIEW}
            buttons={[
                {name:PageName.POSTS_CREATE, href:"/dashboard/posts/create"},
                {name:PageName.POSTS_SORT, href:"/dashboard/posts/sort"}
            ]}
        >
            <OverviewPage 
                searchParams={searchParams} 
                itemCount={total} 
            >
                <Box 
                    sx={{
                        display:"grid",
                        gridTemplateColumns: "repeat(auto-fit, 45ch)",
                        gridAutoRows:"auto",
                        width:"100%",
                        justifyContent:"center",
                    }}
                    gap={2}
                >
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
                </Box>
            </OverviewPage>
        </DashboardPage>
    )
}
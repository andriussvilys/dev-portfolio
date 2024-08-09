import { Stack, Typography } from "@mui/material";
import Section from "./section";
import { listPosts } from "@/src/lib/posts";
import { postsLimitPerPage } from "@/src/lib/constants";
import Post from "../../posts/post";

export default async function Projects(){
    const posts = (await listPosts({page:1, limit:postsLimitPerPage})).items
    return(
        <Section style={{minHeight:"100vh"}}>
            <Typography variant="h2">Project section</Typography>
            <Stack>
                {posts.map(post => (
                    <Post key={post._id} post={post}/>
                ))}
            </Stack>
        </Section>
    )
}
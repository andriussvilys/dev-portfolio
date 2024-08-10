import { Stack, Typography } from "@mui/material";
import Section from "./section";
import Post from "../../posts/post";
import { PostWithTags } from "@/src/lib/definitions/posts";

export default function Projects({posts}:{posts:PostWithTags[]}){
    return(
        <Section style={{minHeight:"100vh"}}>
            <Typography variant="h2">Project section</Typography>
            <Stack gap={4}>
                {posts.map(post => (
                    <Post key={post._id} post={post}/>
                ))}
            </Stack>
        </Section>
    )
}
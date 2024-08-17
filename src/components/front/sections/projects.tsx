import { Box } from "@mui/material";
import Section from "./section";
import Post from "../../posts/post";
import { PostWithTags } from "@/src/lib/definitions/posts";
import { SectionName } from "../constants";

export default function Projects({posts}:{posts:PostWithTags[]}){
    return(
        <Section style={{minHeight:"100vh", gap:4}} headline={SectionName.projects} id={SectionName.projects}>
            <Box gap={4} sx={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
                {posts.map(post => (
                    <Box key={post._id} >
                        <Post data={post}/>
                    </Box>
                ))}
            </Box>
        </Section>
    )
}
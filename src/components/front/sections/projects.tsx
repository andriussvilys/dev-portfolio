import { Box } from "@mui/material";
import Section from "./section";
import Post from "../../posts/post";
import { PostWithTags } from "@/src/lib/definitions/posts";
import { SectionName } from "../constants";

export default function Projects({posts}:{posts:PostWithTags[]}){
    return(
        <Section style={{gap:4}} headline={SectionName.projects} id={SectionName.projects}>
            <Box sx={{width:"100%"}}>
                <Box gap={4} sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(40ch, 50ch))",
                    gridAutoRows: "auto",
                    width: "100%",
                    justifyContent: "center",	
                }}>
                    {posts.map(post => (
                        <Box key={post._id} >
                            <Post data={post}/>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Section>
    )
}
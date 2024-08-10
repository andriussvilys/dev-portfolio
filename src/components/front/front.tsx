"use client"

import { Box, Container} from "@mui/material";
import Navigation from "./navigation/navigation";
import Hero from "./sections/hero";
import Projects from "./sections/projects";
import Skills from "./sections/skills";
import About from "./sections/about";
import { PostWithTags } from "@/src/lib/definitions/posts";
import { TagRecord } from "@/src/lib/definitions/tags";
import { ThemeProvider } from "@emotion/react";
import theme from "@/src/lib/theming/theme";

interface FrontProps {
    posts: PostWithTags[],
    tags: TagRecord[]
}

export default function Front({posts, tags}:FrontProps){
    return(
        <ThemeProvider theme={theme}>
                <Box>
                    <Navigation/>
                    <Container component="main" maxWidth="lg" sx={{height: "100vh", overflow:"auto"}}>
                        <Hero />
                        <Projects posts={posts}/>
                        <Skills tags={tags}/>
                        <About />
                        <Box component="footer" sx={{bgcolor:"blue", height:"100px"}}></Box>
                    </Container>
                </Box>
        </ThemeProvider>
    )
}
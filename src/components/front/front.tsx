"use client"

import { Box, Container, CssBaseline, Divider, Stack, Toolbar} from "@mui/material";
import Navigation from "./navigation/navigation";
import Hero from "./sections/hero";
import Projects from "./sections/projects";
import Skills from "./sections/skills";
import About from "./sections/about";
import { PostWithTags } from "@/src/lib/definitions/posts";
import { TagRecord } from "@/src/lib/definitions/tags";
import { ThemeProvider } from "@emotion/react";
import theme from "@/src/lib/theming/theme";
import Contact from "./sections/contact";

interface FrontProps {
    posts: PostWithTags[],
    tags: TagRecord[]
}

export default function Front({posts, tags}:FrontProps){
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Navigation/>
                <Stack sx={{height:"100vh"}}>
                    <Toolbar />          
                    <Container 
                        component="main" 
                        sx={{
                            flex: 1,
                            overflow: "auto",
                            maxWidth:"100vw !important",   
                        }}>
                        <Container sx={{maxWidth:"lg", height:"100%"}}>
                            <Hero />
                            <About />
                            <Skills tags={tags}/>
                            <Projects posts={posts}/>
                            <Contact />
                            <Box component="footer" sx={{height:"100px"}}>
                                <Divider/>
                            </Box>
                        </Container>
                    </Container>
                </Stack>
        </ThemeProvider>
    )
}
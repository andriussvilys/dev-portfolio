"use client"

import { Box, Container, CssBaseline, Divider, Stack, Toolbar} from "@mui/material";
import Navigation from "./navigation/navigation";
import Projects from "./sections/projects";
import Skills from "./sections/skills";
import About from "./sections/about";
import { PostWithTags } from "@/src/lib/definitions/posts";
import { TagRecord } from "@/src/lib/definitions/tags";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "@/src/lib/theming/theme";
import Contact from "./sections/contact/contact";
import { appBarHeight } from "./navigation/constants";
import Hero from "./sections/hero/hero";
import HeroBackground from "./sections/hero/metaballs/heroBackground";

interface FrontProps {
    posts: PostWithTags[],
    tags: TagRecord[]
}

export default function Front({posts, tags}:FrontProps){
    const {theme, switchTheme} = useTheme()
    const size = 400
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Navigation theme={theme} switchTheme={switchTheme}/>
                <Stack sx={{height:"100vh", alignItems:"center"}}>
                    <Toolbar />
                    <Container 
                        component="main" 
                        sx={{
                            flex: 1,
                            overflow: "auto",
                            maxWidth:"100vw !important",
                            p:2, m:0,
                            display:"flex",
                            justifyContent:"center",
                        }}>
                        <Container sx={{maxWidth:"lg", height:"100%", p:0, m:0}}>
                            <Hero />
                            <About />
                            <Skills tags={tags}/>
                            <Projects posts={posts}/>
                            <Stack 
                                sx={{
                                    minHeight:`calc(100vh - ${appBarHeight})`,
                                }}
                            >
                                <Contact />
                                <Box component="footer" sx={{height:"100px"}}>
                                    <Divider/>
                                </Box>
                            </Stack>
                        </Container>
                    </Container>
                </Stack>
        </ThemeProvider>
    )
}
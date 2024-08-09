import { Box, Container } from "@mui/material";
import Navigation from "./navigation/navigation";
import Hero from "./sections/hero";
import Projects from "./sections/projects";
import Skills from "./sections/skills";
import About from "./sections/about";

export default function Front(){
    return(
        <>
            <Navigation/>
            <Container component="main" maxWidth="lg" sx={{height: "100vh", overflow:"auto"}}>
                <Hero />
                <Projects />
                <Skills />
                <About />
                <Box component="footer" sx={{bgcolor:"blue", height:"100px"}}></Box>
            </Container>
        </>
    )
}
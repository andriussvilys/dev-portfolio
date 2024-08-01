import { Box, Container } from "@mui/material";
import Navigation from "./navigation/navigation";
import Hero from "./sections/hero";
import Projects from "./sections/projects";

export default function Front(){
    return(
        <>
            <Navigation/>
            <Container component="main" maxWidth="lg" sx={{height: "100vh", overflow:"auto", p:0}}>
                <Hero />
                <Projects />
                <Box component="footer" sx={{bgcolor:"blue", height:"100px"}}></Box>
            </Container>
        </>
    )
}
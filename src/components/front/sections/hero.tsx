import { Box, Container, Stack, Toolbar, Typography } from "@mui/material";
import Section from "./section";

export default function Hero(){
    return(
        <Section style={{height: "100vh"}}>
            <Toolbar />
            <Box sx={{bgcolor:"blue", flex:1, width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Typography variant="h2">This is hero section</Typography>
            </Box>
        </Section>
    )
}
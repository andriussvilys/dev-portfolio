import { Box, Stack, Toolbar, Typography } from "@mui/material";
import Section from "./section";
import theme from "@/src/lib/theming/theme";
import { SectionName } from "../constants";

export default function Hero(){
    return(
        <Section style={{height: "100%"}} id={SectionName.hero}>
            <Toolbar />
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>
                <Stack>
                    <Typography variant="h3">Welcome to my portfolio</Typography>
                    <Typography variant="h6">{`I'm a full stack developer`}</Typography>
                </Stack>
                <Box sx={{m:2, width:"20vw", height:"20vw", bgcolor:theme.palette.primary.main}} borderRadius="100%">
                </Box>
            </Box>
        </Section>
    )
}
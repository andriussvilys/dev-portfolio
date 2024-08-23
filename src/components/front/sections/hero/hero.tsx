import { Box, SimplePaletteColorOptions, Stack, Typography, useTheme } from "@mui/material";
import Section from "../section";
import { SectionName } from "../../constants";
import HeroBackground from "./metaballs/heroBackground";


export default function Hero(){
    const theme = useTheme()
    const size = 400
    return(
        <Section style={{height: "100%", position:"relative"}} id={SectionName.hero}>
            <Box sx={{
                display:"flex", 
                justifyContent:"center", 
                alignItems:"center", 
                flexDirection:"column",
                height:"100%"
            }}>
                <Box sx={{position:"relative"}}>
                    <HeroBackground width={size} height={size} theme={theme}/>       
                </Box>
                <Stack>
                    <Typography variant="h3">Welcome to my portfolio</Typography>
                    <Typography variant="h6">{`I'm a full stack developer`}</Typography>
                </Stack>
            </Box>
        </Section>
    )
}
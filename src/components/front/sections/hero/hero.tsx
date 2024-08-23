import { Box, Stack, Typography, useTheme } from "@mui/material";
import Section from "../section";
import { SectionName } from "../../constants";
import HeroBackground from "./metaballs/heroBackground";


export default function Hero(){
    const theme = useTheme()
    const size = 450
    return(
        <Section style={{height: "100%", position:"relative"}} id={SectionName.hero}>
            <Box sx={{
                display:"flex", 
                justifyContent:"center", 
                alignItems:"center", 
                flexDirection:"column",
                height:"100%"
            }}>
                {/* <Box sx={{position:"relative"}}>
                    <HeroBackground width={size} height={size} theme={theme}/>       
                </Box> */}
                <Stack gap={4}>
                    <Typography textAlign="center" variant="h3">{`Hi 👋 I'm Andrius`}</Typography>
                    <Stack sx={{maxWidth:"70ch"}}>
                        <Typography textAlign="center" variant="h5" sx={{lineHeight:1.8}}>
                            {`I create applications that look beautiful at the front...`}
                        </Typography>
                        <Typography textAlign="center" variant="h5" sx={{lineHeight:1.8}}>
                            {`...and make sense at the back`}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Section>
    )
}
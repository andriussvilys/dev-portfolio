import { Box, SimplePaletteColorOptions, Stack, Toolbar, Typography } from "@mui/material";
import Section from "./section";
import { SectionName } from "../constants";
import {useTheme} from '../../../lib/theming/theme'

export default function Hero(){
    const {theme} = useTheme()
    return(
        <Section style={{height: "100%"}} id={SectionName.hero}>
            <Toolbar />
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>
                <Stack>
                    <Typography variant="h3">Welcome to my portfolio</Typography>
                    <Typography variant="h6">{`I'm a full stack developer`}</Typography>
                </Stack>
                <Box sx={{m:2, width:"20vw", height:"20vw", bgcolor:(theme.palette?.primary as SimplePaletteColorOptions)?.main}} borderRadius="100%">
                </Box>
            </Box>
        </Section>
    )
}
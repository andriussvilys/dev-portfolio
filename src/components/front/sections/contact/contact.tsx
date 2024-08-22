import { Box, Card, Divider, Stack, Typography, useTheme } from "@mui/material";
import Section from "../section";
import { SectionName } from "../../constants";
import ContactForm from "./contactForm";

export default function Contact(){
    const theme = useTheme()
    return(
        <Section 
            headline={SectionName.contact} 
            id={SectionName.contact}
            style={{gap:4}}
        >
            <Card sx={{
                border:"1px solid",
                borderColor: theme.palette.divider,
                boxShadow:4,
                justifyContent:"center",
                width:"60ch",
                maxWidth:"60ch",
                [theme.breakpoints.down("md")]:{
                    minWidth:"35ch",
                    width:1,
                },
                }}>
                <Stack sx={{p:2}} gap={2}>
                    <Box sx={{display:"flex", alignItems:"center"}}>
                        <Typography variant="h4" align="left">📎</Typography>
                        <Typography variant="overline" align="left">Drop me a message</Typography>
                    </Box>
                    <ContactForm/>
                </Stack>
            </Card>
        </Section>
    )
}
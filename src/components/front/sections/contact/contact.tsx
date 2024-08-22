import { Box, Card, Stack, Typography, useTheme } from "@mui/material";
import Section from "../section";
import { SectionName } from "../../constants";
import ContactForm from "./contactForm";

export default function Contact(){
    const theme = useTheme()
    return(
        <Section 
            headline={SectionName.contact} 
            id={SectionName.contact} 
            style={{
                height:"100vh"
            }}
        >
            <Stack sx={{flex:1, justifyContent:"center"}}>
                <Card sx={{
                    border:"1px solid",
                    borderColor: theme.palette.divider,
                    boxShadow:4
                    }}>
                    <Stack sx={{p:2}} gap={2}>
                        <Box sx={{display:"flex", alignItems:"center"}}>
                            <Typography variant="h4" align="left">🐸</Typography>
                            <Typography variant="overline" align="left">Drop me a message</Typography>
                        </Box>
                        <ContactForm/>
                    </Stack>
                </Card>
            </Stack>
        </Section>
    )
}
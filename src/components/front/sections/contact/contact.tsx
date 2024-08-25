import { Box, Card, Stack, Theme, Typography } from "@mui/material";
import Section from "../section";
import { SectionName } from "../../constants";
import ContactForm from "./contactForm";
import Socials from "./socials";

export default function Contact({theme}:{theme:Theme}){
    return(
        <Section 
            headline={SectionName.contact} 
            id={SectionName.contact}
            style={{gap:4}}
        >
            <Stack sx={{
                    flex:1, 
                    justifyContent:"center", 
                    alignItems:"center", 
                    width:1 
                }}
                gap={4}
            >
                <Socials theme={theme}/>
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
            </Stack>
        </Section>
    )
}
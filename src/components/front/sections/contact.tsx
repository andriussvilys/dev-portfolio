import { Typography } from "@mui/material";
import Section from "./section";
import { sections } from "../constants";

export default function Contact(){
    return(
        <Section headline={sections.contact.name} id={sections.contact.id}>
            <Typography>HELLO</Typography>
        </Section>
    )
}
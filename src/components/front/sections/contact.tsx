import { Typography } from "@mui/material";
import Section from "./section";
import { SectionName, sections } from "../constants";

export default function Contact(){
    return(
        <Section headline={SectionName.contact} id={SectionName.contact} style={{height:"100vh"}}>
            <Typography>HELLO</Typography>
        </Section>
    )
}
import { SectionName, sections } from "../constants";
import Section from "./section";

export default function About(){
    return(
        <Section headline={SectionName.about} id={SectionName.about}>
        </Section>
    )
}
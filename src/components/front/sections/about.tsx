import { sections } from "../constants";
import Section from "./section";

export default function About(){
    return(
        <Section headline={sections.about.name} id={sections.about.id}>
        </Section>
    )
}
enum SectionName {
    hero = "hero",
    projects = "projects",
    skills = "skills",
    about = "about",
    contact = "contact",
}

interface Section{
    name: SectionName,
    id:string,
}

const sections:{[key:string]:Section} = {
    [SectionName.hero]: {name: SectionName.hero, id: `#${SectionName.hero}`},
    [SectionName.about]: {name: SectionName.about, id: `#${SectionName.about}`},
    [SectionName.skills]: {name: SectionName.skills, id: `#${SectionName.skills}`},
    [SectionName.projects]: {name: SectionName.projects, id: `#${SectionName.projects}`},
    [SectionName.contact]: {name: SectionName.contact, id: `#${SectionName.contact}`},
}

const navLinks:Section[] = [
    {name: SectionName.about, id: `#${SectionName.about}`},
    {name: SectionName.skills, id: `#${SectionName.skills}`},	
    {name: SectionName.projects, id: `#${SectionName.projects}`},	
    {name: SectionName.contact, id: `#${SectionName.contact}`}, 
]

export { sections, navLinks, SectionName }
import { grey } from "@mui/material/colors"
import { HasId } from "./commons"
import { StorageFile } from "./fileUpload"

enum category {
    frontEnd = "Front End",
    backEnd = "Back End",
    languages = "Programming Languages",
    other = "Other",
    databases = "Databases",
}

enum TagBackground {
    NONE = "none",
    LIGHT = "light",
    DARK = "dark",
}

const TagBackgroundColorMap:{[key in TagBackground]:string} = {
    [TagBackground.NONE]: "rgba(0,0,0,0)",
    [TagBackground.LIGHT]: grey[200],
    [TagBackground.DARK]: "#121212",
}

const TagBackgroundOptions = [TagBackground.NONE, TagBackground.LIGHT, TagBackground.DARK]

const categories = [category.languages, category.frontEnd, category.databases, category.backEnd, category.other]

interface TagInput{
    file: StorageFile,
    name: string,
    category: string,
    categoryIndex: number,
    background?: TagBackground
}

interface TagRecord extends TagInput, HasId{}

interface TagFormInput{ 
    file: File | StorageFile,
    name: string,
    category: string,
    categoryIndex: number,
    background: TagBackground
}

export {categories, category, TagBackground, TagBackgroundOptions, TagBackgroundColorMap}
export type {TagRecord, TagInput, TagFormInput}
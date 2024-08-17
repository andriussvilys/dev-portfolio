import { StorageFile } from "./fileUpload"

enum category {
    frontEnd = "Front End",
    backEnd = "Back End",
    languages = "Programming Languages",
    other = "Other",
    databases = "Databases",
}

const categories = [category.languages, category.frontEnd, category.databases, category.backEnd, category.other]

interface TagInput{
    file: StorageFile,
    name: string,
    category: string,
    categoryIndex: number
}

interface TagRecord extends TagInput{
    _id: string
}

interface TagFormInput{ 
    file: File | StorageFile,
    name: string,
    category: string,
    categoryIndex: number
}

export {categories, category}
export type {TagRecord, TagInput, TagFormInput}
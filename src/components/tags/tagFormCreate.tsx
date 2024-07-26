import { upload } from "@/src/lib/storage";
import TagForm from "./tagForm";

interface TagFormCreateProps{
    categories: string[]
}

export default function TagFormCreate({categories}:TagFormCreateProps){
    return(
        <TagForm categories={categories} onSubmit={upload}/>
    )
}
import { upload } from "@/src/lib/storage";
import TagForm from "./tagForm";

export default function TagFormCreate(){
    return(
        <TagForm onSubmit={upload}/>
    )
}
import PostFormCreate from "@/src/components/posts/form/postFormCreate";
import { Tag } from "@/src/lib/definitions/tags";
import { getURL } from "@/src/lib/storage";
import { listTags } from "@/src/lib/tags";
import { Container } from "@mui/material";

export default async function CreatePost(){
    const tags = (await listTags()).items
    return(
        <Container sx={{
            height:"100%", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 2,
          }}>
            <PostFormCreate tags={tags}/>
        </Container>
    )
}
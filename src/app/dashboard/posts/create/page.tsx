import { listTags } from "@/src/app/api/data/tags/utils";
import PostFormCreate from "@/src/components/posts/form/postFormCreate";
import { Container } from "@mui/material";

export default async function CreatePost(){
    const tagsQuery = await listTags({})
    const tags = (await tagsQuery.json()).items
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
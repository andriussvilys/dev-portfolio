import PostFormCreate from "@/src/components/posts/postFormCreate";
import { Container } from "@mui/material";

export default function CreatePost(){
    return(
        <Container sx={{
            height:"100%", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 2
          }}>
            <PostFormCreate/>
        </Container>
    )
}
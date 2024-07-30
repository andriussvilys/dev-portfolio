import PostFormCreate from "@/src/components/posts/postFormCreate";
import { Card, Container } from "@mui/material";

export default function CreatePost(){
    return(
        <Container sx={{
            height:"100%", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 2
          }}>
            <Card sx={{p: 2, m:1, display:"flex", justifyContent:"center"}}>
                <PostFormCreate/>
            </Card>
        </Container>
    )
}
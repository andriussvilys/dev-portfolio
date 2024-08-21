import SortPosts from "@/src/components/posts/sort/sortPosts";
import { defaultPaging } from "@/src/lib/definitions/pages";
import { listPosts } from "@/src/lib/posts";
import { Container } from "@mui/material";

export default async function SortPostsPage() {
    const posts = (await listPosts(defaultPaging)).items

    return (
        <Container sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100%", 
            overflow:"auto"
        }}>
            <SortPosts 
                items={posts}
            />
        </Container>
    )
}
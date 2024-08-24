import { listPosts } from "@/src/app/api/data/posts/utils";
import SortPosts from "@/src/components/posts/sort/sortPosts";
import { Container } from "@mui/material";

export default async function SortPostsPage() {
    const postsResonse = await listPosts({})
    const responseData = await postsResonse.json()
    const posts = responseData.items
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
import { listPosts } from "@/src/app/api/data/posts/utils";
import SortPosts from "@/src/components/posts/sort/sortPosts";
import { Container } from "@mui/material";
import DashboardPage from "@/src/components/dashboard/dashboardPage/dashboardPage";
import { PageName } from "@/src/components/dashboard/constants";

export default async function SortPostsPage() {
    const postsResonse = await listPosts({})
    const responseData = await postsResonse.json()
    const posts = responseData.items
    return (
        <DashboardPage 
            name={PageName.POSTS_SORT}
            breadcrumbs={[{name:PageName.POSTS_OVERVIEW, href:"/dashboard/posts"}]}    
        >
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
        </DashboardPage>
    )
}
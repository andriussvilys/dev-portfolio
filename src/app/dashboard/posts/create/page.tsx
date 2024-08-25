import { listTags } from "@/src/app/api/data/tags/utils";
import PostFormCreate from "@/src/components/posts/form/postFormCreate";
import { Container } from "@mui/material";
import DashboardPage from "@/src/components/dashboard/dashboardPage/dashboardPage";
import { PageName } from "@/src/components/dashboard/constants";

export default async function CreatePost(){
    const tagsQuery = await listTags({})
    const tags = (await tagsQuery.json()).items
    return(
        <DashboardPage name={PageName.POSTS_CREATE}>
            <Container sx={{
                height:"100%", 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pt: 2,
            }}>
                <PostFormCreate tags={tags}/>
            </Container>
        </DashboardPage>
    )
}
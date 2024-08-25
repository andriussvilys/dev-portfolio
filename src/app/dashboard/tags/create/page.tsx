import { Card, Container } from "@mui/material"
import TagFormCreate from "@/src/components/tags/tagFormCreate"
import { listCategories } from "@/src/app/api/data/tags/utils"
import Dashboard from "../../page"
import DashboardPage from "@/src/components/dashboard/dashboardPage/dashboardPage"
import { PageName } from "@/src/components/dashboard/constants"

export default async function Page(){
    const categoriesQuery = await listCategories()
    const categories = await categoriesQuery.json()
    return(
      <DashboardPage name={PageName.TAGS_CREATE}>
        <Container sx={{
            height:"100%", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 2
          }}>
            <Card sx={{p: 2, m:1, display:"flex", justifyContent:"center"}}>
              <TagFormCreate categories={categories}/>
            </Card>
        </Container>
      </DashboardPage>
    )
}
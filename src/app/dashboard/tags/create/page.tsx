import {getCategories, upload} from "@/src/lib/tags"
import { Card, Container } from "@mui/material"
import TagFormCreate from "@/src/components/tags/tagFormCreate"

export default async function Page(){
    const categories = await getCategories()
    return(
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
    )
}
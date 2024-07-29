import {getCategories, upload} from "@/src/lib/tags"
import { Container } from "@mui/material"
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
          <TagFormCreate categories={categories}/>
      </Container>
    )
}
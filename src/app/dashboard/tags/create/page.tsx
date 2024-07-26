"use client"
import {upload} from "@/src/lib/tags"
import TagForm from "@/src/components/tags/tagForm"
import { Container } from "@mui/material"

export default function Page(){
    const onSubmit = async (formData: FormData) => {
      try{
        await upload(formData)
      }
      catch(err){
        console.error(err)
        throw err
      }
    }
    return(
      <Container sx={{
          height:"100%", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 2
        }}>
          <TagForm onSubmit={upload}/>
      </Container>
    )
}
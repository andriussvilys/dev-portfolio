"use client"
import {upload} from "@/src/lib/tags"
import TagForm from "@/src/components/tags/tagForm"

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
      <TagForm onSubmit={upload}/>
    )
}
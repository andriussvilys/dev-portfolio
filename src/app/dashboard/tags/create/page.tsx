"use client"
import {upload} from "@/src/lib/tags"
import TagForm from "@/src/components/tags/tagForm"

export default function Page(){
    return(
      <TagForm onSubmit={upload}/>
    )
}
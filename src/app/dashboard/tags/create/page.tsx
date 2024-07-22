"use client"
import { usePathname } from "next/navigation"
import { FormEvent, useState } from "react"
import {upload} from "@/src/lib/tags"
import TagForm from "@/src/components/tags/tagForm"

export default function Page(){
    return(
      <TagForm onSubmit={upload}/>
    )
}
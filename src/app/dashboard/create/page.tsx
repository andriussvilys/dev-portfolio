"use client"
import { usePathname } from "next/navigation"
import { FormEvent, useState } from "react"

export default function Page(){
    const [file, setFile] = useState<File | null>()
    const pathName = usePathname()
    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData()
        if(file){
            formData.append("file", file)
            formData.append("name", file.name)
    
            const response = await fetch('/api/s3', {
                method: 'POST',
                body: formData,
              })
              const data = await response.json()
              window.location.reload()
        }
        else{
            throw new Error("No file selected")
        }
    }
    return(
        <>
            <p>{pathName}</p>
            <form onSubmit={e => handleSubmit(e)}>
                <label htmlFor="fileInput"/>
                <input id="fileInput" type="file" onChange={e => {setFile(e.target.files && e.target.files[0])}}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
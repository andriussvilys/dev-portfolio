"use client"
import { usePathname } from "next/navigation"
import { FormEvent, useState } from "react"

export default function Page(){
    const [file, setFile] = useState<File | null>()
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const pathName = usePathname()
    const onFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]
        if(file){
            setFile(file)
            setName(file.name)
        }
    }
    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData()
        if(file){
            formData.append("file", file)
            formData.append("name", name)
    
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
                <input id="fileInput" type="file" onChange={e => onFileChange(e)}/>
                <label htmlFor="nameInput"/>
                <input id="nameInput" type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)}/>
                <label htmlFor="descriptionInput"/>
                <input id="descriptionInput" type="text" placeholder="description" value={description} onChange={e => setDescription(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
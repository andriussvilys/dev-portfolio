"use client"

import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"

interface TagFormProps {
    onSubmit: (formData: FormData) => Promise<any>,
    tagData?: Tag
}

interface FileMetadata {
    width: number,
    height: number
}

export default function TagForm({onSubmit, tagData}: TagFormProps){
    const [file, setFile] = useState<File | null>()
    const [name, setName] = useState<string>("")
    const [metadata, setMetadata] = useState<FileMetadata | null>()
    const [imageSrc, setImageSrc] = useState<string>("")

    useEffect(() => {
        if(tagData){
            setName(tagData.name)
            setMetadata(tagData.metadata)
            setImageSrc(tagData.url ?? "")
        }
    }, [tagData])

    const onFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]

        if(file){
            setFile(file)
            setName(file.name)
            setImageSrc(URL.createObjectURL(file))
        }
    }
    const onImageLoad = (img:HTMLImageElement) => {
        setMetadata({width: img.naturalWidth, height: img.naturalHeight})
    }

    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData()
        if(file){
            formData.append("metadata", JSON.stringify(metadata))
            formData.append("file", file)
            formData.append("name", name)
            formData.append("key", file.name)

            console.log("formData",formData)
    
            await onSubmit(formData)
            window.location.reload()
        }
        else{
            throw new Error("No file selected")
        }
    }


    return(
        <>
            <div style={{height: 100, width: 100, padding: 10, border: "1px solid black"}}>
                {!!imageSrc ? <Image src={imageSrc} height={100} width={100} alt={name} onLoad={(e) => {onImageLoad(e.target as HTMLImageElement)}}/> : null}
            </div>
            <form onSubmit={e => handleSubmit(e)}>
                <label htmlFor="fileInput"/>
                <input id="fileInput" type="file" onChange={e => onFileChange(e)}/>
                <label htmlFor="nameInput"/>
                <input id="nameInput" type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export type {TagFormProps}
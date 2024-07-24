"use client"

import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import { createKey } from "@/src/lib/storage"

interface TagFormProps {
    onSubmit: (formData: FormData, id?: string) => Promise<any>,
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
        console.log("File change")
        const inputFile = event.target.files && event.target.files[0]

        if(inputFile){
            setFile(inputFile)
            setName(inputFile.name)
            setImageSrc(URL.createObjectURL(inputFile))
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
            formData.append("key", createKey(file))
            formData.append("file", file)
        }
        formData.append("name", name)

        try{
            await onSubmit(formData)
        }
        catch(err){
            return err
        }
        // window.location.reload()
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
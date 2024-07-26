"use client"

import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import { createKey } from "@/src/lib/storage"
import type { Tag } from "@/src/lib/data/tags"
import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material"
import DeleteButton from "./deleteButton"

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
    const [category, setCategory] = useState<string>("")

    useEffect(() => {
        if(tagData){
            setName(tagData.name)
            setMetadata(tagData.metadata)
            setImageSrc(tagData.url ?? "")
        }
    }, [tagData])

    const onFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
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
            throw err
        }
        // window.location.reload()
    }


    return(
        <Box component="form" onSubmit={e => handleSubmit(e)} sx={{display:"flex", flexWrap:"wrap", justifyContent:"center"}} gap={2}>
            <Box sx={{height: 100, width: 100, padding: 1, border: "1px solid grey", borderRadius: 2}}>
                {!!imageSrc ? <Image src={imageSrc} height={100} width={100} alt={name} onLoad={(e) => {onImageLoad(e.target as HTMLImageElement)}}/> : null}
            </Box>
            <Stack gap={2}>
                <TextField size="small" InputLabelProps={{shrink:true}} label="select file" type="file" id="new-file" variant="outlined" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFileChange(e)}/>
                <TextField size="small" InputLabelProps={{shrink:true}} label="name" variant="outlined" value={name} onChange={e => setName(e.target.value)}/>
                <Autocomplete
                    freeSolo
                    options={options.map((option) => option)}
                    value={category}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        size="small"
                        InputLabelProps={{shrink:true}}
                        label="category"
                        InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        value: category,
                        }}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    )}
                    onChange={(e, value) => setCategory(value ?? "")}
                />
                <Box sx={{alignSelf:"end", display:"flex"}} gap={2}>
                    <Button sx={{alignSelf:"end"}} variant="contained" type="submit">Submit</Button>
                    {tagData?._id ? <DeleteButton disabled={false} _id={tagData._id}/> : null}
                </Box>
            </Stack>
        </Box>
    )
}

const options = ["option1", "option2", "option3"]

export type {TagFormProps}
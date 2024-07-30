"use client"

import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import { createKey } from "@/src/lib/storage"
import { Autocomplete, Box, Button, Divider, Stack, TextField } from "@mui/material"
import DeleteButton from "./deleteButton"
import { Tag, TagMetadata } from "@/src/lib/definitions/tags"
import FileUpload from "../fileUpload"

interface TagFormProps {
    onSubmit: (formData: FormData, id?: string) => Promise<any>,
    tagData?: Tag
    categories: string[]
}

export default function TagForm({onSubmit, tagData, categories}: TagFormProps){
    const [file, setFile] = useState<File | null>()
    const [name, setName] = useState<string>("")
    const [metadata, setMetadata] = useState<TagMetadata | null>()
    const [imageSrc, setImageSrc] = useState<string>("")
    const [category, setCategory] = useState<string>("")

    useEffect(() => {
        if(tagData){
            setName(tagData.name)
            setMetadata(tagData.metadata)
            setImageSrc(tagData.url ?? "")
            setCategory(tagData.category ?? "")
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
        formData.append("category", category)
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
            <Stack gap={2}>
                <Box sx={{display:"flex"}} gap={2}>
                    <FileUpload setFile={setFile} setMetadata={setMetadata} fileSrc={imageSrc}/>
                    <Divider orientation="vertical"/>
                    <Stack gap={2}>
                        <TextField size="small" InputLabelProps={{shrink:true}} label="name" variant="outlined" value={name} onChange={e => setName(e.target.value)}/>
                        <Autocomplete
                            freeSolo
                            options={categories.map((option) => option)}
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
                    </Stack>
                </Box>
                <Divider/>
                <Box sx={{alignSelf:"end", display:"flex"}} gap={2}>
                    <Button sx={{alignSelf:"end"}} variant="contained" type="submit">Submit</Button>
                    {tagData?._id ? <DeleteButton disabled={false} _id={tagData._id}/> : null}
                </Box>
            </Stack>
        </Box>
    )
}

export type {TagFormProps}
"use client"

import { Box, Button, Divider, Stack, TextField } from "@mui/material"
import DeleteButton from "./deleteButton"
import { TagRecord, TagFormInput } from "@/src/lib/definitions/tags"
import FileUploadField from "../fileUpload/fileUploadField"
import { useForm} from "react-hook-form"
import ControlledSelect from "./ControlledSelect"
import { useState } from "react"
import LoadingBackdrop from "../loading/backdrop/loadingBackdrop"

interface TagFormProps {
    onSubmit: (inputs: TagFormInput) => Promise<any>,
    tag?: TagRecord
    categories: string[]
}

export default function TagForm(props: TagFormProps){
    const {tag, categories} = props
    const [loading, setLoading] = useState(false)
    
    const {register, handleSubmit, setValue, control} = useForm<TagFormInput>({
        defaultValues: {
            category: tag?.category ?? "",
            categoryIndex: tag?.categoryIndex ?? Number.MAX_SAFE_INTEGER
        }
    })
    const initialData = tag ? {key: tag.file.key, url:tag.file.url!, metadata: tag.file.metadata} : undefined

    const loadingSubmit = async (inputs: TagFormInput) => {
        try{
            setLoading(true)
            await props.onSubmit(inputs)
            location.reload()
        }
        catch(e){
            throw e
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <>
        <LoadingBackdrop open={loading}/>
        <Box component="form" onSubmit={handleSubmit(loadingSubmit)} sx={{display:"flex", flexWrap:"wrap", justifyContent:"center"}} gap={2}>
            <Stack gap={2}>
                <Box sx={{display:"flex"}} gap={2}>
                    <FileUploadField initialData={initialData} fieldName="file" setValue={setValue}/>
                    <Divider orientation="vertical"/>
                    <Stack gap={2}>
                        <TextField 
                            size="small" 
                            InputLabelProps={{shrink:true}} 
                            label="name" 
                            variant="outlined"
                            defaultValue={props.tag?.name}
                            {...register("name")}
                        />
                        <ControlledSelect 
                            control={control}
                        />
                    </Stack>
                </Box>
                <Divider/>
                <Box sx={{alignSelf:"end", display:"flex"}} gap={2}>
                    <Button sx={{alignSelf:"end"}} variant="contained" type="submit">Submit</Button>
                    {tag?._id ? <DeleteButton disabled={false} _id={tag._id}/> : null}
                </Box>
            </Stack>
        </Box>
        </>
    )
}

export type {TagFormProps}
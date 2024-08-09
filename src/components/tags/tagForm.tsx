"use client"

import { Box, Button, Divider, Stack, TextField } from "@mui/material"
import DeleteButton from "./deleteButton"
import { TagRecord, TagFormInput } from "@/src/lib/definitions/tags"
import FileUploadField from "../fileUpload/fileUploadField"
import { useForm} from "react-hook-form"
import ControlledSelect from "./ControlledSelect"

interface TagFormProps {
    onSubmit: (inputs: TagFormInput) => Promise<any>,
    tag?: TagRecord
    categories: string[]
}

export default function TagForm(props: TagFormProps){
    const {tag, categories} = props
    
    const {register, handleSubmit, watch, setValue, control} = useForm<TagFormInput>({
        defaultValues: {
            category: tag?.category ?? "",
        }
    })
    const initialData = tag ? {key: tag.file.key, url:tag.file.url!, metadata: tag.file.metadata} : undefined

    return(
        <Box component="form" onSubmit={handleSubmit(props.onSubmit)} sx={{display:"flex", flexWrap:"wrap", justifyContent:"center"}} gap={2}>
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
                            options={categories}
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
    )
}

export type {TagFormProps}
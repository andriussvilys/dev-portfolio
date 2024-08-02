"use client"

import { Box, Button, Divider, Stack, TextField } from "@mui/material"
import DeleteButton from "./deleteButton"
import { Tag, TagFormInput } from "@/src/lib/definitions/tags"
import FileUploadField from "../fileUpload/fileUploadField"
import { useForm} from "react-hook-form"
import ControlledSelect from "./ControlledSelect"

interface TagFormProps {
    onSubmit: (inputs: TagFormInput) => Promise<any>,
    tagData?: Tag
    categories: string[]
}

export default function TagForm(props: TagFormProps){
    const {tagData, categories} = props
    const {register, handleSubmit, watch, setValue, control} = useForm<TagFormInput>({
        defaultValues: {
            category: tagData?.category ?? "",
        }
    })

    return(
        <Box component="form" onSubmit={handleSubmit(props.onSubmit)} sx={{display:"flex", flexWrap:"wrap", justifyContent:"center"}} gap={2}>
            <Stack gap={2}>
                <Box sx={{display:"flex"}} gap={2}>
                    <FileUploadField register={register} watch={watch} setValue={setValue} src={props.tagData?.url} fieldName={"file"}/>
                    <Divider orientation="vertical"/>
                    <Stack gap={2}>
                        <TextField 
                            size="small" 
                            InputLabelProps={{shrink:true}} 
                            label="name" 
                            variant="outlined"
                            defaultValue={props.tagData?.name}
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
                    {tagData?._id ? <DeleteButton disabled={false} _id={tagData._id}/> : null}
                </Box>
            </Stack>
        </Box>
    )
}

export type {TagFormProps}
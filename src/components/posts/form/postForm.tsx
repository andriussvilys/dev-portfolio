"use client"

import { Post, PostFormInput } from "@/src/lib/definitions/posts"
import { Box, Button, Card } from "@mui/material"
import { useState } from "react"
import FormStepper from "./components/formStepper"
import { useFieldArray, useForm, UseFormRegister } from "react-hook-form"
import BasicInfo from "./components/basicInfo"
import { Tag } from "@/src/lib/definitions/tags"
import TagSelect from "./components/tagSelect"
import MultiFileUpload from "../../fileUpload/multiFileUpload"

interface PostFormProps {
    onSubmit: (input: PostFormInput) => Promise<any>,
    tags: Tag[],
    initialData?: Post
}

const switchForm = (
        activeStep: number, 
        register: UseFormRegister<PostFormInput>, 
        tags:Tag[],
        setValue: any,
        fields: any, 
        append: any, 
        remove: any,
        control: any,
        storageFiles:any,
        removeStorageFile:any,
        initialData?: Post,
    ) => {
        switch(activeStep){
            case 0:
                return <BasicInfo register={register}/>
            case 1:
                return <MultiFileUpload 
                            setValue={setValue} 
                            fieldName={"fileDataList"} 
                            fields={fields} 
                            append={append} 
                            remove={remove}
                            storageFiles={storageFiles}
                            removeStorageFile={removeStorageFile}
                        />
            case 2:
                return <TagSelect control={control} selected={initialData?.tags} register={register} tags={tags}/>
            default: return null
        }
}

export default function PostForm(props: PostFormProps){
    const {initialData} = props
    const {register, handleSubmit, setValue, control, formState:{dirtyFields}} = useForm<PostFormInput>({
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            liveSite: initialData?.liveSite || "",
            github: initialData?.github || "",
            tags: initialData?.tags || [],
            files: [{}],
            storageFiles: initialData?.files || []
        }
    })
    const { fields:newFiles, append:appendFile, remove:removeFile } = useFieldArray({
        control,
        name: "files"
    });
    const { fields:storageFiles, remove:removeStorageFile } = useFieldArray({
        control,
        name: "storageFiles"
    });
    const [activeStep, setActiveStep] = useState(0);
    const steps = ["Basic Info", "Media", "Tags"]

    return(
        <Box 
            component="form" 
            onSubmit={handleSubmit(props.onSubmit)} 
            sx={{
                height:"100%", 
                width:"100%", 
                display:"flex", 
                flexWrap:"wrap", 
                justifyContent:"center",
                overflow:"hidden"
            }} gap={2}
        >
            <FormStepper 
                steps={steps} 
                activeStep={activeStep} 
                setActiveStep={setActiveStep}
            >
                <Card sx={{flex:1, p: 2, m:1, display:"flex", justifyContent:"center", overflow:"auto"}}>
                    {switchForm(activeStep, register, props.tags, setValue, newFiles, appendFile, removeFile, control, storageFiles,
removeStorageFile, initialData)}
                </Card>
            <Button sx={{alignSelf:"end"}} variant="contained" type="submit">Submit</Button>
            </FormStepper>
        </Box>
    )
}

export type {PostFormProps}
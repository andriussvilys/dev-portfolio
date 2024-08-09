"use client"

import { Post, PostFormInput } from "@/src/lib/definitions/posts"
import { Box, Button, Card } from "@mui/material"
import { useState } from "react"
import FormStepper from "./components/formStepper"
import { useFieldArray, useForm, UseFormRegister } from "react-hook-form"
import BasicInfo from "./components/basicInfo"
import { TagRecord } from "@/src/lib/definitions/tags"
import TagSelect from "./components/tagSelect"
import MultiFileUpload from "../../fileUpload/multiFileUpload"
import LoadingBackdrop from "../../loading/backdrop/loadingBackdrop"

interface PostFormProps {
    onSubmit: (input: PostFormInput) => Promise<any>,
    tags: TagRecord[],
    initialData?: Post
}

const switchForm = (
        activeStep: number, 
        register: UseFormRegister<PostFormInput>, 
        tags:TagRecord[],
        setValue: any,
        newFiles: any, 
        append: any, 
        remove: any,
        storageFiles:any,
        removeStorageFile:any,
        watch:any,
    ) => {
        switch(activeStep){
            case 0:
                return <BasicInfo register={register}/>
            case 1:
                return <MultiFileUpload 
                            setValue={setValue} 
                            fieldName={"files"} 
                            newFiles={newFiles} 
                            append={append} 
                            remove={remove}
                            storageFiles={storageFiles}
                            removeStorageFile={removeStorageFile}
                            watch={watch}
                        />
            case 2:
                return <TagSelect register={register} tags={tags}/>
            default: return null
        }
}

export default function PostForm(props: PostFormProps){
    const {initialData} = props
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit, setValue, control, watch, formState:{dirtyFields}} = useForm<PostFormInput>({
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
    const { fields, append:appendFile, remove:removeFile } = useFieldArray({
        control,
        name: "files"
    });
    const { fields:storageFiles, remove:removeStorageFile } = useFieldArray({
        control,
        name: "storageFiles"
    });
    const [activeStep, setActiveStep] = useState(0);
    const steps = ["Basic Info", "Media", "Tags"]

    const loadingSubmit = async (inputs: PostFormInput) => {
        setLoading(true)
        await props.onSubmit(inputs)
        location.reload()
        setLoading(false)
    }

    return(
        <>
            <LoadingBackdrop open={loading}/>
            <Box 
                component="form" 
                onSubmit={handleSubmit(loadingSubmit)} 
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
                        {
                        switchForm(
                            activeStep,
                            register,
                            props.tags,
                            setValue,
                            fields,
                            appendFile,
                            removeFile,
                            storageFiles,
                            removeStorageFile,
                            watch,
                        )}
                    </Card>
                <Button sx={{alignSelf:"end"}} variant="contained" type="submit">Submit</Button>
                </FormStepper>
            </Box>
        </>
    )
}

export type {PostFormProps}
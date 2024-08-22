"use client"

import { PostRecord, PostFormInput } from "@/src/lib/definitions/posts"
import { Box, Button, Card } from "@mui/material"
import { useState } from "react"
import FormStepper from "./components/formStepper"
import { FormProvider, useForm } from "react-hook-form"
import BasicInfo from "./components/basicInfo"
import { TagRecord } from "@/src/lib/definitions/tags"
import TagSelect from "./components/tagSelect"
import MultiFileUpload from "../../fileUpload/multiFileUpload"
import LoadingBackdrop from "../../loading/backdrop/loadingBackdrop"

interface PostFormProps {
    onSubmit: (input: PostFormInput) => Promise<any>,
    tags: TagRecord[],
    initialData?: PostRecord
}

const switchForm = (
        activeStep: number, 
        tags:TagRecord[]
    ) => {
        switch(activeStep){
            case 0:
                return <BasicInfo/>
            case 1:
                return <MultiFileUpload/>
            case 2:
                return <TagSelect tags={tags}/>
            default: return null
        }
}

export default function PostForm(props: PostFormProps){
    const {initialData} = props
    const [loading, setLoading] = useState(false)
    const formMethods = useForm<PostFormInput>({
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            liveSite: initialData?.liveSite || "",
            github: initialData?.github || "",
            tags: initialData?.tags || [],
            files: [{}],
            storageFiles: initialData?.files || [],
            order: initialData?.order || 0,
        }
    })
    const {handleSubmit, watch} = formMethods

    const [activeStep, setActiveStep] = useState(0);
    const steps = ["Basic Info", "Media", "Tags"]

    const loadingSubmit = async (inputs: PostFormInput) => {
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
            <FormProvider {...formMethods}>
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
                                props.tags
                            )}
                        </Card>
                    <Button sx={{alignSelf:"end"}} variant="contained" type="submit">Submit</Button>
                    </FormStepper>
                </Box>
            </FormProvider>

        </>
    )
}

export type {PostFormProps}
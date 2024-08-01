"use client"

import { Post, PostFormData } from "@/src/lib/definitions/posts"
import { Box, Button, Card, Container, Stack, TextField } from "@mui/material"
import { useState } from "react"
import FormStepper from "./formStepper"
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form"
import BasicInfo from "./basicInfo"
import MediaForm from "./mediaForm"
import { Tag } from "@/src/lib/definitions/tags"
import TagSelect from "./tagSelect"
import { FileMetadata } from "@/src/lib/definitions/fileUpload"

interface PostFormProps {
    onSubmit: (formData: FormData, id?: string) => Promise<any>,
    tags: Tag[],
    postData?: Post
}

const switchForm = (
        activeStep: number, 
        register: UseFormRegister<PostFormData>, 
        tags:Tag[],
    ) => {
        switch(activeStep){
            case 0:
                return <BasicInfo register={register}/>
            case 1:
                return <MediaForm register={register} setFile={function (file: File): void {
                    throw new Error("Function not implemented.")
                } } setMetadata={function (metadata: FileMetadata): void {
                    throw new Error("Function not implemented.")
                } }/>
            case 2:
                return <TagSelect register={register} tags={tags}/>
            default: return null
        }
}

export default function PostForm(props: PostFormProps){

    const {register, handleSubmit} = useForm<PostFormData>()

    const [activeStep, setActiveStep] = useState(0);

    const onSubmit: SubmitHandler<PostFormData> = (data) => {
        console.log(data)
        //     event.preventDefault()
        //     const formData = new FormData()

        //     formData.append("name", name)
        //     formData.append("description", description)
        //     formData.append("liveSite", liveSite)
        //     formData.append("github", github)

        //     try{
        //         await onSubmit(formData)
        //     }
        //     catch(err){
        //         throw err
        //     }
        //     // window.location.reload()
        // }
    }

    // const watched = watch()

    const steps = ["Basic Info", "Media", "Tags"]

    return(
            <Box 
                component="form" 
                onSubmit={handleSubmit(onSubmit)} 
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
                    <Card sx={{flex:1, p: 2, m:1, display:"flex", justifyContent:"center"}}>
                        {switchForm(activeStep, register, props.tags)}
                    </Card>
                </FormStepper>
                <Button sx={{alignSelf:"end"}} variant="contained" type="submit">Submit</Button>
            </Box>
    )
}
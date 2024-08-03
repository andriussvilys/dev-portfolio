"use client"

import { Post, PostFormInput } from "@/src/lib/definitions/posts"
import { Box, Button, Card } from "@mui/material"
import { useState } from "react"
import FormStepper from "./formStepper"
import { useFieldArray, useForm, UseFormRegister } from "react-hook-form"
import BasicInfo from "./basicInfo"
import { Tag } from "@/src/lib/definitions/tags"
import TagSelect from "./tagSelect"
import MultiFileUpload from "../fileUpload/multiFileUpload"

interface PostFormProps {
    onSubmit: (input: PostFormInput) => Promise<any>,
    tags: Tag[],
    postData?: Post
}

const switchForm = (
        activeStep: number, 
        register: UseFormRegister<PostFormInput>, 
        tags:Tag[],
        setValue: any,
        fields: any, 
        append: any, 
        remove: any
    ) => {
        switch(activeStep){
            case 0:
                return <BasicInfo register={register}/>
            case 1:
                return <MultiFileUpload setValue={setValue} fieldName={"fileDataList"} fields={fields} append={append} remove={remove} register={register}/>
            case 2:
                return <TagSelect register={register} tags={tags}/>
            default: return null
        }
}

export default function PostForm(props: PostFormProps){

    const {register, handleSubmit, setValue, control, formState:{dirtyFields}} = useForm<PostFormInput>({
        defaultValues: {
            // name: "",
            fileDataList: [{}],
        }
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: "fileDataList"
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
                        {switchForm(activeStep, register, props.tags, setValue, fields, append, remove)}
                    </Card>
                <Button sx={{alignSelf:"end"}} variant="contained" type="submit">Submit</Button>
                </FormStepper>
            </Box>
    )
}
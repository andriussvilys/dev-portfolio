import { Post, PostFormData } from "@/src/lib/definitions/posts"
import { Box, Button, Card, Container, Stack, TextField } from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import FormStepper from "./formStepper"
import { SubmitHandler, useForm } from "react-hook-form"
import BasicInfo from "./basicInfo"
import TestForm from "./testForm"

interface PostFormProps {
    onSubmit: (formData: FormData, id?: string) => Promise<any>,
    postData?: Post
}

export default function PostForm(props: PostFormProps){

    const {register, handleSubmit, watch} = useForm<PostFormData>()

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

    const steps = ["Basic Info", "Media", "Tags"]

    const name = watch("name")


    return(
        <Container>
            <FormStepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep}>
                <Stack gap={2}>
                    <Card sx={{p: 2, m:1, display:"flex", justifyContent:"center"}}>
                        <Box 
                            component="form" 
                            onSubmit={handleSubmit(onSubmit)} 
                            sx={{display:"flex", flexWrap:"wrap", justifyContent:"center"}} gap={2}
                        >
                            <BasicInfo register={register}/>
                            <Button sx={{alignSelf:"end"}} variant="contained" type="submit">Submit</Button>
                        </Box>
                    </Card>
                </Stack>
            </FormStepper>
        </Container>
    )
}
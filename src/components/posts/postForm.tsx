import { Post } from "@/src/lib/definitions/posts"
import { Box, Button, Card, Container, Stack, TextField } from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import FormStepper from "./formStepper"

interface PostFormProps {
    onSubmit: (formData: FormData, id?: string) => Promise<any>,
    postData?: Post
}

export default function PostForm({onSubmit, postData}: PostFormProps){
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [liveSite, setLiveSite] = useState<string>("")
    const [github, setGithub] = useState<string>("")

    useEffect(() => {
        if(postData){
            setName(postData.name)
            setDescription(postData.description)
            setLiveSite(postData.liveSite ?? "")
            setGithub(postData.github)}
    }, [postData])

    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData()
  
        formData.append("name", name)
        formData.append("description", description)
        formData.append("liveSite", liveSite)
        formData.append("github", github)

        try{
            await onSubmit(formData)
        }
        catch(err){
            throw err
        }
        // window.location.reload()
    }

    const steps = ["Basic Info", "Media", "Tags"]


    return(
        <Container>
            <FormStepper steps={steps}>
                <Card sx={{p: 2, m:1, display:"flex", justifyContent:"center"}}>
                    <Box component="form" onSubmit={e => handleSubmit(e)} sx={{display:"flex", flexWrap:"wrap", justifyContent:"center"}} gap={2}>
                        <Stack gap={2}>
                            <TextField size="small" InputLabelProps={{shrink:true}} label="name" variant="outlined" value={name} onChange={e => setName(e.target.value)}/>
                            <TextField size="small" InputLabelProps={{shrink:true}} label="description" variant="outlined" value={description} onChange={e => setDescription(e.target.value)}/>
                            <TextField size="small" InputLabelProps={{shrink:true}} label="live site" variant="outlined" value={liveSite} onChange={e => setLiveSite(e.target.value)}/>
                            <TextField size="small" InputLabelProps={{shrink:true}} label="github" variant="outlined" value={github} onChange={e => setGithub(e.target.value)}/>
                            <Box sx={{alignSelf:"end", display:"flex"}} gap={2}>
                                <Button sx={{alignSelf:"end"}} variant="contained" type="submit">Submit</Button>
                                {/* {tagData?._id ? <DeleteButton disabled={false} _id={tagData._id}/> : null} */}
                            </Box>
                        </Stack>
                    </Box>
                </Card>
            </FormStepper>
        </Container>
    )
}
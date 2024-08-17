"use client"

import { Box, Button, Card, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import type {PostWithTags} from "../../lib/definitions/posts"
import Tag from "../tags/tag"
import Gallery from "./gallery"

export default function Post({data}:{data:PostWithTags}){
    const post = data
    const images = post.files.map(file => {
        return {file, alt: file.key}
    })
    const theme = useTheme()
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const mdDownSize = 240
    const mdUpSize = 300 
    const defaultSize = isMdDown ? 
                            {width:mdDownSize*(16/9), height:mdDownSize*(9/16)} : 
                            {width:mdUpSize*(16/9), height:mdUpSize*(9/16)}
    return(
        <Card 
            sx={{
                border:"1px solid",
                borderColor: theme.palette.divider,
            }}
        >
            <Stack sx={{display:"flex"}}>
                <Box sx={{p:1}}>
                    <Gallery images={images} defaultSize={defaultSize} />
                </Box>
                <Stack gap={1}>
                    <Stack gap={2} sx={{p:2}}>
                        <Typography variant="h6">{post.name}</Typography>
                        <Typography variant="subtitle2" maxWidth="42ch">{post.description}</Typography> 
                        <Box sx={{display:"flex"}} gap={2}>
                            {post.liveSite ? <Button variant="contained" target="_blank" rel="noopener" href={post.liveSite}>Website</Button> : null}
                            {post.github ? <Button variant="outlined" target="_blank" rel="noopener" href={post.github}>Github</Button> : null}
                        </Box>

                    </Stack>
                    {post.tags.length > 0 &&                     
                        <Stack gap={"4px"}>
                            <Divider/>
                            <Box sx={{display:"flex", justifyContent:"start", flexWrap:"wrap", p:2}} gap={1}>
                                {post.tags.map(tag => {
                                    if(tag._id){
                                        return <Tag key={tag._id} data={tag}/>
                                    }
                                })}
                            </Box>
                        </Stack>
                    }
                </Stack>
            </Stack>
        </Card> 
    )
}
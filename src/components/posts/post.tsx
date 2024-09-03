"use client"

import { Box, Button, Card, Divider, Stack, Theme, Typography, useMediaQuery, useTheme } from "@mui/material"
import type {PostWithTags} from "../../lib/definitions/posts"
import Tag from "../tags/tag"
import Gallery from "./gallery"

export default function Post(props:{data:PostWithTags}){
    const theme = useTheme()
    const post = props.data
    const images = post.files.map(file => {
        return {file, alt: file.key}
    })
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
                height:1,
                width:1,
            }}
        >
            <Stack sx={{display:"flex", height:1}}>
                <Box sx={{p:1}}>
                    <Gallery images={images} defaultSize={defaultSize} />
                </Box>
                <Stack sx={{flex:1}} gap={1}>
                    <Stack gap={2} sx={{p:2, flex:1}}>
                        <Stack sx={{flex:1, mt:1, mb:2}} gap={2}>
                            <Typography variant="h6">{post.name}</Typography>
                            <Typography lineHeight={1.8} variant="subtitle2" maxWidth="42ch">{post.description}</Typography> 
                        </Stack>
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
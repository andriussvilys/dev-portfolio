import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material"
import type {PostWithTags} from "../../lib/definitions/posts"
import Tag from "../tags/tag"
import Gallery from "./gallery"
import { dividerColor } from "../front/constants"

export default function Post({post}:{post:PostWithTags}){
    const images = post.files.map(file => {
        return {file, alt: file.key}
    })
    return(
        <Card 
            sx={{
                border:"1px solid",
                borderColor: dividerColor,
            }}
        >
            <Stack sx={{display:"flex"}}>
                <Box sx={{p:1}}>
                    <Gallery images={images} size={{width:200, height:200}} />
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
                                        return <Tag key={tag._id} tag={tag}/>
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
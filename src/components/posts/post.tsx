import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material"
import type {PostWithTags} from "../../lib/definitions/posts"
import { getURL } from "@/src/lib/storage"
import Tag from "../tags/tag"
import Image from "next/image"

export default function Post({post}:{post:PostWithTags}){
    const thumbnail = post.files[0]
    return(
        <Card>
            <Stack sx={{p: 4, display:"flex"}} gap={2}>
                <Stack sx={{justifyContent:"space-between"}} gap={3}>
                    <Stack gap={3}>
                        <Stack gap={3}>
                            <Typography variant="h4">{post.name}</Typography>
                            <Box sx={{display:"flex", justifyContent:"space-between"}} gap={4}>
                                <Typography maxWidth="50ch">{post.description}</Typography>
                                <Box sx={{display:"flex", justifyContent:"center", flexWrap:"wrap"}}>
                                    <Box sx={{
                                        width: 200,
                                        height: 200,
                                        borderRadius:1,
                                        overflow:"hidden"
                                    }}>
                                        <Image  
                                            src={thumbnail.url} 
                                            alt={thumbnail.key}
                                            width={200}
                                            height={200}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Stack>
                        <Box sx={{display:"flex"}} gap={2}>
                            {post.liveSite ? <Button variant="contained" href={post.liveSite}>Website</Button> : null}
                            {post.github ? <Button variant="outlined" href={post.github}>Github</Button> : null}
                        </Box>
                    </Stack>
                </Stack>
                <Stack gap={2}>
                    <Divider />
                    <Box sx={{display:"flex", justifyContent:"start", flexWrap:"wrap"}} gap={2}>
                        {post.tags.map(tag => {
                            if(!tag){
                                return null
                            }
                            return <Tag key={tag._id} tag={tag}/>
                        })}
                    </Box>
                </Stack>
            </Stack>
        </Card>
    )
}
import { Box, Stack, Typography } from "@mui/material"
import type {Post} from "../../lib/definitions/posts"
import type { Tag as TagType } from "@/src/lib/definitions/tags"
import { getURL } from "@/src/lib/storage"
import Tag from "../tags/tag"
import Image from "next/image"
import { listTags } from "@/src/lib/tags"

export default async function Post({post}:{post:Post}){
    const tags:TagType[] = (await listTags()).items
    const postTags = post.tags?.map(tag => {
        const foundTag = tags.find(t => t._id === tag)
        if(foundTag){
            foundTag["url"] = getURL(foundTag.key)  
        }
        return foundTag
    })
    return(
        <Stack key={crypto.randomUUID()} sx={{border: "1px solid black", p: 2}} gap={2}>
            <Typography>name: {post.name}</Typography>
            <Typography>Description: {post.description}</Typography>
            <Typography>Live Site: {post.liveSite}</Typography>
            <Typography>Github: {post.github}</Typography>
            <Stack sx={{border:"1px solid", borderRadius:3, p:2}}>
                <Typography>Tags:</Typography>
                <Box sx={{display:"flex", justifyContent:"center", flexWrap:"wrap"}} gap={2}>
                    {postTags.map(tag => {
                        if(!tag){
                            return null
                        }
                        return <Tag key={tag._id} tag={tag}/>
                    })}
                </Box>
            </Stack>
            <Stack sx={{border:"1px solid", borderRadius:3, p:2}}>
                <Typography>Images:</Typography>
                <Box sx={{display:"flex", justifyContent:"center", flexWrap:"wrap"}}>
                    {post.files.map((file, index) => {
                        return <Image 
                                    key={`image${file.key}`} 
                                    src={getURL(file.key)} 
                                    alt={file.key}
                                    width={200}
                                    height={200}
                                />
                    })}
                </Box>
            </Stack>
        </Stack>
    )
}
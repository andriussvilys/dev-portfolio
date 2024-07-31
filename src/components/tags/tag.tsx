import Image from 'next/image';
import { getURL } from '@/src/lib/storage';
import { Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import type {Tag} from '@/src/lib/definitions/tags'

const getAlt = (tag: Tag) => {
    if(!tag){
        return "tag"
    }
    return tag.name ?? tag.key;
}

export default async function Tag({tag}: {tag: Tag}) {
    const {name, key, _id} = tag;
    return (
        <Suspense>
            <Box style={{display:"flex", flexDirection:"column", marginBottom: "10px"}}>
                <Box>
                    <Image width={150} height={150} src={getURL(tag.key)} alt={getAlt(tag)}/>
                </Box>
                <Typography>{name}</Typography>
                <Typography>{_id}</Typography>
            </Box>
        </Suspense>
    )
}
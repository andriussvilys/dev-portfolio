import Image from 'next/image';
import { Stack, Typography } from '@mui/material';
import type {Tag} from '@/src/lib/definitions/tags'

const getAlt = (tag: Tag) => {
    if(!tag){
        return "tag"
    }
    return tag.name ?? tag.key;
}

export default function Tag({tag}: {tag: Tag}) {
    return (
        <Stack sx={{alignItems:"center"}}>
            <Image src={tag.url ?? ""} height={100} width={100} alt={getAlt(tag)}/>
            <Typography>{tag.name}</Typography>
        </Stack>
    )
}
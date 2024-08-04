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
        <Stack sx={{alignItems:"center", border:"1px solid", p: 1, borderRadius:2}}>
            <Image src={tag.url ?? ""} height={50} width={50} alt={getAlt(tag)}/>
            <Typography variant="caption">{tag.name}</Typography>
        </Stack>
    )
}
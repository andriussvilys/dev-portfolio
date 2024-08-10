import Image from 'next/image';
import { Avatar, Tooltip } from '@mui/material';
import { TagRecord } from '@/src/lib/definitions/tags';

const getAlt = (tag: TagRecord) => {
    if(!tag){
        return "tag"
    }
    return tag.name ?? tag.file.key;
}

export default function Tag({tag}: {tag: TagRecord}) {
    return (
        <Tooltip title={tag.name}>
            <Avatar variant="rounded">
                <Image src={tag.file.url ?? ""} height={50} width={50} alt={getAlt(tag)}/>
            </Avatar>
        </Tooltip>
    )
}
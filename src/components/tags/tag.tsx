"use client"

import Image from 'next/image';
import { Box, Tooltip } from '@mui/material';
import { TagRecord } from '@/src/lib/definitions/tags';
import { getFixedSize } from '@/src/lib/utils';

const getAlt = (tag: TagRecord) => {
    if(!tag){
        return "tag"
    }
    return tag.name ?? tag.file.key;
}

const defaultSize = {width: 38, height: 38};

export default function Tag({tag}: {tag: TagRecord}) {
    const {width, height} = getFixedSize(tag.file.metadata, defaultSize)
    return (
        <Tooltip title={tag.name}>
            <Box sx={{
                overflow:"hidden", 
                display:"flex", 
                justifyContent:"center",
                alignItems:"center",
                boxSizing:"content-box",
            }} borderRadius={1}>
                <Image src={tag.file.url ?? ""} height={height} width={width} alt={getAlt(tag)}/>
            </Box>
        </Tooltip>
    )
}
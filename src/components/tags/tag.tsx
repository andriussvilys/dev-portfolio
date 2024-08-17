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

export default function Tag({data}: {data: TagRecord}) {
    const {file, name} = data
    const {width, height} = getFixedSize(file.metadata, defaultSize)
    return (
        <Tooltip title={name}>
            <Box sx={{
                overflow:"hidden", 
                display:"flex", 
                justifyContent:"center",
                alignItems:"center",
                boxSizing:"content-box",
            }} borderRadius={1}>
                <Image src={file.url ?? ""} height={height} width={width} alt={getAlt(data)}/>
            </Box>
        </Tooltip>
    )
}
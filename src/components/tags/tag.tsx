"use client"

import Image from 'next/image';
import { Box, Tooltip } from '@mui/material';
import { TagBackground, TagBackgroundColorMap, TagRecord } from '@/src/lib/definitions/tags';
import { getFixedSize } from '@/src/lib/utils';

const getAlt = (tag: TagRecord) => {
    if(!tag){
        return "tag"
    }
    return tag.name ?? tag.file.key;
}

const defaultSize = {width: 38, height: 38};

const getBackgroundColor = (value:TagBackground|undefined) => {
    if(value){
        return TagBackgroundColorMap[value]
    }
    else return TagBackgroundColorMap[TagBackground.NONE]
}

export default function Tag({data}: {data: TagRecord}) {
    const {file, name, background} = data
    const backgroundColor = getBackgroundColor(background)
    const padding = background && background !== TagBackground.NONE ? 1 : 0
    const {width, height} = getFixedSize(file.metadata, defaultSize)
    return (
        <Tooltip title={name}>
            <Box sx={{
                overflow:"hidden", 
                display:"flex", 
                justifyContent:"center",
                alignItems:"center",
                boxSizing:"content-box",
                bgcolor: backgroundColor,
                padding: padding,
            }} borderRadius={1}>
                <Image src={file.url ?? ""} height={height} width={width} alt={getAlt(data)}/>
            </Box>
        </Tooltip>
    )
}
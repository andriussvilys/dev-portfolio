"use client"

import { StorageFile } from '@/src/lib/definitions/fileUpload'
import { AppBar, Backdrop, Box, Button, Card, Container, IconButton, Stack, Toolbar } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import {Close as CloseIcon} from '@mui/icons-material';
import { getFixedSize } from '@/src/lib/utils'
import { appBarZIndex } from '../front/navigation/constants'

interface GalleryProps {
    images: {file: StorageFile, alt: string}[]
    defaultSize: {width:number, height:number}
}

const defaultGallerySize = {width: 300*(16/9), height: 300*(9/16)}

export default function Gallery({images, defaultSize}: GalleryProps){
    const [open, setOpen] = useState(false)
    const {width, height} = defaultSize ?? defaultGallerySize
    const thumbnail = images[0]
    const handleClick = () => {
        setOpen(prev => !prev)
    }
    const thumbnailSize = getFixedSize(thumbnail.file.metadata, {width, height})
    return(
        <>
        <Backdrop
            sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)', 
                zIndex: appBarZIndex + 1,
                p: 4
            }}
            open={open}
        >
            <Card sx={{height:"100%", width:"100%", maxWidth:"lg"}}>
                <Stack sx={{height:"100%"}}>
                    <AppBar sx={{
                        display:"flex", 
                        justifyContent:"center", 
                        flexDirection:"row",
                        position:"relative",
                        p:0, m:0
                    }}>
                        <Toolbar sx={{flex:1, maxWidth: "lg", justifyContent:"end"}}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => handleClick()}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Box sx={{
                        justifyContent:"center", 
                        alignItems:"center",
                        display:"flex",
                        flex:1,
                    }}>
                        {images.map((image, index) => {
                            const {width, height} = getFixedSize(image.file.metadata, defaultGallerySize)
                            return(
                                <Image  
                                    key={index}
                                    src={image.file.url} 
                                    alt={image.alt}
                                    width={width}
                                    height={height}
                                />
                            )
                        })}
                    </Box>
                </Stack>
            </Card>
        </Backdrop>
        <Box sx={{display:"flex", justifyContent:"center"}}>
            <Button sx={{p:0, m:0}} onClick={()=>handleClick()}>
                <Image  
                    src={thumbnail.file.url} 
                    alt={thumbnail.alt}
                    width={thumbnailSize.width}
                    height={thumbnailSize.height}
                />
            </Button>
        </Box>
        </>
    )
}
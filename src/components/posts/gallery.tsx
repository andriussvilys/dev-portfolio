"use client"

import { StorageFile } from '@/src/lib/definitions/fileUpload'
import { AppBar, Backdrop, Box, Button, Card, IconButton, Stack, Toolbar } from '@mui/material'
import { useState } from 'react'
import {Close as CloseIcon} from '@mui/icons-material';
import { getFixedSize } from '@/src/lib/utils'
import { appBarZIndex } from '../front/navigation/constants'
import { grey } from '@mui/material/colors';

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
            <Card sx={{
                    height:"100%", 
                    width:"100%", 
                    maxWidth:"lg",
                    bgcolor: grey[900],
                    boxShadow:"0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12) !important"
                }}>
                <Stack sx={{height:"100%"}}>
                    <AppBar sx={{
                        display:"flex", 
                        justifyContent:"center", 
                        flexDirection:"row",
                        position:"relative",
                        p:0, m:0,
                        flex:0,
                        bgcolor: grey[900],
                        boxShadow:"0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12) !important"
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
                        alignItems:"start",
                        display:"flex",
                        overflow:"auto",
                        flex:1,
                        p:2
                    }}>
                        <Box sx={{
                                display:"flex",
                                flexWrap:"wrap",
                                width:"100%",
                                height:"100%",	
                                p:1
                            }}
                            gap={2}
                        >
                            {images.map((image, index) => {
                                const {width, height} = getFixedSize(image.file.metadata, defaultGallerySize)
                                return(
                                    <Box
                                        sx={{
                                            height:1, 
                                            overflow:"hidden",
                                            p:1,
                                        }}
                                        key={image.file.key}
                                    >
                                        <img  
                                            src={image.file.url} 
                                            alt={image.alt}
                                            style={{
                                                width:"100%", 
                                                height:"100%", 
                                                objectFit:"scale-down"
                                            }}
                                        />
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                </Stack>
            </Card>
        </Backdrop>
        <Box sx={{display:"flex", justifyContent:"center"}}>
            <Button sx={{
                    p:0, m:0, 
                    overflow:"hidden",
                    maxHeight: "220px",
                }} 
                onClick={()=>handleClick()}
            >
                <img  
                    src={thumbnail.file.url} 
                    alt={thumbnail.alt}
                    style={{
                        width:"100%", 
                        height:"100%", 
                        objectFit: "scale-down"
                    }}
                />
            </Button>
        </Box>
        </>
    )
}
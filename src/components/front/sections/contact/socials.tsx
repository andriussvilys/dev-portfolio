import { Box, Button, Card, Divider, Stack, Theme, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

export default function Socials({theme}:{theme:Theme}) {
    const buttons = [
        {
            text:"Github",
            href:"https://github.com/andriussvilys/",
            icons: {
                light: "/github-mark-white.png",
                dark: "/github-mark.png"
            }
        },
        {
            text:"LinkedIn",
            href:"https://www.linkedin.com/in/andrius-svilys/",
            icons: {
                light: "LI-In-Bug.png",
                dark: "LI-In-Bug.png"
            }
        },
        {
            text:"Gmail",
            href:"mailto:andriussvilys@gmail.com",
            icons:{
                light:"gmail.png",
                dark:"gmail.png"
            }
        }
    ]
  return (
    <Card 
        sx={{
            border:"1px solid",
            borderColor: theme.palette.divider,
            display:"flex",
            flexDirection:"column",
            boxShadow:3,
            width:"100%",
            maxWidth:"60ch",
        }}
    >
        <Box sx={{pl:2, pr:2}}>
            <Typography variant="overline">{`Socials`.toUpperCase()}</Typography>
        </Box>
        <Divider/>
        <Box sx={{display:"flex", flex:1, p:2, justifyContent:"center", alignItems:"center"}} gap={1}>
            
            {buttons.map(button => {
                return <Button 
                    key={button.text}
                    variant="text" 
                    target="_blank" 
                    rel="noopener" 
                    href={button.href}
                    startIcon={<img src={
                            theme.palette.mode === "dark" ? button.icons.light : 
                            button.icons.dark} 
                            alt={button.text} 
                            style={{width:28}}/>
                    }>
                        <Typography variant="overline" sx={{color:grey[700]}}>
                            {button.text}
                        </Typography>
                </Button>
            })}
        </Box>
    </Card>
  )
}

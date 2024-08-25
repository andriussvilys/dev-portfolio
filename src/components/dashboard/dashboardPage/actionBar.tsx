import { AppBar, Box, Button, ButtonProps, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { appBarHeight, appBarZIndex } from '../../front/navigation/constants'
import { grey } from '@mui/material/colors'

type ActionBarButtonProps = ButtonProps & {name:string}
interface ActionBarProps{
    name: string,
    buttons?: ActionBarButtonProps[]
}

export default function ActionBar({name, buttons}: ActionBarProps) {
  return (
    <AppBar position="absolute" sx={{
            zIndex:appBarZIndex, 
            height:appBarHeight,
            p: "0 16px",
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            bgcolor:"primary.main",
        }}>
            <Toolbar sx={{width:1}}>
                <Typography variant="overline" fontSize={18} component="div" sx={{ flexGrow: 1 }}>{name.toUpperCase()}</Typography>
                {
                    buttons && 
                    <Box sx={{display:"flex"}} gap={1}>
                        {
                            buttons?.map((button:ActionBarButtonProps) => {
                                    return <Button 
                                    key={button.name} 
                                    {...button} 
                                    variant={button.variant ?? "outlined"}
                                    sx={{
                                        color:"primary.contrastText",
                                        borderColor: "primary.contrastText",
                                    }}
                                >{button.name}</Button>
                            })
                        }
                    </Box>
                }   
            </Toolbar>
    </AppBar>
  )
}

export type { ActionBarProps }

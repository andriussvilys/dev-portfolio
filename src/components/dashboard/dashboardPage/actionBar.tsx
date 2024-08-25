import { AppBar, Box, Button, ButtonProps, Toolbar} from '@mui/material'
import React from 'react'
import { appBarHeight, appBarZIndex } from '../../front/navigation/constants'
import { PageName } from '../constants'
import type { Breadcrumb } from './breadcrumbs';
import Breadcrumbs from './breadcrumbs';

type ActionBarButtonProps = ButtonProps & {name:string}
interface ActionBarProps{
    name: PageName,
    buttons?: ActionBarButtonProps[],
    breadcrumbs?: Breadcrumb[]
}

export default function ActionBar(props: ActionBarProps) {
    const {name, buttons} = props
    const breadcrumbs:Breadcrumb[] = props.breadcrumbs ? [...props.breadcrumbs, {name, href:""}] : [{name, href:""}]
  return (
    <AppBar position="absolute" sx={{
            zIndex:appBarZIndex, 
            height:appBarHeight,
            p: "0 16px",
            bgcolor:"primary.main",
            display:"flex",
            justifyContent:"start",
        }}>
            <Toolbar sx={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between",
            }}>
                <Breadcrumbs breadcrumbs={breadcrumbs} current={name} />
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

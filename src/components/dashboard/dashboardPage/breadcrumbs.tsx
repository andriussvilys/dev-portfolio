import { Button, Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import React from 'react'
import { PageName } from '../constants';

type Breadcrumb = {name:PageName, href:string}

interface BreadcrumbsProps{
    breadcrumbs: Breadcrumb[],
    current: PageName
}

export default function Breadcrumbs({breadcrumbs, current}:BreadcrumbsProps) {
  return (
    <MuiBreadcrumbs
    separator={<NavigateNextIcon fontSize="small" sx={{color:"primary.contrastText", m:0}}/>}
    aria-label="breadcrumb"
>
    {
        breadcrumbs.map(breadcrumb => {
            const {name, href} = breadcrumb
            return <Button
                        key={name} 
                        href={href}
                        disabled={name === current}
                    >

                        <Typography sx={{color:"primary.contrastText"}} variant="overline" fontSize={14}>{name}</Typography>
                    </Button>
                
        })
    }
</MuiBreadcrumbs>
  )
}

export type {Breadcrumb}

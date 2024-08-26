import { Stack, Toolbar } from '@mui/material'
import React from 'react'
import ActionBar, { ActionBarProps } from './actionBar'

interface DashboardPageProps extends ActionBarProps{
    children: React.ReactNode
}

export default function DashboardPage({children, name, buttons, breadcrumbs}: DashboardPageProps) {
  return (
    <Stack sx={{position:"relative", height:1, width:1}}>
        <ActionBar name={name} buttons={buttons} breadcrumbs={breadcrumbs}/>
        <Toolbar />
        <Stack sx={{overflow:"auto", height:1, width:1}}>
          <Stack sx={{p:2, flex:1}}>
            {children}
          </Stack>
        </Stack>
    </Stack>
  )
}

"use client"

import { ListItem, ListItemButton, Theme, Typography } from "@mui/material"
import { navLinks } from "../constants"
import ThemeSwitch from "./themeSwitch"

interface NavListItemsProps {
    onClick?: ()=>void,
    theme: Theme,
    switchTheme: ()=>void
}

export default function NavListItems({theme, switchTheme, onClick}:NavListItemsProps) {
    return(
        <>
            {navLinks.map(item => {
                return (
                    <ListItem key={crypto.randomUUID()} sx={{}}>
                        <ListItemButton href={item.id} onClick={()=>{if(onClick)onClick()}}>
                                <Typography>
                                    {item.name.toUpperCase()}
                                </Typography>
                        </ListItemButton>
                    </ListItem>
                )
            })}
            <ListItem>
                <ThemeSwitch theme={theme} switchTheme={switchTheme} />
            </ListItem>
        </>
    )
}
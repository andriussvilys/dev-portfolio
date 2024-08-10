"use client"

import { ListItem, ListItemButton, Typography } from "@mui/material"
import { navLinks } from "./constants"

export default function NavListItems({onClick}:{onClick?:()=>void}) {
    return(
        <>
            {navLinks.map(item => {
                return (
                    <ListItem key={crypto.randomUUID()}>
                        <ListItemButton href={item.id} onClick={()=>{if(onClick)onClick()}}>
                                <Typography>
                                    {item.name.toUpperCase()}
                                </Typography>
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </>
    )
}
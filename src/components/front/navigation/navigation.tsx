"use client"

import { IconButton, List, ListItem, ListItemButton, Toolbar, Typography, AppBar, Theme} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import { appBarHeight, appBarZIndex } from "./constants";
import NavDrawer from "./navDrawer";
import NavListItems from "./navListItems";
import { SectionName, sections } from "../constants";
import { ThemeSwitchProps } from "./themeSwitch";

interface NavigationProps extends ThemeSwitchProps {}

export default function Navigation({theme, switchTheme}: NavigationProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const logo = "Andrius Svilys"

    return(
        <>
            <AppBar 
                position="fixed" 
                sx={{
                    display:"flex", 
                    justifyContent:"center", 
                    flexDirection:"row",
                    zIndex:appBarZIndex,
                    backgroundColor: "#fff0",
                    height:(appBarHeight),
                p:0, m:0}}
            >
                <Toolbar sx={{flex:1, maxWidth: "lg", p:0}}>
                    <List sx={{display:"flex", justifyContent:"space-between", width:1, p:0, m:0}}>
                        <ListItem sx={{flex:0, m:0, p:0}}>
                            <ListItemButton href={sections[SectionName.hero].id} sx={{ textWrap: "nowrap"}} onClick={()=>setDrawerOpen(false)}>
                                <Typography>{logo.toUpperCase()}</Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{flex:0, display: { xs: 'none', md: 'block'}, m:0, p:0}}>
                            <List sx={{display: "flex", p:0, m:0}}>
                                <NavListItems theme={theme} switchTheme={switchTheme}/>
                            </List>
                        </ListItem>
                        <ListItem sx={{flex: 0, display: { xs: 'block', md: 'none'}}}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => setDrawerOpen(!drawerOpen)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </ListItem>
                    </List>
                </Toolbar>
            </AppBar>
            <NavDrawer isOpen={drawerOpen} setOpen={(val:boolean) => {setDrawerOpen(val)}} theme={theme} switchTheme={switchTheme}/>
        </>
    )
}
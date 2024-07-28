"use client"

import { Box, IconButton, List, ListItem, ListItemButton, styled, Toolbar, Typography, AppBarProps as MuiAppBarProps, AppBar} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import { appBarZIndex } from "./constants";
import NavDrawer from "./navDrawer";
import NavListItems from "./navListItems";

export default function Navigation({children}: {children: React.ReactNode}) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const logo = "Andrius Svilys"

    return(
        <Box sx={{display:"flex", height: "100vh"}}>
            <AppBar 
                position="absolute" 
                // open={drawerOpen} 
                sx={{display:"flex", justifyContent:"center", zIndex:appBarZIndex}}
            >
                <Toolbar sx={{maxWidth: "1260px"}}>
                    <List sx={{display:"flex", justifyContent:"space-between", width:1, p:0, m:0}}>
                        <ListItem sx={{flex:0}}>
                            <ListItemButton href={"#home"} sx={{ textWrap: "nowrap"}} onClick={()=>setDrawerOpen(false)}>
                                <Typography color="white">{logo.toUpperCase()}</Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{flex:0, display: { xs: 'none', md: 'block'}}}>
                            <List sx={{display: "flex", p:0, m:0}}>
                                <NavListItems />
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
            <NavDrawer isOpen={drawerOpen} setOpen={(val:boolean) => {setDrawerOpen(val)}}/>
        <Box component="main" 
            sx={{ flexGrow: 1, 
                bgcolor: 'background.default', 
                pr: 3, 
                pl: 3, 
                overflow:"hidden",
                display:"flex",
                flexDirection:"column"
                }}>
            <Toolbar />
            <Box 
                sx={{overflow:"hidden", pt: 1, pb: 1}}
            >
                {children}
            </Box>
        </Box>
    </Box>
    )
}
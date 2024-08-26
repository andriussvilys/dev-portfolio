"use client"

import { AppBar as MuiAppBar, Box, Divider, Drawer as MuiDrawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Toolbar, Typography, AppBarProps as MuiAppBarProps } from "@mui/material";
import {ChevronRight as ChenronRightIcon, ChevronLeft as ChevronLeftIcon, Menu as MenuIcon, Label as LabelIcon, Article as ArticleIcon, AccountCircle, SentimentSatisfiedAlt, Home as HomeIcon } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { drawerWidth } from "../../front/navigation/constants";
import { useState } from "react";

  const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

export default function Drawer() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    
    return(
    <StyledDrawer
        variant="permanent"
        open={open}
    >
    <Toolbar sx={{display:"flex", justifyContent:"end"}}>
        <IconButton onClick={() => {setOpen(!open)}}>
            {open ? <ChevronLeftIcon /> : <ChenronRightIcon />}
        </IconButton>
    </Toolbar>
    <Divider />
    <List>
        <ListItem disablePadding>
            <ListItemButton onClick={() => router.replace("/dashboard/posts")}>
                <ListItemIcon>
                    <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Posts" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton onClick={() => router.replace("/dashboard/tags")}>
                <ListItemIcon>
                    <LabelIcon />
                </ListItemIcon>
                <ListItemText primary="Tags" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton onClick={() => router.replace("/dashboard/about")}>
                <ListItemIcon>
                    <SentimentSatisfiedAlt />
                </ListItemIcon>
                <ListItemText primary="About" />
            </ListItemButton>
        </ListItem>
    </List>
    <Divider />
    <List>
        <ListItem disablePadding>
            <ListItemButton onClick={()=>signOut({callbackUrl: "/"})}>
                <ListItemIcon>
                    <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Sign out" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton onClick={() => router.replace("/")}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
        </ListItem>
    </List>
</StyledDrawer>
    )
}
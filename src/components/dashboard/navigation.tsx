"use client"

import { AppBar as MuiAppBar, Box, Divider, Drawer as MuiDrawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Toolbar, Typography, AppBarProps as MuiAppBarProps } from "@mui/material";
import {ChevronLeft as ChevronLeftIcon, Menu as MenuIcon, Label as LabelIcon, Article as ArticleIcon, AccountCircle, SentimentSatisfiedAlt, Home as HomeIcon } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const drawerWidth: number = 240;


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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

interface NavigationProps {
    children: React.ReactNode
}

export default function Navigation({children}: NavigationProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter()

    return(
        <Box sx={{display:"flex", height: "100vh"}}>
            <AppBar position="absolute" open={drawerOpen}>
                <Toolbar>
                    <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setDrawerOpen(!drawerOpen)}
                    sx={{
                        marginRight: '36px',
                        ...(drawerOpen && { display: 'none' }),
                    }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography>Tags</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={drawerOpen}
            >
            <Toolbar sx={{display:"flex", justifyContent:"end"}}>
                <IconButton onClick={() => {setDrawerOpen(!drawerOpen)}}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => router.replace("/")}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
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
            </List>
        </Drawer>
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
                sx={{height:"100%", overflow:"hidden", pt: 1, pb: 1}}
            >
                {children}
            </Box>
        </Box>
    </Box>
    )
}
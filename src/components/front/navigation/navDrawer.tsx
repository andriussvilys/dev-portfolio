"use client"

import {Drawer, Toolbar, List} from "@mui/material";
import { appBarHeight, appBarZIndex, drawerWidth } from "./constants";
import NavListItems from "./navListItems";
import { ThemeSwitchProps } from "./themeSwitch";

interface NavDrawerProps extends ThemeSwitchProps {
  isOpen:boolean, 
  setOpen:any
}

export default function NavDrawer({isOpen, setOpen, theme, switchTheme}:NavDrawerProps){

    return(
          <Drawer
            variant="temporary"
            anchor="right"
            open={isOpen}
            onTransitionEnd={()=>{}}
            onClose={()=>{{setOpen(false)}}}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              zIndex:appBarZIndex-1,
              position:"absolute",
              top:appBarHeight,
            }}
          >
            <Toolbar />
            <Toolbar />
            <List>
              <NavListItems onClick={() => setOpen(false)} theme={theme} switchTheme={switchTheme}/>
            </List>
        </Drawer>
    )
}
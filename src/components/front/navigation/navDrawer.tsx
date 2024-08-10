"use client"

import {Drawer, Toolbar, List} from "@mui/material";
import { appBarZIndex, drawerWidth } from "./constants";
import NavListItems from "./navListItems";

export default function NavDrawer({isOpen, setOpen}:{isOpen:boolean, setOpen:any}){

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
            zIndex:appBarZIndex-1
          }}
        >
          <Toolbar />
          <List>
            <NavListItems onClick={() => setOpen(false)}/>
          </List>
      </Drawer>
    )
}
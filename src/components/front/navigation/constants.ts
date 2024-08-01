const drawerWidth = 240;
const appBarZIndex = 1200;

interface NavLink{
    name: string,
    id:string,
}

const navLinks:NavLink[] = [
    {name: "Projects", id: "#projects"},
    {name: "Skills", id: "#skills"},
    {name: "About", id: "#about"},
    {name: "Contact", id: "#contact"},
]

export {drawerWidth, navLinks, appBarZIndex}
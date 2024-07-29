import { ReactNode } from "react";
import { Tag } from "../../lib/definitions/tags";
import { Card} from "@mui/material";

interface DashboardTagProps {
    tag: Tag,
    children: ReactNode
}

export default function DashboardTag({tag, children}: DashboardTagProps) {
    
    return(
        <Card sx={{p: 2, m:1, display:"flex", justifyContent:"center"}}>
            {children}
        </Card>
    )
}
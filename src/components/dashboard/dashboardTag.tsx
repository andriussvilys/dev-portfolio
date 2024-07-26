import { ReactNode } from "react";
import DeleteButton from "../tags/deleteButton";
import { Tag } from "../../lib/data/tags";
import { Box, Button, Card, Link, Typography } from "@mui/material";
import {Edit as EditIcon } from "@mui/icons-material"

interface DashboardTagProps {
    tag: Tag,
    children: ReactNode
}

export default function DashboardTag({tag, children}: DashboardTagProps) {
    
    return(
        <Card sx={{p: 1, m:1}}>
            {children}
            <Box>
                <Button href={`/dashboard/tags/edit/${tag._id}`} variant="contained" startIcon={<EditIcon/>}>                    
                        <Typography>Edit</Typography>
                </Button>
                <DeleteButton disabled={false} _id={tag._id}/>
            </Box>
        </Card>
    )
}
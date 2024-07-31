import { Button, Typography } from "@mui/material"
import {AddCircle as AddCircleIcon} from "@mui/icons-material"

interface ActionButtonProps {
    href:string,
    buttonText:string
}

export default function ActionButton({href, buttonText}:ActionButtonProps){
    return(
        <Button 
            sx={{alignSelf:"end", m:2}} 
            startIcon={<AddCircleIcon/>} 
            variant="contained" 
            href={href} 
            color="success"
        >
            <Typography sx={{textWrap:"nowrap"}}>{buttonText}</Typography>
        </Button>
    )
}

import { CircularProgress } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import { appBarZIndex } from "../../front/navigation/constants";

interface LoadingBackdropProps{
    open: boolean
}

export default function LoadingBackdrop({open}:LoadingBackdropProps){
    return(
        <Backdrop
            sx={{ color: '#fff', zIndex: appBarZIndex + 1}}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
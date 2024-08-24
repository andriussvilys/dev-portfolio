import { CircularProgress } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import { appBarZIndex } from "../../front/navigation/constants";
import Toast, { ToastData } from "../toast/toast";

interface LoadingBackdropProps{
    open: boolean,
    toastStatus: ToastData,
    closeToast: () => void
}

export default function LoadingBackdrop({open, toastStatus, closeToast}:LoadingBackdropProps){
    return(
        <>
            <Toast 
                toastStatus={toastStatus}
                closeToast={()=>closeToast()}
            />
            <Backdrop
                sx={{ color: '#fff', zIndex: appBarZIndex + 1, position: 'fixed'}}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}
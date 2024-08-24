import { useState } from "react"
import { ToastData } from "../toast/toast";

export default function useLoading(){
    const [loading, setLoading] = useState(false);
    const [toastStatus, setToastStatus] = useState<ToastData>({message:"", open:false, severity:"info"});

    const closeToast = () => {
        setToastStatus(prev => {return {...prev, open:!prev.open}})
    }
    const backdrop = {loading, setLoading}
    const toast = {toastStatus, setToastStatus, closeToast}
    return {backdrop, toast}
}
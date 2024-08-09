import { useState } from "react"

interface useLoadingProps{
    initialState: boolean
}

export default function useLoading(initialState:useLoadingProps){
    const [loading, setLoading] = useState(initialState)
    return [loading, setLoading]
}
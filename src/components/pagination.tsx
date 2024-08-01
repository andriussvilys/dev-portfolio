"use client"

import {Pagination as MuiPagination} from "@mui/material"
import { usePathname, useRouter } from "next/navigation"

interface PaginationProps {
    page: number,
    limit: number,
    itemCount: number
}

export default function Pagination(props:PaginationProps) {
    const router = useRouter()
    const pathname = usePathname()
    const onPageChange = (page:number) => {
        router.push(`${pathname}?page=${page}&limit=${props.limit}`)
    }
    return(
        <MuiPagination sx={{alignSelf:"center"}} count={Math.ceil(props.itemCount / props.limit)} page={props.page} onChange={(e,page) => onPageChange(page)}/>
    )
}
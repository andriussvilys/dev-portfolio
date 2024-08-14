"use client"

import {Pagination as MuiPagination} from "@mui/material"
import { usePathname, useRouter } from "next/navigation"

interface PaginationProps {
    page: number,
    limit: number,
    itemCount: number
}

export default function Pagination(props:PaginationProps) {
    const {itemCount, limit, page} = props
    const router = useRouter()
    const pathname = usePathname()
    const onPageChange = (page:number) => {
        router.push(`${pathname}?page=${page}&limit=${props.limit}`)
        router.refresh()
    }
    return(
        <MuiPagination 
            sx={{alignSelf:"center"}} 
            count={limit > 0 ? Math.ceil(itemCount / limit) : 0} 
            page={page} 
            onChange={(e,page) => onPageChange(page)}
        />
    )
}
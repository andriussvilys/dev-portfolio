import { ReactNode } from "react";
import Link from "next/link";
import DeleteButton from "./tags/deleteButton";

interface DashboardTagProps {
    tag: Tag,
    children: ReactNode
}

export default function DashboardTag({tag, children}: DashboardTagProps) {
    
    return(
        <div style={{padding: "10px", margin: "5px", border: "1px black solid"}}>
            {children}
            <div>
                <DeleteButton disabled={false} _id={tag._id}/>
                <Link href={`/dashboard/tags/edit/${tag._id}`}>Edit</Link>
            </div>
        </div>
    )
}
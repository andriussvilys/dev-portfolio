"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Dashboard() {
    const pathName = usePathname()
    return (
        <section>
            <p>this is protected content</p>
            <Link href={`${pathName}/create`}>Upload file</Link>
        </section>
    )
}
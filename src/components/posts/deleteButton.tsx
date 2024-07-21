"use client"

import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"

export default function DeleteButton({name}: {name:string}) {
    const router = useRouter()
    const deleteFile = async (key: string) => {
        try{
            await fetch(`http://localhost:3000/api/s3/${key}`, {method: 'DELETE', cache: 'no-store'})
            window.location.reload()
        }
        catch(e){
            throw new Error("failed to delete from s3")
        }
    }
    return(
        <button onClick={() => deleteFile(name)}>Delete</button>
    )
}

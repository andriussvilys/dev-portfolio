import Link from "next/link"
import Post from "@/src/components/posts/post"

const getData = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/s3', {method: 'GET', cache: 'no-store'})
        return await res.json()
    }
    catch(e){
        throw new Error("failed to get from s3")
    }
}

export default async function Dashboard() {
    const data = await getData()
    const contents = data.data?.Contents
    console.log(contents)
    return (
        <section>
            <p>this is protected content</p>
            {contents?.map((fileName: any)=> <Post key={fileName.Key} name={fileName.Key} />)}
            {/* {contents.map((file: any)=> <Image width={150} height={150} src={getURL(file.Key)} key={file.Key} alt={file.Key}/>)} */}
            <Link href={`/dashboard/create`}>Upload file</Link>
        </section>
    )
}
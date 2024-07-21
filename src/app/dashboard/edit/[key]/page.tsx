import Post from "@/src/components/posts/post";
import { useParams } from "next/navigation";

export default function Page({params, searchParams}: {params: any, searchParams: any}) {
    const key = params.key
    console.log({params, searchParams})

    return (
        <section>
            <h1>Edit post Page</h1>
            <div style={{border: "1px solid blue", padding: "2px"}}>
                <Post name={key} />
            </div>
        </section>
    )
}
import TagFormEdit from "@/src/components/tags/tagFormEdit"
import { getURL } from "@/src/lib/storage"
import { getById } from "@/src/lib/tags"

export default async function Page({params}: {params: any}) {
    const _id = params._id
    const result = (await getById(_id)).result
    const url = getURL(result.key) 
    const tag = {...result, url}

    return (
        <section>
            <h1>Edit tag</h1>
            <div style={{border: "1px solid blue", padding: "2px"}}>
                <TagFormEdit tagData={tag} _id={_id}/>
            </div>
        </section>
    )
}
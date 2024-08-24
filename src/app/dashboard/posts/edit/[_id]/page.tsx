import { findPost } from "@/src/app/api/data/posts/utils"
import { listTags } from "@/src/app/api/data/tags/utils"
import PostFormEdit from "@/src/components/posts/form/postFormEdit"

export default async function EditPostPage({params}:{params:{_id:string}}){
    const {_id} = params

    const postQuery = await findPost(_id)
    const post = (await postQuery.json())

    const tagsQuery = await listTags({})
    const tags = (await tagsQuery.json()).items
    
    return(
        <PostFormEdit initialData={post} tags={tags}/>
    )
}
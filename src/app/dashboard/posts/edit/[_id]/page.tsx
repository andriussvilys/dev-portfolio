import PostFormEdit from "@/src/components/posts/form/postFormEdit"
import { findPost } from "@/src/lib/posts"
import { listTags } from "@/src/lib/tags"

export default async function EditPostPage({params}:{params:{_id:string}}){
    const {_id} = params
    const post = await findPost(_id)
    const tags = (await listTags()).items;
    return(
        <PostFormEdit initialData={post} tags={tags}/>
    )
}
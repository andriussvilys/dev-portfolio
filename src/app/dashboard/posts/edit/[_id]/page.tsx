import PostFormEdit from "@/src/components/posts/form/postFormEdit"
import type {Post} from "@/src/lib/definitions/posts"
import { findPost } from "@/src/lib/posts"
import { listTags } from "@/src/lib/tags"

interface EditPostPageProps{
    initialData?: Post
    searchParams:URLSearchParams
}

export default async function EditPostPage({params}:{params:{_id:string}}){
    const {_id} = params
    console.log("---------------------EditPostPage: ",_id)
    const post = await findPost(_id)
    console.log({post})
    console.log({files: post.files})
    const tags = (await listTags()).items;
    return(
        <PostFormEdit initialData={post} tags={tags}/>
    )
}
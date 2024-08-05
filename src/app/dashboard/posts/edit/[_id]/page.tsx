import PostFormEdit from "@/src/components/posts/form/postFormEdit"
import { collections } from "@/src/lib/data/commons/definitions"
import { findInCollection } from "@/src/lib/data/commons/utils"
import type {Post} from "@/src/lib/definitions/posts"
import { listTags } from "@/src/lib/tags"

interface EditPostPageProps{
    initialData?: Post
    searchParams:URLSearchParams
}

export default async function EditPostPage({params}:{params:{_id:string}}){
    const {_id} = params
    console.log("---------------------EditPostPage: ",_id)
    const post = await findInCollection({collection: collections.posts, _id})
    console.log({post})
    const tags = (await listTags()).items;
    return(
        <PostFormEdit initialData={post} tags={tags}/>
    )
}
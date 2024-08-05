import PostFormEdit from "@/src/components/posts/form/postFormEdit"
import { collections } from "@/src/lib/data/commons/definitions"
import { findInCollection, listCollection } from "@/src/lib/data/commons/utils"
import type {Post} from "@/src/lib/definitions/posts"

interface EditPostPageProps{
    initialData?: Post
    searchParams:URLSearchParams
}

export default async function EditPostPage({initialData, searchParams}:EditPostPageProps) {
    const post = initialData ?? await findInCollection({collection: collections.posts, _id: "1"})
    const tags = (await listCollection({collection: collections.tags, paging: {page: 1, limit: -1}})).items
    return(
        <PostFormEdit initialData={post} tags={tags}/>
    )
}
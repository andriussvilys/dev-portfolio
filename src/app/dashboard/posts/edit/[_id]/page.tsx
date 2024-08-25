import { findPost } from "@/src/app/api/data/posts/utils"
import { listTags } from "@/src/app/api/data/tags/utils"
import PostFormEdit from "@/src/components/posts/form/postFormEdit"
import DashboardPage from "@/src/components/dashboard/dashboardPage/dashboardPage"
import { PageName } from "@/src/components/dashboard/constants"

export default async function EditPostPage({params}:{params:{_id:string}}){
    const {_id} = params

    const postQuery = await findPost(_id)
    const post = (await postQuery.json())

    const tagsQuery = await listTags({})
    const tags = (await tagsQuery.json()).items
    
    return(
        <DashboardPage name={PageName.POSTS_EDIT}>
            <PostFormEdit initialData={post} tags={tags}/>
        </DashboardPage>

    )
}
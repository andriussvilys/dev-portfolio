import { listCategories, listTags } from "@/src/lib/tags"
import { revalidatePath } from "next/cache"
import DashboardTag from "@/src/components/dashboard/dashboardTag"
import TagFormEdit from "@/src/components/tags/tagFormEdit"
import { getURL } from "@/src/lib/storage"
import { Tag } from "@/src/lib/definitions/tags"
import OverviewPage from "@/src/components/overviewPage/overviewPage"
import ActionButton from "@/src/components/overviewPage/actionButton"
import { getPaging } from "@/src/lib/data/commons/utils"
import { defaultPaging } from "@/src/lib/definitions/pages"

export default async function Page({searchParams}:{searchParams:URLSearchParams}) {

    revalidatePath("/dashboard/tags")
    const categories = await listCategories()
    const paging = getPaging(searchParams)
    const tagsData = await listTags(paging ?? defaultPaging)
    const tags:Tag[] = tagsData.items.map((tag:Tag) => {return {...tag, url: getURL(tag.key)}})
    const total = tagsData.total

    return (
        <OverviewPage 
            searchParams={searchParams} 
            itemCount={total} 
            actionButton={<ActionButton href="/dashboard/tags/create" buttonText="Create new Tag"/>}
        >
            {tags.map((tag:Tag) => {
                return(
                    <DashboardTag key={tag.key} tag={tag}>
                        <TagFormEdit categories={categories} tagData={tag}/>
                    </DashboardTag>
                )
            })}
        </OverviewPage>
    )
}
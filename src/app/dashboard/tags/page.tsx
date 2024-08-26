import { revalidatePath } from "next/cache"
import DashboardTag from "@/src/components/dashboard/dashboardTag"
import TagFormEdit from "@/src/components/tags/tagFormEdit"
import { TagRecord } from "@/src/lib/definitions/tags"
import OverviewPage from "@/src/components/overviewPage/overviewPage"
import { getPaging } from "@/src/lib/data/commons/utils"
import { defaultPaging } from "@/src/lib/definitions/pages"
import { listCategories, listTags } from "../../api/data/tags/utils"
import DashboardPage from "@/src/components/dashboard/dashboardPage/dashboardPage"
import { PageName } from "@/src/components/dashboard/constants"

export default async function Page({searchParams}:{searchParams:URLSearchParams}) {

    revalidatePath("/dashboard/tags")
    const categoriesQuery = await listCategories()
    const categories = await categoriesQuery.json()

    const paging = getPaging(searchParams)
    
    const tagsQuery = (await listTags({paging: paging ?? defaultPaging}))
    const tagsData = await tagsQuery.json()
    const tags = tagsData.items
    const total = tagsData.total

    return (
        <DashboardPage 
            name={PageName.TAGS_OVERVIEW}
            buttons={[
                {name:PageName.TAGS_CREATE, href:"/dashboard/tags/create"},
                {name:PageName.TAGS_SORT, href:"/dashboard/tags/sort"}
            ]}
        >
            <OverviewPage 
                searchParams={searchParams} 
                itemCount={total} 
            >
                {tags.map((tag:TagRecord) => {
                    return(
                        <DashboardTag key={tag._id} tag={tag}>
                            <TagFormEdit categories={categories} tag={tag}/>
                        </DashboardTag>
                    )
                })}
            </OverviewPage>
        </DashboardPage>
    )
}
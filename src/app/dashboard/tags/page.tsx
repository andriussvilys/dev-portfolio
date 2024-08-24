import { revalidatePath } from "next/cache"
import DashboardTag from "@/src/components/dashboard/dashboardTag"
import TagFormEdit from "@/src/components/tags/tagFormEdit"
import { TagRecord } from "@/src/lib/definitions/tags"
import OverviewPage from "@/src/components/overviewPage/overviewPage"
import ActionButton from "@/src/components/overviewPage/actionButton"
import { getPaging } from "@/src/lib/data/commons/utils"
import { defaultPaging } from "@/src/lib/definitions/pages"
import { Button } from "@mui/material"
import { listCategories, listTags } from "../../api/data/tags/utils"

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
        <OverviewPage 
            searchParams={searchParams} 
            itemCount={total} 
            actionButton={<ActionButton href="/dashboard/tags/create" buttonText="Create new Tag"/>}
        >
            {tags.map((tag:TagRecord) => {
                return(
                    <DashboardTag key={tag._id} tag={tag}>
                        <TagFormEdit categories={categories} tag={tag}/>
                    </DashboardTag>
                )
            })}
            <Button href="/dashboard/tags/sort">Sort Tags</Button>
        </OverviewPage>
    )
}
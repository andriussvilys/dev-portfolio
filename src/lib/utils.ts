import { overviewPageLimit, OverviewPageParams } from "./definitions/pages"

const parseParams = (params:any):OverviewPageParams => {
    const parsed:OverviewPageParams = {
        page: 1,
        limit: overviewPageLimit
    }
    const pageParam = params.page
    const limitParam = params.limit
    if(pageParam){
        parsed.page = parseInt(pageParam)
    }
    if(limitParam){
        parsed.limit = parseInt(limitParam)
    }
    return parsed
}

export {parseParams}
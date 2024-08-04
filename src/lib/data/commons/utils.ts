import { defaultPaging, overviewPageLimit, PagingParams } from "../../definitions/pages"
import { ListCollectionReq } from "./definitions"

const getPaging = (params:URLSearchParams):PagingParams => {
    const parsed:PagingParams = defaultPaging
    if(!!params){
        if(params instanceof URLSearchParams){
            const pageParam = params.get("page")
            const limitParam = params.get("limit")
            if(pageParam && limitParam){
                parsed.page = parseInt(pageParam)
                parsed.limit = parseInt(limitParam)
            }
        }
        else{
            const pageParam = (params as any).page
            const limitParam = (params as any).limit
            if(pageParam && limitParam){
                parsed.page = parseInt(pageParam)
                parsed.limit = parseInt(limitParam)
            }
        }
    }
    return parsed
}

const listCollection = async (params:ListCollectionReq) => {
    const {collection, paging} = params
    const {page, limit} = paging || defaultPaging
    const query = `?page=${page}&limit=${limit}`
    try{
        const res = await fetch(`http://localhost:3000/api/data/${collection}${query}`, {method: 'GET', cache: 'no-store'})
        return await res.json()
    }
    catch(e){
        throw new Error((e as Error).message)
    }
}

export {getPaging, listCollection}
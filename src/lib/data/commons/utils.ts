import { defaultPaging, overviewPageLimit, PagingParams } from "../../definitions/pages"
import { collections, ListCollectionReq, ListCollectionRes } from "./definitions"

const getPaging = (params:URLSearchParams):PagingParams|undefined => {
    if(!!params){
        const parsed:PagingParams = {...defaultPaging}
        if(params instanceof URLSearchParams){
            const pageParam = params.get("page")
            const limitParam = params.get("limit")
            if(pageParam && limitParam){
                parsed.page = parseInt(pageParam)
                parsed.limit = parseInt(limitParam)
            }
            else{return undefined}
        }
        else{
            const pageParam = (params as any).page
            const limitParam = (params as any).limit
            if(pageParam && limitParam){
                parsed.page = parseInt(pageParam)
                parsed.limit = parseInt(limitParam)
            }
            else{return undefined}
        }
        return parsed
    }
    return undefined
}

async function listCollection<T>(params:ListCollectionReq):Promise<ListCollectionRes<T>>{
    const {collection, paging} = params
    const pagingQuery = paging ? `?page=${paging.page}&limit=${paging.limit}` : ''
    try{
        const res = await fetch(
            `http://localhost:3000/api/data/${collection}${pagingQuery}`, 
            {method: 'GET', cache: 'no-cache'})
        return await res.json()
    }
    catch(e){
        throw new Error((e as Error).message)
    }
}

async function findItem<T>(params: {collection: collections, _id: string}):Promise<T>{
    const {collection, _id} = params
    try{
        const res = await fetch(`http://localhost:3000/api/data/${collection}/${_id}`, {
            method: 'GET', 
            cache: 'no-store'
        })
        if(res.status !== 200){
            throw new Error(`${res.status}: ${res.statusText}`)
        }
        return await res.json()
    }
    catch(e){
        throw new Error((e as Error).message)
    }
}

async function updateItem(params: {collection: collections, _id: string, body: FormData}){
    const {collection, _id, body} = params
    try{
        const res = await fetch(`http://localhost:3000/api/data/${collection}/${_id}`, {
            method: 'PUT',
            cache: 'no-store',
            body: body,
        })
        return res.json()
    }
    catch(e){
        throw new Error((e as Error).message)
    }
}

async function deleteItem(params: {collection: collections, _id: string}){
    const {collection, _id} = params
    try{
        const res = await fetch(`http://localhost:3000/api/data/${collection}/${_id}`, {
            method: 'DELETE',
            cache: 'no-store',
        })
        return res.json()
    }
    catch(e){
        throw new Error((e as Error).message)
    }
}

const createItem = async (params: {collection:collections, formData: FormData}) => {
    try{
        const dbRes = await fetch(`/api/data/${params.collection}`, {
            method: 'POST',
            cache: 'no-store',
            body: params.formData,
        })
        return await dbRes.json()
    }
    catch(e){
        throw e
    }
}

export {getPaging, listCollection, findItem, updateItem, deleteItem, createItem}
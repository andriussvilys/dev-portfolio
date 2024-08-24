import { collections } from "@/src/lib/data/commons/definitions"
import { createItem, deleteItem, ErrorResponse, findItem, queryCollection, updateItem } from "../commons"
import { NextResponse } from "next/server"
import { PagingParams } from "@/src/lib/definitions/pages"
import { TagInput, TagRecord } from "@/src/lib/definitions/tags"
import { deleteFile, uploadFile } from "../../storage/utils"
import { StorageFile } from "@/src/lib/definitions/fileUpload"

const parseTagFormData = (formData: FormData): TagInput => {
    const name = formData.get("name")?.toString() ?? "";
    const category = formData.get("category")?.toString() ?? "";
    const file = JSON.parse(formData.get("file") as string)
    const categoryIndex = JSON.parse(formData.get("categoryIndex") as string)
    const body:TagInput = {name, category, file, categoryIndex}
    return body
  }

const listCategories = async ():Promise<NextResponse> => {
    try{
        const tagQuery = await queryCollection({collection: collections.tags, query: {}})
        const tagData = (await tagQuery.json()).items
        const categories:string[] = tagData.map((tag: any) => tag.category)
        const uniqueCategories = categories.filter((value, index, self) => self.indexOf(value) === index)
        return NextResponse.json(uniqueCategories, {status: 200})
    }
    catch(e){
        return NextResponse.json({status: "fail", error: e}, {status: 500})
    }
}

const listTags = async ({paging}:{paging?: PagingParams}):Promise<NextResponse> => {
    try{
        const tagsQuery = await queryCollection<TagRecord>({collection:collections.tags, paging})
        const tagsData = (await tagsQuery.json())
        const items:TagRecord[] = tagsData.items
        const total = tagsData.total
        const sortedTags:TagRecord[] = items.sort((a, b) => a.categoryIndex - b.categoryIndex)
        return NextResponse.json({items:sortedTags, total}, {status: 200})
    }
    catch(e){
        return NextResponse.json({status: "fail", error: e}, {status: 500})
    }
}

const findTag = async (_id: string) => {
    try{
        const tagQuery = await findItem({collection: collections.tags, _id})
        const tag:TagRecord = await tagQuery.json()
        return NextResponse.json(tag, {status: 200})
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500})
    }
}

const uploadTagFile = async (file: File):Promise<NextResponse<StorageFile> | ErrorResponse> => {
    try{
        const collection = collections.tags
        const storageRes = await uploadFile(file, collection)
        if(!storageRes.ok){
            throw new Error(storageRes.statusText)
        }
        const storageData = await storageRes.json()
        const storageFile = {key: storageData.key, metadata: storageData.metadata, url: storageData.url}
        return NextResponse.json(storageFile, {status: 200}) as NextResponse<StorageFile>
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500}) as ErrorResponse
    }
}

const createTag = async (formData: FormData) => {
    try{
        const file:File = formData.get("file") as File
        const storageResponse = await uploadTagFile(file)
        const storageFile = await storageResponse.json()

        formData.delete("file")
        formData.append("file", JSON.stringify(storageFile))

        try{
            const parsedFormData = parseTagFormData(formData)
            const res = await createItem({collection: collections.tags, body: parsedFormData})
            return res
        }
        catch(e){
            const key = storageFile.key
            await deleteFile(key)
            return NextResponse.json({ status: "fail", error: e }, {status: 500})
        }
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500})
    }
}

const replaceTagFile = async (file: File, key: string):Promise<NextResponse<StorageFile> | ErrorResponse> => {
    try{
        const deleteRes = await deleteFile(key)
        if(!deleteRes.ok){
            return NextResponse.json({ status: "fail", error: deleteRes.statusText }, {status: 500}) as ErrorResponse
        }
        const collection = collections.tags
        const storageRes = await uploadFile(file, collection)
        if(!storageRes.ok){
            return NextResponse.json({ status: "fail", error: storageRes.statusText }, {status: 500}) as ErrorResponse
        }
        const storageData = await storageRes.json()
        const storageFile = {key: storageData.key, metadata: storageData.metadata, url: storageData.url}
        return NextResponse.json(storageFile, {status: 200}) as NextResponse<StorageFile>
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500}) as ErrorResponse
    }
}

const updateTag = async (formData: FormData, _id: string) => {
    try{
        const file = formData.get("file") as File
        if(file && file instanceof File){
            const tagQuery = await findTag(_id)
            const tag = await tagQuery.json()
            const storageRes = await replaceTagFile(file, tag.file.key)
            if(!storageRes.ok){
                return NextResponse.json({status:"fail", error:storageRes.statusText}, {status: 500})
            }
            const storageFile = await storageRes.json()
            formData.delete("file")
            formData.append("file", JSON.stringify(storageFile))
        }
        const parsedFormData = parseTagFormData(formData)
        const res = await updateItem({collection: collections.tags, _id, body: parsedFormData})
        return res
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500})
    }
}

const deleteTag = async (_id: string) => {
    try{
        const tagQuery = await findTag(_id)
        const tag = await tagQuery.json()
        const key = tag.file.key
        const deleteRes = await deleteFile(key)
        if(!deleteRes.ok){
            return NextResponse.json({ status: "fail", error: deleteRes.statusText }, {status: 500})
        }
        const res = await deleteItem({collection: collections.tags, _id})
        return res
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500})
    }
}

export {parseTagFormData, listCategories, listTags, findTag, createTag, updateTag, deleteTag}

import { collections, ListCollectionRes } from "@/src/lib/data/commons/definitions"
import { createItem, deleteItem, findItem, queryCollection, updateItem } from "../commons"
import { PostInput, PostRecord, PostWithTags } from "@/src/lib/definitions/posts"
import { ObjectId } from "mongodb"
import { TagRecord } from "@/src/lib/definitions/tags"
import { PagingParams } from "@/src/lib/definitions/pages"
import { NextResponse } from "next/server"
import { deleteFile, getURL, uploadFile } from "../../storage/utils"
import { StorageFile } from "@/src/lib/definitions/fileUpload"

const parsePostFormData = (formData: FormData): PostInput => {
    const files = formData.get("storageFile") ? formData.getAll("storageFile").map(entry => {
        return JSON.parse(entry as string)
    }) : []

    const tags = formData.get("tags") ? JSON.parse(formData.get("tags") as string) : []
    const order = formData.get("order") ? parseInt(formData.get("order") as string) : 0

    return {
        name: formData.get("name")?.toString() ?? "",
        description: formData.get("description")?.toString() ?? "",
        liveSite: formData.get("liveSite")?.toString() ?? "",
        github: formData.get("github")?.toString() ?? "",
        order,
        files,
        tags,
    }
}

const listPosts = async ({paging}:{paging?: PagingParams}):Promise<NextResponse<ListCollectionRes<PostWithTags>>> => {
    try{
        const postsQuery = await queryCollection({collection:collections.posts, paging})
        const postsData = await postsQuery.json()
        const posts:PostRecord[] = postsData.items
        const total = postsData.total

        const tagIds = posts
            .map(post => post.tags)
            .flat()
            .filter((value, index, self) => self.indexOf(value) === index)
            .map(id => new ObjectId(id))

        const tagsQuery = await queryCollection({
            collection:collections.tags, 
            query: {_id: {$in: tagIds}}
        })
        const tagsData = await tagsQuery.json()
        const tags:TagRecord[] = tagsData.items

        const postsWithTags:PostWithTags[] = posts.map(post => {
            const postTags = post.tags.map(tagId => tags.find(tag => tag._id === tagId)).filter(tag => !!tag)
            return {...post, tags: postTags, files:post.files}
        })
        return NextResponse.json({items:postsWithTags, total}, {status: 200});
    }
    catch(e){
        throw e
    }
}

const uploadPostMedia = async (files: File[]) => {
    try{
        const uploadPromises = files.map((file:File) => {
          return uploadFile(file, collections.posts)
        });
        const storageRes = await Promise.all(uploadPromises);
        const failedUploads = storageRes.filter(res => !res.ok)
        if(failedUploads.length > 0){
            const successfulUploads = storageRes.filter(res => res.ok)
            const successfulUploadsData = await Promise.all(successfulUploads.map(res => res.json()))
            const keys = successfulUploadsData.map(res => res.key)
            const deletePromises = keys.map(key => deleteFile(key))
            await Promise.all(deletePromises)
            const errorString = failedUploads.map(res => res.statusText).join(",\n ")
            throw new Error(errorString)
        }
        const storageData = await Promise.all(storageRes.map(res => res.json()))
        const storageFiles = storageData.map(res => {return {key: res.key, metadata: res.metadata, url:res.url}})
        return storageFiles
    }
    catch(e){
        throw e
    }
}

const createPost = async (formData: FormData) => {
    try{
        const files:File[] = formData.getAll("file") as File[]
        const storageRes = await uploadPostMedia(files)
        storageRes.forEach((res) => {
            const storageFile = JSON.stringify(res)
            formData.append("storageFile", storageFile)
        })
        try{
            const parsedFormData = parsePostFormData(formData)
            const res = await createItem({collection: collections.posts, body: parsedFormData})
            return res
        }
        catch(e){
            const keys = storageRes.map(res => res.key)
            const deletePromises = keys.map(key => deleteFile(key))
            await Promise.all(deletePromises)
            return NextResponse.json({ status: "fail", error: e }, {status: 500})
        }
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500})
    }
}

const deletePost = async (_id: string) => {
    // delete storage objects first; if file delete fails, 
    // the record will be visible without image
    // in the front and user can try again to delete record
    const collection = collections.posts
    try{
        const postQuery = await findItem({collection, _id})
        const post:PostRecord = await postQuery.json()
        const deleteObjectPromises = post.files.map((file:any) => {
            return deleteFile(file.key)
          });
        const storageRes = await Promise.all(deleteObjectPromises);
        const dataRes = await deleteItem({collection, _id})
        return NextResponse.json({storageRes, dataRes}, {status: 200})
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500})
    }
}

const updatePost = async (formData: FormData, _id: string) => {
    try{
        const files:File[] = formData.getAll("file") as File[]

        // 1) delete removed files
        const postQuery = await findItem({collection: collections.posts, _id})
        const postData:PostRecord = await postQuery.json()
        const storageFiles = formData.getAll("storageFile");
        const storageKeys:string[] = storageFiles.map((file) => (JSON.parse(file as string) as StorageFile).key);
        const previousKeys = postData.files.map(file => file.key)
        const filesToDelete = previousKeys.filter(key => {
            return !storageKeys.includes(key)
        })
        const deletePromises = filesToDelete.map(key => deleteFile(key))
        await Promise.all(deletePromises)

        // 2) upload new files
        const storageRes = await uploadPostMedia(files)
        storageRes.forEach((res) => {
            const storageFile = JSON.stringify(res)
            formData.append("storageFile", storageFile)
        })

        // 3) update post table data
        try{
            const parsedFormData = parsePostFormData(formData)
            console.log("parsedFormData", parsedFormData)
            const res = await updateItem({collection: collections.posts, _id, body: parsedFormData})
            return res
        }
        catch(e){
            const keys = storageRes.map(res => res.key)
            const deletePromises = keys.map(key => deleteFile(key))
            await Promise.all(deletePromises)
            return NextResponse.json({ status: "fail", error: e }, {status: 500})
        }
    }
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500})
    }
}

export {parsePostFormData, listPosts, createPost, deletePost, updatePost}
import { collections, ListCollectionRes } from "@/src/lib/data/commons/definitions"
import { createItem, queryCollection } from "../commons"
import { PostRecord, PostWithTags } from "@/src/lib/definitions/posts"
import { ObjectId } from "mongodb"
import { TagRecord } from "@/src/lib/definitions/tags"
import { PagingParams } from "@/src/lib/definitions/pages"
import { NextResponse } from "next/server"
import { getURL } from "@/src/lib/storage"
import { deleteFile, uploadFile } from "../../storage/utils"
import { parsePostFormData } from "@/src/lib/posts"

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
            const files = post.files.map(file => {return {...file, url: getURL(file.key)}})
            return {...post, tags: postTags, files}
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
        const storageFiles = storageData.map(res => {return {key:res.key, metadata:res.metadata}})
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
            const {key, metadata} = res
            const fileData = JSON.stringify({key, metadata})
            formData.append("storageFile", fileData)
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
            throw e
        }
    }
    catch(e){
        throw e
    }
}

export {listPosts, createPost}
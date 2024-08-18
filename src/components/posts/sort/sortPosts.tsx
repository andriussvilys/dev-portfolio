"use client"

import React from 'react'
import Sortable from '../../sortable/sortable'
import { PostFormInput, PostRecord, PostWithTags } from '@/src/lib/definitions/posts'
import PostPreview from './postPreview'
import { processInput, updatePost } from '@/src/lib/posts'

interface SortPostsProps {
    items: PostWithTags[]
}
export default function SortPosts({items}:SortPostsProps) {
    const handleSubmit = async (items:PostWithTags[]) => {
        const orderedItems:PostRecord[] = items.map((item, index) => {
            return {
                ...item, 
                order:index,
                tags: item.tags.map(tag => tag._id)
            }
        })
        const updatePromises = orderedItems.map(item => {
            const formInput:PostFormInput = {
                ...item, 
                storageFiles: item.files, 
                files:[]
            }
            const formData = processInput(formInput)
            console.log(formInput)
            return updatePost(formData, item._id)
          })
          await Promise.all(updatePromises)
    }
    return(
        <Sortable 
            items={items}
            Component={PostPreview}
            handleSubmit={handleSubmit}
        />
    )
}

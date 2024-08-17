"use client"

import React from 'react'
import Sortable from '../../sortable/sortable'
import { PostWithTags } from '@/src/lib/definitions/posts'
import PostPreview from './postPreview'

interface SortPostsProps {
    items: PostWithTags[]
}
export default function SortPosts({items}:SortPostsProps) {
    const handleSubmit = async (items:PostWithTags[]) => {
        console.log(items)
    }
    return(
        <Sortable 
            items={items}
            Component={PostPreview}
            handleSubmit={handleSubmit}
        />
    )
}

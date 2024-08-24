"use client"

import React, { useState } from 'react'
import Sortable from '../../sortable/sortable'
import { PostFormInput, PostRecord, PostWithTags } from '@/src/lib/definitions/posts'
import PostPreview from './postPreview'
import { processInput, updatePost } from '@/src/lib/posts'
import { Box, Button, Stack } from '@mui/material'
import LoadingBackdrop from '../../loading/backdrop/loadingBackdrop'
import { verticalListSortingStrategy } from '@dnd-kit/sortable'
import useLoading from '../../loading/backdrop/useLoading'

interface SortPostsProps {
    items: PostWithTags[]
}
export default function SortPosts(props:SortPostsProps) {
    const [posts, setPosts] = useState(props.items)
    const {backdrop, toast} = useLoading()
    const {loading, setLoading} = backdrop
    const {toastStatus, setToastStatus, closeToast} = toast
    
    const handleSubmit = async (items:PostWithTags[]) => {
        setLoading(true)
        try{
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
                return updatePost(formData, item._id)
              })
              await Promise.all(updatePromises)
              setToastStatus({message: "Posts rearranged", open:true, severity:"success"})
        }
        catch(e){
            setToastStatus({message: (e as Error).message, open:true, severity:"error"})
            throw e
        }
        finally{
            setLoading(false)
        }
    }
    const rearrangeCallback = (rearrangedItems:PostWithTags[]) => {
        setPosts(rearrangedItems)
    }
    return(
        <Box sx={{
            height:1, 
            width:1,
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}>
            <LoadingBackdrop open={loading} toastStatus={toastStatus} closeToast={closeToast}/>     
            <Stack 
                sx={{
                    alignItems:"end"
                }} 
                gap={4}>
                <Sortable 
                    items={posts}
                    Component={PostPreview}
                    rearrangeCallback={rearrangeCallback}
                    strategy={verticalListSortingStrategy}
                />
                <Button variant="contained" onClick={()=>{handleSubmit(posts)}}>Submit</Button>
            </Stack>
        </Box>
    )
}

"use client"

import { TagFormInput, TagRecord } from "@/src/lib/definitions/tags";
import Sortable from "../sortable/sortable";
import { processInput, updateTag } from "@/src/lib/tags";
import Tag from "./tag";
import { Box, Button, Divider, Stack } from "@mui/material";
import { useState } from "react";
import LoadingBackdrop from "../loading/backdrop/loadingBackdrop";
import Toast, {ToastData} from "../loading/toast/toast";

interface SortTagsProps {
    items: TagRecord[]
}

export default function SortTags(props:SortTagsProps) {
    
    const [tags, setTags] = useState(props.items)
    const [loading, setLoading] = useState(false);
    const [toastStatus, setToastStatus] = useState<ToastData>({message:"", open:false});

    const handleSubmit = async (items:TagRecord[]) => {
        setLoading(true)
        try{
            const indexed:TagRecord[] = items.map((item, index) => {
                return {...item, categoryIndex: index}
            })
            const updatePromises = indexed.map(item => {
              const input: TagFormInput = {
                name: item.name,
                category: item.category,
                categoryIndex: item.categoryIndex,
                file: item.file 
              }
              const formData = processInput(input)
              return updateTag(formData, item._id)
            })
            await Promise.all(updatePromises)
            setToastStatus({message: "Tags updated", open:true})
        }
        catch(e){
            setToastStatus({message: (e as Error).message, open:true})
            throw e
        }
        finally{
            setLoading(false)
        }
    }

    const rearrangeCallback = (items:TagRecord[]) => {
        setTags(items)
    }

    console.log({toastStatus})

    return(
        <>
            <LoadingBackdrop open={loading}/>
            <Toast 
                message={toastStatus.message} 
                open={toastStatus.open}
                toggleOpen={()=>setToastStatus(prev => {return {message: prev.message, open:!prev.open}})}
            />
            <Button onClick={()=>{
                setToastStatus(prev => {return {message: "Toast toggled", open:!prev.open}})
            }}>Toggle Toast</Button>
            <Stack sx={{flex:1}}>
                <Box sx={{
                    flex:1,
                    display:"flex", 
                    justifyContent:"space-between", 
                    alignItems:"center"
                }}>
                    <Sortable 
                        items={tags}
                        Component={Tag}
                        rearrangeCallback={rearrangeCallback}
                    />
                    <Button onClick={()=>{handleSubmit(tags)}}>Submit</Button>
                </Box>
                <Divider/>
            </Stack>
        </>
    )
}
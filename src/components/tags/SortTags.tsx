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
    const [toastStatus, setToastStatus] = useState<ToastData>({message:"", open:false, severity:"info"});

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
            setToastStatus({message: "Tags updated", open:true, severity:"success"})
        }
        catch(e){
            setToastStatus({message: (e as Error).message, open:true, severity:"error"})
            throw e
        }
        finally{
            setLoading(false)
        }
    }

    const rearrangeCallback = (items:TagRecord[]) => {
        setTags(items)
    }

    return(
        <>
            <LoadingBackdrop open={loading}/>
            <Toast 
                message={toastStatus.message} 
                open={toastStatus.open}
                severity={toastStatus.severity}
                toggleOpen={()=>setToastStatus(prev => {return {...prev, open:!prev.open}})}
            />
            <Stack sx={{width:1}}>
                <Box sx={{
                    flex:1,
                    display:"flex", 
                    justifyContent:"space-between", 
                    alignItems:"center",
                    gap:2,
                    mb:1
                }}>
                    <Box sx={{flex:1, overflow:"auto"}}>
                        <Box sx={{m:2, ml:0}}>
                            <Sortable 
                                items={tags}
                                Component={Tag}
                                rearrangeCallback={rearrangeCallback}
                            />
                        </Box>
                    </Box>
                    <Button variant="contained" onClick={()=>{handleSubmit(tags)}}>Submit</Button>
                </Box>
                <Divider/>
            </Stack>
        </>
    )
}
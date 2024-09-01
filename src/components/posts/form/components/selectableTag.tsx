"use client"

import { TagRecord } from "@/src/lib/definitions/tags";
import { useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import Tag from "../../../tags/tag";

type SelectableTagData = TagRecord & {formField:{root:string, index:number}}

interface SelectableTagProps{
    data: SelectableTagData
}

export default function SelectableTag({data}:SelectableTagProps){
    const {getValues, setValue} = useFormContext()
    const {root, index} = data.formField
    const values = getValues(root)
    return(
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", flex:1}}>
            <Tag data={data} />
            <input 
                type="checkbox" 
                onChange={(e) => {
                    const checked = e.target.checked
                    if(checked){
                        const update = [...values, data._id]
                        setValue(root, update)
                    }
                    else{
                        const update = values.filter((id:string) => id !== data._id)
                        setValue(root, update)
                    }
                }}
                value={data._id}
                checked={values.includes(data._id)}
            />
        </Box>
    )
}

export type {SelectableTagData}
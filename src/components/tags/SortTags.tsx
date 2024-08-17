"use client"

import { TagFormInput, TagRecord } from "@/src/lib/definitions/tags";
import Sortable from "../sortable/sortable";
import { processInput, updateTag } from "@/src/lib/tags";
import Tag from "./tag";

interface SortTagsProps {
    categoryName: string
    categories: {[key:string]:TagRecord[]}
}

export default function SortTags({categoryName, categories}:SortTagsProps) {
    const handleSubmit = async (items:TagRecord[]) => {
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
    }
    return(
        <Sortable 
            items={categories[categoryName]}
            Component={Tag}
            handleSubmit={handleSubmit}
        />
    )
}
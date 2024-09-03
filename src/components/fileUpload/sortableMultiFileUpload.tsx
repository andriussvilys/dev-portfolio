import React from 'react'
import MultiFielUploadField, { MultiFileUploadFieldProps } from './multiFileUploadField'
import { HasId } from '@/src/lib/definitions/commons'

interface SortableMultiFielUploadData extends HasId, MultiFileUploadFieldProps{}
interface SortableMultiFielUploadProps{
  data: SortableMultiFielUploadData
} 

export default function SortableMultiFileUpload({data}:SortableMultiFielUploadProps) {
  return (
      <MultiFielUploadField {...data}/>
  )
}

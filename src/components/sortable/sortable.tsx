"use client"

import React, {useState} from 'react';
import {
  closestCenter,
  DndContext, 
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import {SortableItem} from './sortableItem';
import { Box, Button } from '@mui/material';
import { TagFormInput, TagRecord } from '@/src/lib/definitions/tags';
import Tag from '../tags/tag';
import { processInput, updateTag } from '@/src/lib/tags';
import LoadingBackdrop from '../loading/backdrop/loadingBackdrop';
import Toast, { ToastProps } from '../loading/toast/toast';

interface SortableProps {
    items: TagRecord[],
}

export default function Sortble(props:SortableProps) {
  const [loading, setLoading] = useState(false);
  const [toastStatus, setToastStatus] = useState<ToastProps>({message:"", open:false});
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(props.items);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event:any) => {
    const {active} = event;
    setActiveId(active.id);
  }
  
  const handleDragEnd = (event:any) => {
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setItems((items) => {
        const ids = items.map(item => item._id);
        const oldIndex = ids.indexOf(active.id);
        const newIndex = ids.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    
    setActiveId(null);
  }

  const handleSubmit = async () => {
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
      setToastStatus({message:"Successfully saved", open:true})
    }
    catch(e){
      setToastStatus({message:"Failed to save", open:true})
      throw e
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <>
      <LoadingBackdrop open={loading}/>
      <Toast message={toastStatus.message} open={toastStatus.open} />
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={items.map(item => item._id)}
          strategy={horizontalListSortingStrategy}
        >
          {items.map(tag => {
            return (
              <SortableItem 
                key={tag._id} 
                id={tag._id}
                >
                  <Box sx={{ 
                      border:"1px solid",
                      p:"2px",
                      opacity: activeId === tag._id ? 0.2 : 1
                    }}>
                      <Tag tag={tag}/>
                  </Box>
              </SortableItem>
          )})}
        </SortableContext>
        <DragOverlay>
          {activeId ? 
          <Box sx={{
              border:"1px solid",
              p:"2px",
              bgcolor:"white"
            }}>
            {props.items.find(item => item._id === activeId) ? <Tag tag={props.items.find(item => item._id === activeId)!}/> : null}
          </Box>
              : null
          }
        </DragOverlay>
        <Button onClick={()=>handleSubmit()}>Save</Button>
      </DndContext>
    </>
  );
}
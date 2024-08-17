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
import { processInput, updateTag } from '@/src/lib/tags';
import LoadingBackdrop from '../loading/backdrop/loadingBackdrop';
import Toast, { ToastProps } from '../loading/toast/toast';

interface HasId {
  _id: string;
}

interface SortableProps<T extends HasId> {
    items: T[],
    Component: React.FC<{data:T}>,
    handleSubmit: (items:T[]) => Promise<any>
}

export default function Sortable<T extends HasId>(props:SortableProps<T>) {
  const {Component} = props;
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

  const onSubmit = async () => {
    try{
      setLoading(true)
      await props.handleSubmit(items)
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
                      <Component data={tag}/>
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
            {props.items.find(item => item._id === activeId) ? <Component data={props.items.find(item => item._id === activeId)!}/> : null}
          </Box>
              : null
          }
        </DragOverlay>
        <Button onClick={()=>onSubmit()}>Save</Button>
      </DndContext>
    </>
  );
}
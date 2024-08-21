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
import {Box} from '@mui/material';
import DragHandle from './dragHandle';
import { HasId } from '@/src/lib/definitions/commons';

interface SortableProps<T extends HasId> {
    items: T[],
    Component: React.FC<{data:T}>,
    rearrangeCallback: (items:T[]) => void    
}

export default function Sortable<T extends HasId>(props:SortableProps<T>) {
  const [activeId, setActiveId] = useState(null);
  const {items, Component, rearrangeCallback} = props;
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
      const ids = items.map(item => item._id);
      const oldIndex = ids.indexOf(active.id);
      const newIndex = ids.indexOf(over.id);
      rearrangeCallback(arrayMove(items, oldIndex, newIndex))
    }
    setActiveId(null);
  }

  return (
    <>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Box sx={{display:"flex", overflow:"auto", p:2, pl:0}} gap={1}>
          <SortableContext 
            items={items.map(item => item._id)}
            strategy={horizontalListSortingStrategy}
          >
            {items.map(data => {
              return (
                <SortableItem key={data._id} id={data._id} >
                  <Component data={data}/>
                </SortableItem>
            )})}
          </SortableContext>
        </Box>
        <DragOverlay>
          {activeId && props.items.find(item => item._id === activeId) ? 
            <Box sx={{
                display:"flex", 
                justifyContent:"space-between", 
                bgcolor:"white",
                boxShadow: 3,
                border: "1px solid",
                padding: "4px",
              }}>
              <Component data={props.items.find(item => item._id === activeId)!}/>
              <DragHandle/>
            </Box>
            : null
          }
        </DragOverlay>
      </DndContext>
    </>
  );
}
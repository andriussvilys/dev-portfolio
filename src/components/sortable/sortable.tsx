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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {SortableItem} from './sortableItem';
import { Item } from './item';
import { Box } from '@mui/material';
import { TagRecord } from '@/src/lib/definitions/tags';
import Tag from '../tags/tag';

interface SortableProps {
    items: TagRecord[],
}

export default function Sortble(props:SortableProps) {
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

  return (
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
    </DndContext>
  );
}
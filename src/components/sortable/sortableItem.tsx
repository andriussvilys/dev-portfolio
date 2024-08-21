import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Box} from '@mui/material';
import DragHandle from './dragHandle';

export function SortableItem({id, children}:{id:string, children:React.ReactNode}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    active
  } = useSortable({id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: active?.id === id ? 0.2 : 1,
    border: "1px solid",
    padding: "4px",
    transition
  };
  
  return (
    <Box 
      ref={setNodeRef} 
      {...attributes} 
      sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}
      style={style}
    >
        {children}
        <DragHandle listeners={listeners}/>
    </Box>
  );
}
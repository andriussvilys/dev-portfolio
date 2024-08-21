import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Box, Button } from '@mui/material';
import {DragIndicator as DragIndicatorIcon} from '@mui/icons-material';
import { grey } from '@mui/material/colors';

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
        <Button sx={{cursor:"grab", p:0, m:0, justifyContent:"end"}}>
          <DragIndicatorIcon
            sx={{color:grey[600]}}
            {...listeners}
          />
        </Button>
    </Box>
  );
}
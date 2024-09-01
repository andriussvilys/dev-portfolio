import React from 'react'
import { Button } from '@mui/material'
import {DragIndicator as DragIndicatorIcon} from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

type DragHandleProps = {
    listeners?: SyntheticListenerMap 
}
export default function DragHandle(props:DragHandleProps) {
    const {listeners} = props;
    return (
        <Button sx={{cursor:"grab", p:0, m:0, justifyContent:"end", minWidth:0}}>
            <DragIndicatorIcon {...listeners} sx={{color:grey[800]}}/>
        </Button>
    )
}

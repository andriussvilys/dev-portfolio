import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import FileUploadField, { FileUploadProps } from './fileUploadField'

interface MultiFielUploadFieldProps extends FileUploadProps{
    remove?: any,
}

export default function MultiFielUploadField(props: MultiFielUploadFieldProps) {
    const {rootFieldName, fieldIndex, initialData, append, disabled=false, remove} = props

  return (
    <Stack sx={{flex:0}} gap={2}>
        <Typography>index: {fieldIndex}</Typography>                                 
        <FileUploadField
            initialData={initialData}
            rootFieldName={rootFieldName}
            fieldIndex={fieldIndex}
            append={append}
            disabled={disabled}
        />
        {
            remove && 
            <Button 
                variant="contained"
                color="error"
                onClick={() => remove(fieldIndex)}
            >
                Remove
            </Button>
        }
    </Stack>
  )
}

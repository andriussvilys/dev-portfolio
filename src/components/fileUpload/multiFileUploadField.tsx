import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import FileUploadField, { FileUploadProps } from './fileUploadField'

interface MultiFileUploadFieldProps extends FileUploadProps{
    remove?: any,
}

export default function MultiFileUploadField(props: MultiFileUploadFieldProps) {
    const {rootFieldName, fieldIndex, initialData, append, disabled=false, remove} = props

    return (
        <Stack sx={{flex:0}} gap={2}>
            <span>{`${rootFieldName}.${fieldIndex}`}</span>
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

export type { MultiFileUploadFieldProps }
import { PostWithTags } from '@/src/lib/definitions/posts'
import { Box, Typography } from '@mui/material'
import React from 'react'

interface PostPreviewProps {
    data: PostWithTags
}

export default function PostPreview({data}:PostPreviewProps) {
  return (
    <Box>
        <Typography variant="h6">{data.name}</Typography>
    </Box>
  )
}

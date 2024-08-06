interface FileMetadata{
    width: number,
    height: number
}

interface FileData{
    data: File,
    metadata: FileMetadata
}

export type {FileMetadata, FileData}
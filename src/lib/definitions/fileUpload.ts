interface FileMetadata{
    width: number,
    height: number
}

interface FileData{
    data: File,
    metadata: FileMetadata
}

interface FileUpload{
    file: FileData
}

interface MultiFileUpload{
    files: FileUpload[]
}

export type {FileMetadata, FileData, FileUpload, MultiFileUpload}
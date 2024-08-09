interface FileMetadata{
    width: number,
    height: number
}

interface StorageFile{
    key: string,
    metadata: FileMetadata,
    url: string
}

export type {FileMetadata, StorageFile}
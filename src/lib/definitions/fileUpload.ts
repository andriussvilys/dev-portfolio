interface FileMetadata{
    width: number,
    height: number
}

interface StorageFile{
    key: string,
    metadata: FileMetadata,
    url: string
}

interface FileData<File>{
    file: File,
    metadata: FileMetadata
}

export type {FileMetadata, FileData, StorageFile}
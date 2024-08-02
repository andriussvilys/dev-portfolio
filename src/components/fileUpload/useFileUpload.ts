import { FileData, FileMetadata } from "@/src/lib/definitions/fileUpload";
import { useState } from "react";

export default function useFileUpload(){
    const [fileData, setFileData] = useState<FileData | null>(null)
    const setFile = async (file: File) => {
        const url = URL.createObjectURL(file)
        const metadata = await new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => {
                resolve({
                    width: img.naturalWidth,
                    height: img.naturalHeight
                })
            }
            img.src = url
        })
        setFileData({
            data: file,
            metadata: metadata as FileMetadata
        })
    }
    return {fileData, setFile}
}
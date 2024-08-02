import FileUploadField from "./fileUploadField";
import type { FileUploadProps } from "./fileUploadField";

interface MultiFileUploadProps extends FileUploadProps{
    srcs?: string[]
    files: FileList[]
}

export default function MultiFileUpload({setFile, setMetadata, files, srcs }: MultiFileUploadProps){
    return null
}

// export default function MultiFileUpload({control, setValue, fieldName, watch, srcs }: MultiFileUploadProps){
//     const files:FileList[] = watch(fieldName)
//     return (
//         <>
//             {
//                 !!files && Array.from(files).map((_, index) => {
//                     return(
//                         <FileUploadField
//                             control={control}
//                             setValue={setValue} 
//                             watch={watch}
//                             fieldName={`${fieldName}.${index}`}
//                             key={index} 
//                         />
//                     )
//                 })
//             }
//             <FileUploadField 
//                 control={control} 
//                 setValue={setValue} 
//                 fieldName={`${fieldName}.${files ? files.length : 0}`} 
//                 watch={watch}
//             />
//         </>
//     )
// }
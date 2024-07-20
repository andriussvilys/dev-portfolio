"use client"
import { usePathname } from "next/navigation"
import { FormEvent, useState } from "react"

// const getMetadata = async (file:File) => {
//     return new Promise((resolve, reject) => {
//         console.log("try getMetadata")
//         if (file.type.startsWith('image/')) {
//             const img = new Image();
//             img.onload = () => {
//                 console.log("loaded image"	)
//                 const metadata = {
//                 width: img.width,
//                 height: img.height
//                 };
//                 resolve(metadata)
//             }
//             img.onerror = () => {
//                 reject("Error loading image")
//             }
//             console.log("load image")
//             img.src = URL.createObjectURL(file);
//         }
//         else{
//             resolve({})
//         }
//     })
// }

const getMetadata = async (file:File) => {
    return new Promise((resolve, reject) => {
      console.log("try getMetadata");
      if (file.type.startsWith('image/')) {
        const img = new Image();
        img.onload = () => {
          console.log("loaded image");
          const metadata = {
            width: img.width.toString(),
            height: img.height.toString()
          };
          resolve(metadata);
        };
        img.onerror = () => {
          reject("Error loading image");
        };
        console.log("load image");
        img.src = URL.createObjectURL(file);
      } else {
        resolve({});
      }
    });
  };

export default function Page(){
    const [file, setFile] = useState<File | null>()
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const pathName = usePathname()
    const onFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]

        if(file){
            setFile(file)
            setName(file.name)
        }
    }
    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("handle submit")
        const formData = new FormData()
        if(file){
            console.log("file exists")
            const metadata = await getMetadata(file)
            console.log(metadata)
            formData.append("metadata", JSON.stringify(metadata))
            formData.append("file", file)
            formData.append("name", name)

            console.log(formData)
    
            const response = await fetch('/api/s3', {
                method: 'POST',
                body: formData,
              })
              await response.json()
              window.location.reload()
        }
        else{
            throw new Error("No file selected")
        }
    }
    return(
        <>
            <p>{pathName}</p>
            <form onSubmit={e => handleSubmit(e)}>
                <label htmlFor="fileInput"/>
                <input id="fileInput" type="file" onChange={e => onFileChange(e)}/>
                <label htmlFor="nameInput"/>
                <input id="nameInput" type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)}/>
                <label htmlFor="descriptionInput"/>
                <input id="descriptionInput" type="text" placeholder="description" value={description} onChange={e => setDescription(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
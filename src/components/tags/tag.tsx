import Image from 'next/image';
import { getURL } from '@/src/lib/storage';
import { Suspense } from 'react';

const getAlt = (tag: Tag) => {
    if(!tag){
        return "tag"
    }
    return tag.name ?? tag.key;
}

export default async function Tag({tag}: {tag: Tag}) {
    const {name, key, _id} = tag;
    return (
        <Suspense>
            <div style={{display:"flex", flexDirection:"column", marginBottom: "10px"}}>
                <Image width={150} height={150} src={getURL(tag.key)} alt={getAlt(tag)}/>
                <span>{name}</span>
                <p>{_id}</p>
            </div>
        </Suspense>
    )
}
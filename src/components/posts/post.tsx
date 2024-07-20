import Image from 'next/image';

interface PostProps {
    name: string;
}

const getURL = (key: string) => {
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/${key}`
}


export default function Post({name}: PostProps) {
    console.log(name)
    return (
        <div>
            <Image width={150} height={150} src={getURL(name)} alt={name}/>
            <button disabled={true}>Delete</button>
        </div>
    )
}
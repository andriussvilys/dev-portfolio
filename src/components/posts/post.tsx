import Image from 'next/image';
import DeleteButton from './deleteButton';
import Link from 'next/link';

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
            <DeleteButton name={name}/>
            <Link href={`/dashboard/edit/${name}`}>Edit</Link>
        </div>
    )
}
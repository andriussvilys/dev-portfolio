import { Metadata } from "next";
import Front from "../components/front/front";
import { listPosts } from "./api/data/posts/utils";
import { listTags } from "./api/data/tags/utils";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: 'Andrius Svilys | Software developer',
  description: '...',
}

export default async function Page() {
  revalidatePath("/")
  const postsQuery = await listPosts({})
  const posts = (await postsQuery.json()).items

  const tagsQuery = (await listTags({}))
  const tags =  (await tagsQuery.json()).items
  return (
      <Front posts={posts} tags={tags}/>
  );
}
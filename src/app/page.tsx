import { Metadata } from "next";
import Front from "../components/front/front";
import { Suspense } from "react";
import { listPosts } from "./api/data/posts/utils";
import { listTags } from "./api/data/tags/utils";

export const metadata: Metadata = {
  title: 'Andrius Svilys | Software developer',
  description: '...',
}

export default async function Page() {
  const postsQuery = await listPosts({})
  const posts = (await postsQuery.json()).items

  const tagsQuery = (await listTags({}))
  const tags =  (await tagsQuery.json()).items
  return (
    <Suspense>
      <Front posts={posts} tags={tags}/>
    </Suspense>
  );
}
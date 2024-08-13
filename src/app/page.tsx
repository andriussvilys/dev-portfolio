import { Metadata } from "next";
import Front from "../components/front/front";
import { listPosts } from "../lib/posts";
import { listTags } from "../lib/tags";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Andrius Svilys | Software developer',
  description: '...',
}

export default async function Page() {
  const posts = (await listPosts()).items
  const tags = (await listTags()).items
  return (
    <Suspense>
      <Front posts={posts} tags={tags}/>
    </Suspense>
  );
}
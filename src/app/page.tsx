import { Metadata } from "next";
import Front from "../components/front/front";

export const metadata: Metadata = {
  title: 'Andrius Svilys | Software developer',
  description: '...',
}

export default async function Page() {
  return (
    <Front/>
  );
}
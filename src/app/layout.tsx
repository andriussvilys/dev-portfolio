import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/authOptions";
import SigninButton from "../components/signin/signinButton";
import SignoutButton from "../components/signin/signoutButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <p>signed in: {(!!session?.user).toString()}</p>
        <SigninButton />
        <SignoutButton />
        <Link href="/dashboard">Dashboard</Link>
        {children}
      </body>
    </html>
  );
}

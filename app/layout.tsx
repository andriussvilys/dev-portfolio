import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/authOptions";
import SigninButton from "./(components)/signinButton";
import SignoutButton from "./(components)/signoutButton";

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
        {children}
      </body>
    </html>
  );
}

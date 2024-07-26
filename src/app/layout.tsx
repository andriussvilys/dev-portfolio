import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/authOptions";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Box, Button, Container, Link, Typography } from "@mui/material";
import "../style/global.css"

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
        <AppRouterCacheProvider>
            {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import "../style/global.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

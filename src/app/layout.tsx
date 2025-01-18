import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { LikedAlbumsProvider } from "@/app/Hooks/LikedAlbumsContext";

import { ThemeProvider } from "@/lib/providerTheme";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Data Music",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true} className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LikedAlbumsProvider>
            <Toaster position="bottom-left" />
            {children}
          </LikedAlbumsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

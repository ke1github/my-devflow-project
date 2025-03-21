import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ThemeProvider from "@/context/Theme";

const inter = localFont({
  src: "./fonts/InterVF.ttf", // Path to font file
  variable: "--font-inter", // CSS variable name
  weight: "100 200 300 400 500 700 800 900", // Font weights
});

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGroteskVF.ttf", // Path to font file
  variable: "--font-space-grotesk", // CSS variable name
  weight: "300 400 500 700", // Font weights
});

export const metadata: Metadata = {
  title: "Dev Overflow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {/* <ThemeProvider> is a custom component that wraps the NextThemesProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disbaleTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {
  ClerkProvider,
} from '@clerk/nextjs'

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillSync",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{variables: {colorPrimary: "#0bc382"}}}>
      <body className={`${bricolage.variable} antialiased`}>
        {" "}
        <Navbar />
        {children}
      </body>
      </ClerkProvider>
    </html>
  );
}

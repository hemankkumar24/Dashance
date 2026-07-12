import "./globals.css";
import LenisProvider from "./LenisProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Viewport, Metadata } from "next";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  verification: {
    google: "3HjCeOD9Wj1On6UcSk3_rrB2IK0Re6hMeVY2TXb3j8w",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-stone-100 max-w-[2000px] mx-auto">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

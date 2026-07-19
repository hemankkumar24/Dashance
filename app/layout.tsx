import "./globals.css";
import LenisProvider from "./LenisProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Viewport, Metadata } from "next";
import BodyWrapper from "./body-wrapper";
import { Toaster } from "sonner";
const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
      <BodyWrapper>
        <LenisProvider>{children}</LenisProvider>
        <Toaster
          position="top-center"
          richColors={false}
          expand
          toastOptions={{
            classNames: {
              toast: "rounded-3xl border border-stone-200/70 bg-stone-50/90 backdrop-blur-xl shadow-2xl px-5 py-4",
              title: "text-stone-900 font-semibold text-[15px]",
              description: "text-stone-500 text-sm",
              actionButton:
                "bg-blue-600 hover:bg-blue-500 rounded-xl text-white",
              cancelButton:
                "bg-stone-200 hover:bg-stone-300 rounded-xl text-stone-800",
              closeButton:
                "bg-white border border-stone-200 hover:bg-stone-100",
            },
          }}
        />
      </BodyWrapper>
    </html>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function BodyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <body
      className={cn(
        "max-w-[2000px] mx-auto",
        pathname === "/" ? "bg-stone-900" : "bg-stone-100"
      )}
    >
      {children}
    </body>
  );
}
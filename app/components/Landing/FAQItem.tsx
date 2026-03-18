"use client"

import { useState, ReactNode } from "react";

interface FAQItemProps {
  title: string;
  children: ReactNode;
}

export default function FAQItem({ title, children }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-stone-500 py-3">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer text-2xl"
      >
        <div>{title}</div>

        <div
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          v
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-gray-500 text-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
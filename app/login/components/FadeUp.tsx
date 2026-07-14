"use client";

import { motion } from "framer-motion";

interface FadeUpTextProps {
  text: string;
  className?: string;
}

export default function FadeUpText({
  text,
  className = "",
}: FadeUpTextProps) {
  const words = text.split(" ");

  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.25,
            delay: index * 0.1,
            ease: "easeOut",
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
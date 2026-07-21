"use client";

import { formatMoney } from "@/lib/formatMoney";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface MoneyProps {
    value?: number | null;
    compact?: boolean;
    decimals?: number;
    className?: string;
    expanded?: boolean;
}

const Money = ({
    value,
    compact = true,
    decimals = 1,
    className = "",
    expanded,
}: MoneyProps) => {
    const [hovered, setHovered] = useState(false);

    if (value == null) {
        return <span className={className}>₹0</span>;
    }

    const compactValue = formatMoney(value, { compact, decimals });
    const fullValue = formatMoney(value, { compact: false });

    const shouldAnimate = compactValue !== fullValue;

    if (!shouldAnimate) {
        return <span className={className}>{fullValue}</span>;
    }

    const showFull = expanded ?? hovered;

    return (
        <span
            className={className}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={showFull ? "full" : "compact"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{
                        duration: 0.2,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                >
                    {showFull ? fullValue : compactValue}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

export default Money;
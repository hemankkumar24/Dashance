"use client";

import React, { useEffect, useState } from "react";

interface Props {
    name: string;
    amount: number;
}

const IncomeCard = ({ name, amount }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const [canHover, setCanHover] = useState(false);

    useEffect(() => {
        setCanHover(window.matchMedia("(hover: hover)").matches);
    }, []);

    return (
        <div
            onPointerEnter={() => {
                if (canHover) setExpanded(true);
            }}
            onPointerLeave={() => {
                if (canHover) setExpanded(false);
            }}
            onPointerUp={() => {
                if (!canHover) {
                    setExpanded((prev) => !prev);
                }
            }}
            className={`
                relative shrink-0 snap-start cursor-pointer select-none
                flex h-full flex-col justify-center
                rounded-2xl border border-gray-200/80 bg-gray-50 px-4
                transition-all duration-300 ease-out
                active:scale-95
                ${
                    expanded
                        ? "z-20 w-45 scale-[1.03] shadow-xl"
                        : "z-0 w-36 shadow-sm hover:scale-[1.02] hover:shadow-lg"
                }
            `}
        >
            {/* Income indicator */}
            <div className="mb-2 flex items-start gap-2">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />

                <div
                    className={`text-sm font-medium text-gray-500 transition-all duration-300 ${
                        expanded
                            ? "whitespace-normal break-words"
                            : "truncate whitespace-nowrap"
                    }`}
                >
                    {name}
                </div>
            </div>

            {/* Amount */}
            <div className="truncate text-2xl font-semibold tracking-tight text-gray-800">
                ₹{Number(amount).toLocaleString("en-IN")}
            </div>
        </div>
    );
};

export default IncomeCard;
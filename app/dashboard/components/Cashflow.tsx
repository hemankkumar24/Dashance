"use client";

import React, { useRef, useState } from "react";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { useDashboard } from "@/app/context/DashboardProvider";

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const Cashflow = () => {

    const {
        selectedMonth,
        getCashflowForYear,
    } = useDashboard();

    const cashflow = getCashflowForYear(selectedMonth.year);

    const maxValue = Math.max(
        1,
        ...cashflow.flatMap(month => [
            month.income,
            month.expense,
        ])
    );

    const [activeMonth, setActiveMonth] = useState<number | null>(null);

    const [tooltip, setTooltip] = useState<{
        left: number;
        month: number;
        income: number;
        expense: number;
    } | null>(null);

    const canHover =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover)").matches;

    const scrollRef = useRef<HTMLDivElement>(null);

    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const velocity = useRef(0);
    const lastX = useRef(0);
    const animationFrame = useRef<number | null>(null);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return;

        isDragging.current = true;

        startX.current = e.clientX;
        scrollLeft.current = scrollRef.current.scrollLeft;

        lastX.current = e.clientX;
        velocity.current = 0;

        setTooltip(null);
        setActiveMonth(null);

        cancelAnimationFrame(animationFrame.current!);

        scrollRef.current.setPointerCapture(e.pointerId);
        scrollRef.current.style.cursor = "grabbing";

        document.body.style.userSelect = "none";
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging.current || !scrollRef.current) return;

        const dx = e.clientX - startX.current;

        velocity.current = e.clientX - lastX.current;
        lastX.current = e.clientX;

        scrollRef.current.scrollLeft = scrollLeft.current - dx;
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return;

        isDragging.current = false;

        scrollRef.current.releasePointerCapture(e.pointerId);
        scrollRef.current.style.cursor = "grab";

        document.body.style.userSelect = "";

        const momentum = () => {
            if (!scrollRef.current) return;

            scrollRef.current.scrollLeft -= velocity.current;

            velocity.current *= 0.96;

            if (Math.abs(velocity.current) > 0.4) {
                animationFrame.current = requestAnimationFrame(momentum);
            }
        };

        momentum();
    };

    return (
        <div className="h-full w-full">

            <div className="px-4 py-3 h-full w-full flex flex-col justify-between">

                <div className="flex items-center justify-between w-full select-none">

                    <div className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-stone-100 rounded-full shadow-xs text-blue-600">

                                <ChartNoAxesColumnIncreasing size={20} />

                            </div>

                            <span className="text-lg md:text-xl">
                                Cashflow Chart
                            </span>
                        </div>
                        <div className="flex flex-col text-sm text-stone-500 select-none">

                            <div className="flex items-center gap-2 w-20">
                                <div className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
                                <span>Income</span>
                            </div>

                            <div className="flex items-center gap-2 w-20">
                                <div className="w-3 h-3 rounded-full bg-lime-300 shrink-0" />
                                <span>Expense</span>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="relative h-3/5">

                    {tooltip && !(tooltip.income == 0 && tooltip.expense == 0) && (
                        <div
                            className="absolute left-0 -top-6 z-50 pointer-events-none"
                            style={{
                                transform: `translateX(${tooltip.left}px) translateX(-50%)`,
                            }}
                        >
                            <div className="whitespace-nowrap rounded-2xl border border-stone-200 bg-white/40 backdrop-blur-sm px-4 py-3 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                                <div className="text-xs text-stone-500">
                                    {months[tooltip.month]}
                                </div>

                                <div className="mt-2 flex items-center gap-2 text-sm">
                                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                                    <span>₹{tooltip.income.toLocaleString("en-IN")}</span>
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-sm">
                                    <div className="h-2 w-2 rounded-full bg-lime-400" />
                                    <span>₹{tooltip.expense.toLocaleString("en-IN")}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div
                        ref={scrollRef}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerLeave={handlePointerUp}
                        className="flex gap-2 h-full w-full overflow-x-auto overflow-y-visible custom-scroll py-5 pb-3 xl:py-0 cursor-grab active:cursor-grabbing select-none"
                    >
                        {cashflow.map((month) => {
                            const incomeHeight =
                                (month.income / maxValue) * 100;

                            const expenseHeight =
                                (month.expense / maxValue) * 100;

                            const empty =
                                month.income === 0 &&
                                month.expense === 0;

                            const incomeBehind =
                                month.income >= month.expense;
                            return (

                                <div
                                    key={month.month}
                                    className="relative flex flex-col items-center shrink-0 w-1/6"
                                    onMouseEnter={(e) => {
                                        if (!canHover) return;
                                        if (isDragging.current) return;

                                        const rect = (
                                            e.currentTarget as HTMLDivElement
                                        ).getBoundingClientRect();

                                        const parentRect = (
                                            e.currentTarget.parentElement as HTMLDivElement
                                        ).getBoundingClientRect();

                                        setActiveMonth(month.month);

                                        setTooltip({
                                            left: rect.left - parentRect.left + rect.width / 2,
                                            month: month.month,
                                            income: month.income,
                                            expense: month.expense,
                                        });
                                    }}

                                    onMouseLeave={() => {
                                        if (!canHover) return;

                                        setActiveMonth(null);
                                        setTooltip(null);
                                    }}

                                    onClick={(e) => {
                                        if (canHover) return;

                                        const rect = (
                                            e.currentTarget as HTMLDivElement
                                        ).getBoundingClientRect();

                                        const parentRect = (
                                            e.currentTarget.parentElement as HTMLDivElement
                                        ).getBoundingClientRect();

                                        if (activeMonth === month.month) {
                                            setActiveMonth(null);
                                            setTooltip(null);
                                        } else {
                                            setActiveMonth(month.month);

                                            setTooltip({
                                                left: rect.left - parentRect.left + rect.width / 2,
                                                month: month.month,
                                                income: month.income,
                                                expense: month.expense,
                                            });
                                        }
                                    }}
                                >

                                    <div className="relative w-full h-full min-h-32 xl:min-h-0">

                                        {/* Background track */}
                                        <div className="absolute inset-0 rounded-xl bg-stone-100" />

                                        {!empty && (
                                            <div
                                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full rounded-t-lg transition-all duration-700 ${incomeBehind
                                                    ? "bg-blue-500 border-2 border-blue-400"
                                                    : "bg-lime-400 border-2 border-lime-300"
                                                    }`}
                                                style={{
                                                    height: `${Math.max(incomeHeight, expenseHeight)}%`,
                                                }}
                                            />
                                        )}

                                        {!empty && (
                                            <div
                                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] rounded-t-lg transition-all duration-700 ${incomeBehind
                                                    ? "bg-lime-400"
                                                    : "bg-blue-500"
                                                    }`}
                                                style={{
                                                    height: `${Math.min(incomeHeight, expenseHeight)}%`,
                                                }}
                                            />
                                        )}

                                    </div>

                                    <span className="mt-2 text-stone-500 text-sm">

                                        {months[month.month]}

                                    </span>
                                </div>
                            );
                        })}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Cashflow;
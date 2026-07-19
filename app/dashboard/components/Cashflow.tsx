"use client";

import React, { useState } from "react";
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

    const canHover =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover)").matches;

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

                <div className="h-3/5">

                    <div className="flex gap-2 h-full w-full overflow-x-auto custom-scroll py-5 pb-3 xl:py-0 select-none">
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
                                    onMouseEnter={() => canHover && setActiveMonth(month.month)}
                                    onMouseLeave={() => canHover && setActiveMonth(null)}
                                    onClick={() => {
                                        if (!canHover) {
                                            setActiveMonth(prev =>
                                                prev === month.month ? null : month.month
                                            );
                                        }
                                    }}
                                >
                                    {activeMonth === month.month && !empty && (
                                        <div className="absolute left-1/2 top-2 -translate-x-1/2 z-30 whitespace-nowrap rounded-2xl border border-stone-200 bg-white/50 backdrop-blur-sm px-4 py-3 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                                            <div className="text-xs text-stone-500">
                                                {months[month.month]}
                                            </div>

                                            <div className="mt-2 flex items-center gap-2 text-sm">
                                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                                <span>₹{month.income.toLocaleString("en-IN")}</span>
                                            </div>

                                            <div className="mt-1 flex items-center gap-2 text-sm">
                                                <div className="h-2 w-2 rounded-full bg-lime-400" />
                                                <span>₹{month.expense.toLocaleString("en-IN")}</span>
                                            </div>
                                        </div>
                                    )}
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
"use client";

import React from "react";
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

    return (
        <div className="h-full w-full">

            <div className="px-4 py-3 h-full w-full flex flex-col justify-between">

                <div className="flex items-center justify-between w-full select-none">

                    <div className="flex items-center gap-2">

                        <div className="p-2 bg-stone-100 rounded-full shadow-xs text-blue-600">

                            <ChartNoAxesColumnIncreasing size={20} />

                        </div>

                        <span className="text-lg md:text-xl">
                            Cashflow Chart
                        </span>

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
                                    className="flex flex-col items-center shrink-0 w-1/6"
                                >
                                    <div className="relative w-full h-full min-h-32 xl:min-h-0">
                                        {empty && (

                                            <div className="absolute inset-0 bg-stone-100 rounded-xl" />

                                        )}
                                        {!empty && (

                                            <div
                                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full rounded-xl transition-all duration-700 ${incomeBehind
                                                        ? "bg-blue-500 border-2 border-blue-400"
                                                        : "bg-lime-500 border-2 border-lime-400"
                                                    }`}
                                                style={{
                                                    height: `${Math.max(
                                                        incomeHeight,
                                                        expenseHeight
                                                    )}%`,
                                                }}
                                            />

                                        )}
                                        {!empty && (

                                            <div
                                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] rounded-lg transition-all duration-700 ${incomeBehind ? "bg-lime-500 border-2 border-lime-400" : "bg-blue-500 border-2 border-blue-300"}`}
                                                style={{
                                                    height: `${Math.min(
                                                        incomeHeight,
                                                        expenseHeight
                                                    )}%`,
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
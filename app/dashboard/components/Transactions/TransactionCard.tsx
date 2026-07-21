"use client";

import Money from "@/app/components/Dashboard/Money";
import { DashboardTransaction } from "@/app/context/DashboardProvider";
import { ArrowDownLeft, ArrowUpRight, Pencil, Trash2 } from "lucide-react";

interface TransactionCardProps {
    transaction: DashboardTransaction;
    onEdit?: (transaction: DashboardTransaction) => void;
    onDelete?: (transaction: DashboardTransaction) => void;
}

const TransactionCard = ({
    transaction,
    onEdit,
    onDelete,
}: TransactionCardProps) => {
    const isIncome = transaction.type === "income";

    const formattedDate = new Date(transaction.createdAt).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );

    const formattedTime = new Date(transaction.createdAt).toLocaleTimeString(
        "en-IN",
        {
            hour: "numeric",
            minute: "2-digit",
        }
    );

    return (
        <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">

            <div className="flex items-start justify-between">

                <div className="flex items-start gap-4">

                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                            isIncome
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                        }`}
                    >
                        {isIncome ? (
                            <ArrowDownLeft size={22} />
                        ) : (
                            <ArrowUpRight size={22} />
                        )}
                    </div>

                    <div>

                        <h3 className="text-base font-semibold text-stone-900">
                            {transaction.title}
                        </h3>

                        <p className="mt-1 text-sm text-stone-500">
                            {transaction.category}
                        </p>

                        <p className="mt-1 text-xs text-stone-400">
                            {formattedDate} • {formattedTime}
                        </p>

                    </div>

                </div>

                <p
                    className={`text-lg font-semibold ${
                        isIncome ? "text-green-600" : "text-red-500"
                    }`}
                >
                    {isIncome ? "+" : "-"}
                    {<Money value={transaction.amount} />}
                </p>

            </div>

            <div className="mt-5 flex justify-end gap-2">

                <button
                    onClick={() => onEdit?.(transaction)}
                    className="rounded-full border border-stone-200 p-2 text-stone-600 transition-colors hover:bg-stone-100"
                >
                    <Pencil size={16} />
                </button>

                <button
                    onClick={() => onDelete?.(transaction)}
                    className="rounded-full border border-red-200 p-2 text-red-500 transition-colors hover:bg-red-50"
                >
                    <Trash2 size={16} />
                </button>

            </div>

        </div>
    );
};

export default TransactionCard;
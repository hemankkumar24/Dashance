"use client";

import { DashboardTransaction } from "@/app/context/DashboardProvider";
import TransactionCard from "./TransactionCard";

interface TransactionMonthProps {
    month: string;
    transactions: DashboardTransaction[];
    onEdit?: (transaction: DashboardTransaction) => void;
    onDelete?: (transactionId: string) => void;
}

const TransactionMonth = ({
    month,
    transactions,
    onEdit,
    onDelete,
}: TransactionMonthProps) => {
    return (
        <section className="space-y-4">

            <div className="sticky px-5 py-2 -top-7 z-10 bg-white/30 rounded-xl backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-stone-800">
                    {month}
                </h2>
            </div>

            <div className="space-y-3">
                {transactions.map((transaction) => (
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        onEdit={() => onEdit?.(transaction)}
                        onDelete={() => onDelete?.(transaction.id)}
                    />
                ))}
            </div>

        </section>
    );
};

export default TransactionMonth;
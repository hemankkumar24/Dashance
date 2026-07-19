import React, { useState } from 'react'
import { History, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useDashboard } from "@/app/context/DashboardProvider";

const Transaction = () => {

    const {
        getTransactions,
        selectedMonth,
    } = useDashboard();

    const allTransactions = getTransactions({
        month: selectedMonth.month,
        year: selectedMonth.year,
    });

    const transactions = allTransactions.slice(0, 3);

    return (
        <div className='h-full w-full'>
            <div className='px-4 py-3 h-full flex flex-col'>

                {/* Header */}
                <div className='flex items-center justify-between gap-2 text-xl pb-5'>
                    <div className='flex items-center gap-2'>
                        <div className='p-2 bg-stone-100 shadow-sm text-blue-600 rounded-full'>
                            <History size={20} />
                        </div>
                        <div className=''>Latest Transactions</div>
                    </div>
                </div>

                {/* Column Titles */}
                <div className='grid grid-cols-3 text-sm font-semibold text-stone-500 px-4 pb-2'>
                    <div className='text-left'>NAME</div>
                    <div className='text-center'>AMOUNT</div>
                    <div className='text-center'>DATE</div>
                </div>

                {/* List */}
                <div
                    className={`flex flex-col gap-2`}
                >
                    {transactions.length === 0 ? (
                        <div className="flex items-center justify-center h-45 rounded-xl bg-stone-100 text-stone-400">
                            No transactions this month
                        </div>
                    ) :
                        (transactions.map((txn, index) => {
                            const isIncome = txn.type === "income";

                            return (
                                <div
                                    key={index}
                                    className='grid grid-cols-3 items-center px-4 py-3 rounded-xl bg-stone-100 border border-stone-200'
                                >
                                    {/* Name + Icon */}
                                    <div className='flex items-center gap-2 truncate'>
                                        <div className={`p-2 rounded-full ${isIncome ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
                                            }`}>
                                            {isIncome ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                        </div>
                                        <span className='truncate'>{txn.title}</span>
                                    </div>

                                    {/* Amount */}
                                    <div className={`text-center font-medium ${isIncome ? "text-green-600" : "text-red-500"
                                        }`}>
                                        {isIncome ? "+" : "-"}₹{txn.amount.toLocaleString("en-IN")}
                                    </div>

                                    {/* Date AND Time */}
                                    <div className={`text-center font-medium text-stone-500`}>{new Date(txn.createdAt).toLocaleString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                    </div>
                                </div>
                            );
                        }))
                    }
                </div>
            </div>
        </div>
    )
}

export default Transaction
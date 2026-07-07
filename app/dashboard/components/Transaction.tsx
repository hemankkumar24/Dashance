import React, { useState } from 'react'
import { History, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const transactions = [
    { name: "Figma", amount: -300, method: "Credit Card", datetime: "2026-03-26 T 14:30:00" },
    { name: "Veg Wrap", amount: -80, method: "UPI", datetime: "2026-03-26 T 12:10:00" },
    { name: "Chicken Burger", amount: -50, method: "Credit Card", datetime: "2026-03-25 T 20:45:00" },
    { name: "Salary", amount: 2000, method: "Bank", datetime: "2026-03-25 T 09:00:00" },
    { name: "Interest", amount: 200, method: "Bank", datetime: "2026-03-24 T 18:20:00" },
];

const Transaction = () => {

    const [opened, setOpened] = useState(false)

    return (
        <div className='h-full w-full'>
            <div className='px-4 py-3 h-full flex flex-col'>

                {/* Header */}
                <div className='flex items-center justify-between gap-2 text-xl pb-5'>
                    <div className='flex items-center gap-2'>
                        <div className='p-2 bg-stone-100 shadow-sm text-blue-600 rounded-full'>
                            <History size={20} />
                        </div>
                        <div className=''>Transaction History</div>
                    </div>
                    <div className='rounded-xl shadow-sm p-0.5 select-none transition-all'>
                        <div onClick={() => setOpened(!opened)} className='relative w-full'>
                            <div className='bg-stone-50 w-full px-3 rounded-xl text-lg flex items-center justify-center hover:bg-stone-100 text-center'>
                                <span className='cursor-pointer'>MARCH 2026</span>
                                <span className="leading-none">⌄</span>
                            </div>

                            <div className={`absolute z-10 backdrop-blur-sm text-lg origin-top top-5  transition-all duration-200 mt-3 text-center shadow-lg w-full gap-y-5 ${opened ? "scale-100 rounded-t-xl rounded-b-xl" : "scale-90 opacity-0 pointer-events-none"}`}>
                                <div className='py-1 w-full hover:bg-stone-200 shadow-2xs rounded-t-xl'>FEB 2026</div>
                                <div className='py-1 w-full hover:bg-stone-200 shadow-2xs rounded-b-xl'>JAN 2026</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Column Titles */}
                <div className='grid grid-cols-4 text-sm font-semibold text-stone-500 px-4 pb-2'>
                    <div className='text-left'>NAME</div>
                    <div className='text-center'>AMOUNT</div>
                    <div className='text-center'>DATE</div>
                    <div className='text-right'>METHOD</div>
                </div>

                {/* List */}
                <div className='flex flex-col gap-2 overflow-y-auto custom-scroll' data-lenis-prevent>

                    {transactions.map((txn, index) => {
                        const isIncome = txn.amount > 0;

                        return (
                            <div
                                key={index}
                                className='grid grid-cols-4 items-center px-4 py-3 rounded-xl bg-stone-100 border border-stone-200'
                            >
                                {/* Name + Icon */}
                                <div className='flex items-center gap-2 truncate'>
                                    <div className={`p-2 rounded-full ${isIncome ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
                                        }`}>
                                        {isIncome ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                    </div>
                                    <span className='truncate'>{txn.name}</span>
                                </div>

                                {/* Amount */}
                                <div className={`text-center font-medium ${isIncome ? "text-green-600" : "text-red-500"
                                    }`}>
                                    {isIncome ? "+" : "-"}${Math.abs(txn.amount)}
                                </div>

                                {/* Date AND Time */}
                                <div className={`text-center font-medium text-stone-500`}>{(txn.datetime)}
                                </div>

                                {/* Method */}
                                <div className='text-right text-stone-500 text-sm'>
                                    {txn.method}
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    )
}

export default Transaction
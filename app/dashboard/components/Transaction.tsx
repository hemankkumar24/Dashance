import React from 'react'
import { History, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const transactions = [
  { name: "Figma", amount: -300, method: "Credit Card" },
  { name: "Veg Wrap", amount: -80, method: "UPI" },
  { name: "Chicken Burger", amount: -50, method: "Credit Card" },
  { name: "Salary", amount: 2000, method: "Bank" },
  { name: "Interest", amount: 200, method: "Bank" },
];

const Transaction = () => {
  return (
    <div className='h-full w-full'>
      <div className='px-4 py-3 h-full flex flex-col'>

        {/* Header */}
        <div className='flex items-center gap-2 text-xl pb-5'>
          <div className='p-2 bg-stone-100 shadow-sm text-blue-600 rounded-full'>
            <History size={20} />
          </div>
          <div className=''>Transaction History</div>
        </div>

        {/* Column Titles */}
        <div className='grid grid-cols-3 text-sm font-semibold text-stone-500 px-3 pb-2'>
          <div>NAME</div>
          <div className='text-center'>AMOUNT</div>
          <div className='text-right'>METHOD</div>
        </div>

        {/* List */}
        <div className='flex flex-col gap-2 overflow-y-auto custom-scroll' data-lenis-prevent>

          {transactions.map((txn, index) => {
            const isIncome = txn.amount > 0;

            return (
              <div
                key={index}
                className='grid grid-cols-3 items-center px-4 py-3 rounded-xl bg-stone-100 border border-stone-200'
              >
                {/* Name + Icon */}
                <div className='flex items-center gap-2 truncate'>
                  <div className={`p-2 rounded-full ${
                    isIncome ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
                  }`}>
                    {isIncome ? <ArrowDownLeft size={16}/> : <ArrowUpRight size={16}/>}
                  </div>
                  <span className='truncate'>{txn.name}</span>
                </div>

                {/* Amount */}
                <div className={`text-center font-medium ${
                  isIncome ? "text-green-600" : "text-red-500"
                }`}>
                  {isIncome ? "+" : "-"}${Math.abs(txn.amount)}
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
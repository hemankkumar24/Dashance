"use client"

import React from 'react'

interface Props {
  name: string
  amount: number
}

const ExpenseCard = ({ name, amount }: Props) => {
  return (
    <div className='w-36 relative shrink-0 h-full bg-gray-50 border border-gray-200/80 rounded-2xl flex flex-col justify-center px-4 select-none snap-start active:scale-95 transition-transform duration-200'>
      
      {/* iOS style subtle indicator dot instead of a full bar */}
      <div className='flex items-center gap-2 mb-1'>
        <div className='h-2 w-2 bg-red-400 rounded-full shadow-[0_0_8px_rgba(248,113,113,0.6)]' />
        <div className='text-sm font-medium text-gray-500 truncate'>
          {name}
        </div>
      </div>

      {/* Amount */}
      <div className='text-2xl font-semibold tracking-tight text-gray-800 truncate'>
        ₹{Number(amount).toLocaleString("en-IN")}
      </div>

    </div>
  )
}

export default ExpenseCard
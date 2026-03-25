"use client"

import React, { useState } from 'react'

interface Props {
  name: string
  amount: number
}

const ExpenseCard = ({ name, amount }: Props) => {

  const [hovered, setHovered] = useState(false)

  return (
    <div className='w-3/7 relative shrink-0 h-full rounded-xl flex flex-col justify-center select-none'>
      
      {/* Left indicator */}
      <div className='absolute left-0 my-auto h-[90%] w-1.5 bg-red-500 rounded-full' />

      {/* Name */}
      <div
        className={
          !hovered
            ? 'text-lg px-6 text-stone-500 whitespace-nowrap truncate'
            : 'text-lg px-6 text-stone-500 whitespace-nowrap bg-stone-50'
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {name}
      </div>

      {/* Amount */}
      <div
        className={
          !hovered
            ? 'text-3xl px-5 text-stone-700 whitespace-nowrap truncate'
            : 'text-3xl px-5 text-stone-700 whitespace-nowrap bg-stone-50'
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        ₹{amount}
      </div>

    </div>
  )
}

export default ExpenseCard
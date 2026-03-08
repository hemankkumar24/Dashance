import React from 'react'
import Balance from './components/Balance'
import Income from './components/Income'
import Expense from './components/Expense'

const page = () => {
  return (
    <div className='min-h-screen bg-stone-100 main-font'>
      <div className='mx-40'>
        <div className='bg-stone-200/40 p-2 grid grid-rows-[1fr_1fr_1fr] h-screen py-10'>
          {/* First Row */}
          <div className='grid grid-cols-2 gap-2 min-h-0'>
            {/* Balance Component */}
            <Balance />
            <div className='grid grid-cols-2 gap-2 min-h-0'>
              {/* Income Component */}
              <Income />
              {/* Expense Component */}
              <Expense />
            </div>
          </div>
          {/* Second Row */}
          <div className='bg-yellow-100'></div>
          {/* Third Row */}
          <div className='bg-yellow-200'></div>
        </div>

      </div>
    </div>
  )
}

export default page
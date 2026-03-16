import React from 'react'
import Balance from './components/Balance'
import Income from './components/Income'
import Expense from './components/Expense'
import Goal from './components/Goal'

const page = () => {
  return (
    <div className='h-screen bg-stone-100 main-font'>
      <div className='mx-40 h-full'>

        <div className='bg-stone-200/40 p-2 grid grid-rows-[1fr_2fr] gap-2 h-full py-10 min-h-0'>

          {/* First Row */}
          <div className='grid grid-cols-2 gap-2 h-full min-h-0'>

            <Balance />

            <div className='grid grid-cols-2 gap-2 h-full min-h-0'>
              <Income />
              <Expense />
            </div>

          </div>

          {/* Second Row */}
          <div className='grid grid-cols-[1fr_2fr] gap-2 h-full min-h-0'>

            <Goal />

            <div className='grid grid-rows-2 h-full min-h-0 gap-2'>
              <div className='grid grid-cols-2 h-full min-h-0 gap-2'>
                <div className='bg-stone-50 h-full'>

                </div>
                <div className='bg-stone-50 h-full'>
                  
                </div>
              </div>

              <div className='grid grid-cols-3 h-full min-h-0 gap-2'>
                <div className='bg-stone-50 h-full'></div>
                <div className='bg-stone-50 h-full'></div>
                <div className='bg-stone-50 h-full'></div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default page

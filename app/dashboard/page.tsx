import React from 'react'
import Balance from './components/Balance'
import Income from './components/Income'
import Expense from './components/Expense'
import Goal from './components/Goal'
import Cashflow from './components/Cashflow'
import Transaction from './components/Transaction'
import Budget from './components/Budget'
import FloatingBar from './components/mobile/FloatingBar'

const page = () => {
  return (
    <div className='h-screen bg-stone-100 main-font overflow-hidden min-h-0'>
      <div className='2xl:mx-40 h-full min-h-0'>

        {/* Bottom Bar For Mobile View */}
        <FloatingBar />

        <div className='bg-stone-200/40 p-2 grid grid-rows-[1fr_2fr] gap-2 h-full py-5 min-h-0 hidden'>

          {/* First Row */}
          <div className='grid grid-cols-2 gap-2 h-full min-h-0'>
            <div className='min-h-0'>
              <Balance />
            </div>
            

            <div className='grid grid-cols-2 gap-2 h-full min-h-0'>
              <Income />
              <Expense />
            </div>

          </div>

          {/* Second Row */}
          <div className='grid grid-cols-[1fr_2fr] gap-2 h-full min-h-0'>

              <div className="min-h-0">
                <Goal />
              </div>

            <div className='grid grid-rows-2 h-full min-h-0 gap-2'>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='bg-stone-50 h-full rounded-xl shadow-sm min-h-0'>
                    <Cashflow />
                  </div>
                  <div className='bg-stone-50 h-full rounded-xl shadow-sm min-h-0'>
                    <Budget />
                  </div>
                </div>
                <div className='bg-stone-50 h-full rounded-xl shadow-sm'>
                  <Transaction />
                </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default page

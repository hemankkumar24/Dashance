"use client"

import React, { useState } from 'react'
import Balance from './components/Balance'
import Income from './components/Income'
import Expense from './components/Expense'
import Goal from './components/Goal'
import Cashflow from './components/Cashflow'
import Transaction from './components/Transaction'
import Budget from './components/Budget'
import FloatingBar from './components/mobile/FloatingBar'
import { div } from 'framer-motion/client'

const page = () => {
  // phone view
  const [home, setHome] = useState(false)
  const [wallet, setWallet] = useState(true)
  const [goals, setGoals] = useState(false)
  const [transactions, setTransactions] = useState(false)

  return (
    <div className='h-screen bg-stone-100 main-font min-h-0'>
      <div className='2xl:mx-40 h-full min-h-0'>

        {/* Bottom Bar For Mobile View */}
        <div className="bg-stone-200/40 h-full xl:hidden flex flex-col">
          <FloatingBar home={home} wallet={wallet} goals={goals} transactions={transactions} setHome={setHome} setWallet={setWallet} setGoals={setGoals} setTransactions={setTransactions} />

          <div className="flex-1 overflow-y-auto p-2">
            {home && (
              <div className="flex flex-col gap-3 pb-30">
                <Balance />

                <div className="bg-stone-50 rounded-xl shadow-sm">
                  <Budget />
                </div>

                <div className="bg-stone-50 rounded-xl shadow-sm">
                  <Cashflow />
                </div>
              </div>
            )}

            {
              wallet && (
                <div className='flex flex-col h-full gap-3 pb-30'>
                  <Income />
                  <Expense /> 
                </div>
              )
            }

            {
              goals && (
                <div className='h-full'>
                  <Goal />
                </div>
              )
            }

            {
              transactions && (
                <div className='h-full bg-stone-50 rounded-xl shadow-sm'>
                  <Transaction />
                </div>
              )
            }
          </div>
        </div>

        <div className='bg-stone-200/40 p-2 hidden grid-rows-[1fr_2fr] gap-2 h-full py-5 min-h-0 xl:grid'>

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

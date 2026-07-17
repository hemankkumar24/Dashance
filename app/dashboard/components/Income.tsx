"use client"
import React, { useState, useRef } from 'react'
import { ArrowBigDown } from 'lucide-react'
import IncomeCard from './IncomeCard'
import { useDashboard } from '@/app/context/DashboardProvider'

const Income = () => {

  const [opened, setOpened] = useState(false)

  // scroll starts here
  const scrollRef = useRef<HTMLDivElement | null>(null)

  let isDown = false
  let startX = 0
  let scrollLeft = 0
  let velocity = 0
  let lastX = 0
  let animationFrame: number

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    isDown = true
    scrollRef.current.classList.add("cursor-grabbing")
    startX = e.pageX - scrollRef.current.offsetLeft
    scrollLeft = scrollRef.current.scrollLeft
    lastX = e.pageX
    cancelAnimationFrame(animationFrame)
  }

  const handleMouseLeave = () => {
    if (!scrollRef.current) return
    isDown = false
    scrollRef.current.classList.remove("cursor-grabbing")
  }

  const handleMouseUp = () => {
    if (!scrollRef.current) return
    isDown = false
    scrollRef.current.classList.remove("cursor-grabbing")

    const momentum = () => {
      if (!scrollRef.current) return
      scrollRef.current.scrollLeft -= velocity
      velocity *= 0.95

      if (Math.abs(velocity) > 0.5) {
        animationFrame = requestAnimationFrame(momentum)
      }
    }

    momentum()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return
    e.preventDefault()

    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5

    velocity = e.pageX - lastX
    lastX = e.pageX

    scrollRef.current.scrollLeft = scrollLeft - walk
  }
  // scroll ends here

  // data fetch
  const { selectedMonth, getIncome, getSpent, getTransactions, } = useDashboard();

  const incomeThisMonth = getIncome(
    selectedMonth.month,
    selectedMonth.year
  );

  const spentThisMonth = getSpent(
    selectedMonth.month,
    selectedMonth.year
  );

  const incomeTransactions = getTransactions({
    month: selectedMonth.month,
    year: selectedMonth.year,
    type: "income",
  });

  console.log(incomeTransactions);
  
  const netSavings = incomeThisMonth - spentThisMonth;

  return (
    <div className='flex flex-col h-full w-full min-h-0 bg-stone-50 rounded-xl shadow-sm'>
      <div className='flex flex-col px-4 py-3 h-full w-full min-h-0'>

        <div className='flex items-center select-none justify-between w-full'>
          <div className='flex items-center gap-2 text-xl'>
            <div className='p-2 bg-stone-100 shadow-xs text-blue-600 rounded-full'>
              <ArrowBigDown size={20} />
            </div>
            <div>Income</div>
          </div>
        </div>

        <div className='flex-1 flex flex-col justify-center elect-none'>
          <div className='text-3xl lg:text-4xl xl:text-5xl font-bold'>
            ₹{incomeThisMonth.toLocaleString("en-IN")}
          </div>
          <div className='text-sm relative bottom-1 xl:text-lg text-stone-500 pb-1 xl:pb-2'>
            {netSavings >= 0 ? (
              <>₹{netSavings.toLocaleString("en-IN")} net savings this month</>
            ) : (
              <>₹{Math.abs(netSavings).toLocaleString("en-IN")} overspent this month</>
            )}
          </div>
        </div>

        {/* scroll starts here */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className='h-25 min-h-0 bg-stone-100 border border-stone-200  rounded-xl w-full overflow-x-auto overflow-y-hidden p-2 gap-2 flex custom-scroll cursor-grab no-scrollbar'
          data-lenis-prevent
        >
          {incomeTransactions.map((transaction) => (
            <IncomeCard
              key={transaction.id}
              name={transaction.title}
              amount={transaction.amount}
            />
          ))}
        </div>
        {/* scroll ends here */}

      </div>
    </div>
  )
}

export default Income
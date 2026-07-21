"use client"
import React, { useState, useRef } from 'react'
import { ArrowBigUp } from 'lucide-react'
import ExpenseCard from './ExpenseCard'
import { useDashboard } from "@/app/context/DashboardProvider";
import Money from '@/app/components/Dashboard/Money';

const Income = () => {

  const [opened, setOpened] = useState(false)

  // scroll starts here
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const velocity = useRef(0)
  const lastX = useRef(0)
  const animationFrame = useRef<number | null>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return

    isDown.current = true
    scrollRef.current.classList.add("cursor-grabbing")

    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
    lastX.current = e.pageX

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
    }
  }

  const handleMouseLeave = () => {
    if (!scrollRef.current) return
    isDown.current = false
    scrollRef.current.classList.remove("cursor-grabbing")
  }

  const handleMouseUp = () => {
    if (!scrollRef.current) return

    isDown.current = false
    scrollRef.current.classList.remove("cursor-grabbing")

    const momentum = () => {
      if (!scrollRef.current) return

      scrollRef.current.scrollLeft -= velocity.current
      velocity.current *= 0.96

      if (Math.abs(velocity.current) > 0.5) {
        animationFrame.current = requestAnimationFrame(momentum)
      }
    }

    momentum()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current || !scrollRef.current) return

    e.preventDefault()

    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5

    velocity.current = e.pageX - lastX.current
    lastX.current = e.pageX

    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }
  // scroll ends here

  // data fetch
  const { user, selectedMonth, getSpent, getTransactions, shown } = useDashboard();

  const spentThisMonth = getSpent(
    selectedMonth.month,
    selectedMonth.year
  );

  const expenseTransactions = getTransactions({
    month: selectedMonth.month,
    year: selectedMonth.year,
    type: "expense",
  });

  return (
    <div className='flex flex-col h-full w-full min-h-0 bg-stone-50 rounded-xl shadow-sm'>
      <div className='flex flex-col px-4 py-3 h-full w-full min-h-0'>
        <div className='flex items-center select-none justify-between w-full'>

          <div className='flex items-center gap-2 text-xl'>
            <div className='p-2 bg-stone-100 shadow-xs text-blue-600 rounded-full'>
              <ArrowBigUp size={20} />
            </div>
            <div className='text-lg md:text-xl'>Expense</div>
          </div>



        </div>
        <div className='flex-1 flex flex-col justify-center select-none'>
          <div className='text-3xl lg:text-4xl xl:text-5xl font-bold flex'>
            <div
              className={`transition-all duration-200 ${shown ? "" : "blur-lg select-none"
                }`}
            >
              <Money value={spentThisMonth} />
            </div>
          </div>
          <div className='text-sm relative bottom-1 xl:text-lg text-stone-500 pb-1 xl:pb-2'>
            {user && user.monthlyBudget > 0
              ? `${((spentThisMonth / user.monthlyBudget) * 100).toFixed(1)}% of monthly budget used`
              : "No monthly budget set"}
          </div>
        </div>

        {/* scroll starts here */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className='h-25 min-h-0 border border-stone-200 bg-stone-100 rounded-xl w-full overflow-x-auto overflow-y-hidden p-2 gap-2 flex custom-scroll cursor-grab no-scrollbar'
          data-lenis-prevent
        >
          {expenseTransactions.map((transaction) => (
            <ExpenseCard
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
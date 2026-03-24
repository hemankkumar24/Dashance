"use client"
import React, { useState, useRef } from 'react'
import { ArrowBigUp } from 'lucide-react'
import ExpenseCard from './ExpenseCard'

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

  return (
    <div className='flex flex-col h-full w-full bg-stone-50 rounded-xl shadow-sm'>
      <div className='flex flex-col px-4 py-3 h-full w-full'>
        <div className='flex items-center select-none justify-between w-full'>

          <div className='flex items-center gap-2 text-xl'>
            <div className='p-2 bg-stone-100 shadow-xs text-blue-600 rounded-full'>
              <ArrowBigUp size={20} />
            </div>
            <div>Expense</div>
          </div>

          {/* Button for Month Choosing */}
          <div className='rounded-xl shadow-sm p-0.5 select-none transition-all'>
            <div onClick={() => { setOpened(!opened) }} className='relative w-full'>
              <div className={`bg-stone-50 w-full px-3 rounded-xl text-lg flex items-center justify-center hover:bg-stone-100 text-center `}>
                <span className='cursor-pointer'>MARCH 2026</span>
                <span className="leading-none ">⌄</span>
              </div>

              {/* Dropdown Menu */}
              {
                <div className={`absolute z-10 backdrop-blur-sm text-lg origin-top top-5  transition-all duration-200 mt-3 text-center shadow-lg w-full gap-y-5 ${opened ? "scale-100 rounded-t-xl rounded-b-xl" : "scale-90 opacity-0 pointer-events-none"}`}>
                  <div className='py-1 w-full hover:bg-stone-200 shadow-2xs rounded-t-xl'>FEB 2026</div>
                  <div className='py-1 w-full hover:bg-stone-200 shadow-2xs rounded-b-xl'>JAN 2026</div>
                </div>
              }
            </div>
          </div>

        </div>
        <div className='h-full flex flex-col justify-end gap-1 select-none'>
            <div className='text-5xl font-bold'>
                ₹5000
            </div>
            <div className='text-lg text-stone-500 pb-2'>
              x% Balance Increase
            </div>
        </div>

        {/* scroll starts here */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className='h-4/5 bg-stone-100 border border-stone-200 rounded-xl w-full overflow-x-auto p-2 gap-2 flex custom-scroll cursor-grab no-scrollbar'
          data-lenis-prevent
        >
            <ExpenseCard name={"Chicken"} amount={170} />
            <ExpenseCard name={"Chicken"} amount={170} />
            <ExpenseCard name={"Chicken"} amount={170} />
            <ExpenseCard name={"Chicken"} amount={170} />
        </div>
        {/* scroll ends here */}

      </div>
    </div>
  )
}

export default Income
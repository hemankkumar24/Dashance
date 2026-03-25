"use client"
import React, { useState, useRef } from 'react'
import { ArrowBigDown } from 'lucide-react'
import IncomeCard from './IncomeCard'

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

  return (
    <div className='flex flex-col h-full w-full bg-stone-50 rounded-xl shadow-sm '>
      <div className='flex flex-col px-4 py-3 h-full w-full'>
        
        <div className='flex items-center select-none justify-between w-full'>
          <div className='flex items-center gap-2 text-xl'>
            <div className='p-2 bg-stone-100 shadow-xs text-blue-600 rounded-full'>
              <ArrowBigDown size={20} />
            </div>
            <div>Income</div>
          </div>

          <div className='rounded-xl shadow-sm p-0.5 select-none transition-all'>
            <div onClick={() => setOpened(!opened)} className='relative w-full'>
              <div className='bg-stone-50 w-full px-3 rounded-xl text-lg flex items-center justify-center hover:bg-stone-100 text-center'>
                <span className='cursor-pointer'>MARCH 2026</span>
                <span className="leading-none">⌄</span>
              </div>

              <div className={`absolute z-10 backdrop-blur-sm text-lg origin-top top-5 transition-all duration-200 mt-3 text-center shadow-lg w-full gap-y-5 ${opened ? "scale-100 rounded-xl" : "scale-90 opacity-0 pointer-events-none"}`}>
                <div className='py-1 w-full hover:bg-stone-200 rounded-t-xl'>FEB 2026</div>
                <div className='py-1 w-full hover:bg-stone-200 rounded-b-xl'>JAN 2026</div>
              </div>
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
          className='h-4/5 mt-5 bg-stone-100 border border-stone-200 rounded-xl w-full overflow-x-auto p-2 gap-2 flex custom-scroll main-font cursor-grab no-scrollbar'
        >
          <IncomeCard name="Salary" amount={20000} />
          <IncomeCard name="Bank Interest" amount={600} />
          <IncomeCard name="Something" amount={600} />
          <IncomeCard name="Freelance" amount={1200} />
        </div>
        {/* scroll ends here */}

      </div>
    </div>
  )
}

export default Income
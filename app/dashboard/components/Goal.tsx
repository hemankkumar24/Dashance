"use client"

import React, { useRef } from 'react'
import { GoalIcon } from 'lucide-react'
import GoalCard from './GoalCard'

const Goal = () => {

  // scroll starts here
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const isDown = useRef(false)
  const startY = useRef(0)
  const scrollTop = useRef(0)

  const velocity = useRef(0)
  const lastY = useRef(0)
  const animationFrame = useRef<number | null>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return

    isDown.current = true
    scrollRef.current.classList.add("cursor-grabbing")

    startY.current = e.pageY - scrollRef.current.offsetTop
    scrollTop.current = scrollRef.current.scrollTop

    lastY.current = e.pageY

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

      scrollRef.current.scrollTop -= velocity.current
      velocity.current *= 0.95

      if (Math.abs(velocity.current) > 0.5) {
        animationFrame.current = requestAnimationFrame(momentum)
      }
    }

    momentum()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current || !scrollRef.current) return

    e.preventDefault()

    const y = e.pageY - scrollRef.current.offsetTop
    const walk = (y - startY.current) * 1.5

    velocity.current = e.pageY - lastY.current
    lastY.current = e.pageY

    scrollRef.current.scrollTop = scrollTop.current - walk
  }
  // scroll ends here

  return (
    <div className='w-full h-full min-h-0 bg-stone-50 rounded-xl shadow-sm px-4 py-3 flex flex-col'>

      {/* Header */}
      <div className='flex gap-x-2 items-center shrink-0'>
        <div className='p-2 flex bg-stone-100 text-blue-600 rounded-full'>
          <GoalIcon size={20} />
        </div>

        <div className='text-xl select-none'>
          My Goals
        </div>
      </div>

      {/* scroll starts here */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className='px-2 py-2 mt-10 mb-10 flex-1 min-h-0 overflow-y-auto border rounded-lg cursor-grab custom-scroll'
        data-lenis-prevent
      >
        <div className='flex flex-col gap-2'>
          <GoalCard title="Lamborghini" progress={30} />
          <GoalCard title="MacBook" progress={10} />
          <GoalCard title="Trip" progress={60} />
          <GoalCard title="Bike" progress={45} />
          <GoalCard title="iPhone" progress={80} />
        </div>
      </div>
      {/* scroll ends here */}

    </div>
  )
}

export default Goal
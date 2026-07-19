"use client"

import React, { useRef, useState } from 'react'
import { Edit, GoalIcon } from 'lucide-react'
import GoalCard from './GoalCard'
import { useDashboard } from '@/app/context/DashboardProvider'
import GoalModal from './overlays/CreateGoalModal'

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

  // api calling
  const { refreshDashboard, goals, completingGoalId } = useDashboard();
  const [showCompleted, setShowCompleted] = useState(false);
  const visibleGoals = showCompleted ? goals : goals.filter(goal => !goal.archived);

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);

  const handleCreateGoal = async (goal: {
    title: string;
    targetAmount: number;
    icon: string;
  }) => {
    setLoading(true);

    try {
      await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goal),
      });

      await refreshDashboard();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='w-full h-full min-h-0 bg-stone-50 rounded-xl shadow-sm px-2 xl:px-4 py-3 flex flex-col'>

      {/* Header */}
      <div className='flex gap-x-2 items-center shrink-0'>
        <div className='p-2 flex bg-stone-100 text-blue-600 rounded-full'>
          <GoalIcon size={20} />
        </div>

        <div className="w-full flex items-center justify-between">

          <span className="text-xl select-none">
            My Goals
          </span>

          <div className="flex items-center gap-4">

            <div className="flex items-center gap-2">

              <span className="text-sm text-stone-500 whitespace-nowrap">
                Completed
              </span>

              <button
                onClick={() => setShowCompleted(!showCompleted)}
                className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${showCompleted
                    ? "bg-green-500"
                    : "bg-stone-300"
                  }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-300 ${showCompleted
                      ? "translate-x-5"
                      : "translate-x-0"
                    }`}
                />
              </button>

            </div>

            <button
              onClick={() => setOpen(true)}
              className="h-8 w-8 rounded-full bg-stone-200 flex items-center justify-center text-2xl leading-none hover:bg-stone-300 transition"
            >
              +
            </button>

          </div>

        </div>
      </div>

      {/* scroll starts here */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className='px-2 py-2 mt-10 flex-1 min-h-0 overflow-y-auto border rounded-lg cursor-grab custom-scroll w-full h-full'
        data-lenis-prevent
      >
        <div className="flex flex-col gap-2 cursor-pointer w-full h-full">
          {visibleGoals.length > 0 ? (
            visibleGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                id={goal.id}
                isCompleting={goal.id === completingGoalId}
                title={goal.title}
                icon={goal.icon}
                targetAmount={goal.targetAmount}
                currentAmount={goal.currentAmount}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full rounded-xl bg-stone-100 text-stone-400">
              No goals set
            </div>
          )}
        </div>
      </div>
      {/* scroll ends here */}
      <GoalModal
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onCreate={handleCreateGoal}
      />
    </div>
  )
}

export default Goal
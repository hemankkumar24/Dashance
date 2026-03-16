import React from 'react'
import { GoalIcon } from 'lucide-react'

const Goal = () => {
  return (
    <div className='w-full h-full min-h-0 bg-stone-50 rounded-xl shadow-sm px-4 py-3 flex flex-col'>

      {/* Header */}
      <div className='flex gap-x-2 items-center shrink-0'>
        <div className='p-2 flex bg-stone-100 shadow-xs text-blue-600 rounded-full'>
          <GoalIcon size={20} />
        </div>

        <div className='text-xl select-none'>
          My Goals
        </div>
      </div>

      {/* Scroll Area */}
      <div className='px-2 mt-10 mb-10 flex-1 min-h-0 overflow-auto'>
        <div className='w-full rounded-lg flex flex-col bg-stone-100 p-4 gap-y-2 border border-stone-200 '>
          <div className='w-full h-24 bg-stone-300 shrink-0 rounded-xl'></div>
          <div className='w-full h-24 bg-stone-300 shrink-0 rounded-xl'></div>
          <div className='w-full h-24 bg-stone-300 shrink-0 rounded-xl'></div>
          <div className='w-full h-24 bg-stone-300 shrink-0 rounded-xl'></div>
          <div className='w-full h-24 bg-stone-300 shrink-0 rounded-xl'></div>
          <div className='w-full h-24 bg-stone-300 shrink-0 rounded-xl'></div>
          <div className='w-full h-24 bg-stone-300 shrink-0 rounded-xl'></div>
        </div>
      </div>

    </div>
  )
}

export default Goal

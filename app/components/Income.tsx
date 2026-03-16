"use client"
import React, { useState } from 'react'
import { ArrowBigDown } from 'lucide-react'

const Income = () => {

  const [opened, setOpened] = useState(false)

  return (
    <div className='flex flex-col h-full w-full bg-stone-50 rounded-xl shadow-sm'>
      <div className='flex flex-col px-4 py-3 h-full w-full'>
        <div className='flex items-center select-none justify-between w-full'>

          <div className='flex items-center gap-2 text-xl'>
            <div className='p-2 bg-green-500 shadow-xs text-stone-100 rounded-full'>
              <ArrowBigDown size={20} />
            </div>
            <div>Income</div>
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
        <div className='h-full flex flex-col justify-end gap-1'>
            <div className='text-5xl font-bold'>
                ₹5000
            </div>
            <div className='text-lg text-stone-500 pb-2'>
              x% Balance Increase
            </div>
        </div>
        <div className='h-4/5 bg-stone-100 border border-stone-200 rounded-xl w-full overflow-x-auto p-2 gap-2 flex'>
            <div className='w-3/7 shrink-0 h-full bg-stone-300 rounded-xl'>
               
            </div>
            <div className='w-3/7 shrink-0 h-full bg-stone-300 rounded-xl'>
               
            </div>
            <div className='w-3/7 shrink-0 h-full bg-stone-300 rounded-xl'>
               
            </div>
        </div>
      </div>
    </div>
  )
}

export default Income
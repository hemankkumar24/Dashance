"use client"
import React, { useState } from 'react'
import { ChartNoAxesColumnIncreasing } from 'lucide-react'

const Cashflow = () => {

    const [opened, setOpened] = useState(false)

    return (
        <div className='h-full w-full'>
            <div className='px-4 py-3 h-full w-full flex flex-col justify-between'>
                <div className='flex items-center select-none justify-between w-full'>
                    <div className='flex items-center gap-2 text-xl'>
                        <div className='p-2 bg-stone-100 shadow-xs text-blue-600 rounded-full'>
                            <ChartNoAxesColumnIncreasing size={20} />
                        </div>
                        <div>Cashflow chart</div>
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
                <div className='h-3/5'>
                    <div className='flex gap-2 h-full w-full overflow-x-auto custom-scroll pb-3 select-none'>

                        <div className='flex flex-col items-center shrink-0 w-1/6'>
                            <div className='w-full h-full bg-stone-200 rounded-xl'></div>
                            <span className='mt-2 text-stone-500 text-sm'>Jan</span>
                        </div>

                        <div className='flex flex-col items-center shrink-0 w-1/6'>
                            <div className='w-full h-full bg-stone-200 rounded-xl'></div>
                            <span className='mt-2 text-stone-500 text-sm'>Feb</span>
                        </div>

                        <div className='flex flex-col items-center shrink-0 w-1/6'>
                            <div className='w-full h-full bg-stone-200 rounded-xl'></div>
                            <span className='mt-2 text-stone-500 text-sm'>Mar</span>
                        </div>

                        <div className='flex flex-col items-center shrink-0 w-1/6'>
                            <div className='w-full h-full bg-stone-200 rounded-xl'></div>
                            <span className='mt-2 text-stone-500 text-sm'>Apr</span>
                        </div>

                        <div className='flex flex-col items-center shrink-0 w-1/6'>
                            <div className='w-full h-full bg-stone-200 rounded-xl'></div>
                            <span className='mt-2 text-stone-500 text-sm'>May</span>
                        </div>

                        <div className='flex flex-col items-center shrink-0 w-1/6'>
                            <div className='w-full h-full bg-stone-200 rounded-xl'></div>
                            <span className='mt-2 text-stone-500 text-sm'>Jun</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cashflow
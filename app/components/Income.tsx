import React from 'react'
import { ArrowBigDown } from 'lucide-react'

const Income = () => {
  return (
    <div className='flex flex-col h-full w-full bg-stone-50 rounded-xl shadow-sm'>
        <div className='flex justify-between px-4 py-3'>
            <div className='flex items-center gap-2 text-xl select-none'>
                <div className='p-2 bg-green-500 shadow-xs text-stone-100 rounded-full'>
                    <ArrowBigDown size={20}/>
                </div>
                <div>Income</div>
            </div>
        </div>
    </div>   
  )
}

export default Income
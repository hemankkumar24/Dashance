import React from 'react'
import { ArrowBigUp } from 'lucide-react'

const Expense = () => {
  return (
    <div className='flex flex-col h-full w-full bg-stone-50 rounded-xl shadow-sm'>
        <div className='flex justify-between px-4 py-3'>
            <div className='flex items-center gap-2 text-xl select-none'>
                <div className='p-2 bg-red-500 shadow-xs text-stone-100 rounded-full'>
                    <ArrowBigUp size={20}/>
                </div>
                <div>Expense</div>
            </div>
        </div>
    </div>  
  )
}

export default Expense
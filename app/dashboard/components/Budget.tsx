import React from 'react'
import { CircleDollarSign } from 'lucide-react'
import BudgetBar from './BudgetBar'
const Budget = () => {
  return (
    <div className='h-full w-full'>
      <div className='px-4 py-3 h-full w-full flex flex-col'>
        <div className='flex items-center gap-2 text-xl'>
          <div className='p-2 bg-stone-100 shadow-xs text-blue-600 rounded-full'>
            <CircleDollarSign size={20} />
          </div>
          <div>Budget</div>
        </div>
        <div className='h-full flex flex-col'>
          <div className='pt-5 text-lg text-stone-950'>
            January
          </div>
          <div className='pt-3'>
            <BudgetBar spent={56} total={699} />
          </div>
          <div className='py-3 flex gap-1 text-lg'>
            <div>
              Great job!, You have 
            </div>
            <div className='text-green-600 font-semibold'>
              ${699-56} left
            </div>  
          </div>
          <div className='pt-5'>
            <div className='py-2 rounded-3xl bg-blue-600 cursor-pointer hover:bg-blue-500 text-stone-50'>
              Modify budget
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Budget
import React from 'react'
import { CircleDollarSign } from 'lucide-react'
import BudgetBar from './BudgetBar'
import { useDashboard } from '@/app/context/DashboardProvider';
const Budget = () => {

  // loading data
  const { user, transactions, spentThisMonth } = useDashboard();

  

  return (
    <div className='h-full w-full min-h-0'>
      <div className='px-4 pt-3 pb-2 h-full w-full min-h-0 flex flex-col'>
        <div className='flex items-center gap-2 text-lg md:text-xl shrink-0'>
          <div className='p-2 bg-stone-100 shadow-xs text-blue-600 rounded-full'>
            <CircleDollarSign size={20} />
          </div>
          <div className='text-md'>Budget</div>
        </div>
        <div className='flex-1 min-h-0 flex flex-col'>
          <div className='flex-1 min-h-0 flex flex-col justify-center '>
            <div className='w-full'>
              <BudgetBar spent={spentThisMonth} total={user?.monthlyBudget} />
            </div>
            <div className='flex flex-wrap pb-4 gap-1 text-sm md:text-lg leading-tight py-2'>
              <div className='text-stone-600'>
                Great job!, You have
              </div>
              <div className='text-green-600 font-semibold'>
                ${699 - 56} left
              </div>
            </div>
          </div>

          <div className='mt-auto pt-2 pb-1 shrink-0'>
            <button className='w-full py-2 px-3 flex items-center justify-center text-center rounded-2xl bg-blue-600 cursor-pointer hover:bg-blue-500 text-stone-50 t md:text-lg leading-none'>
              Modify budget
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Budget
import React from 'react'
import { CircleDollarSign } from 'lucide-react'
const Budget = () => {
  return (
    <div className='h-full w-full'>
        <div className='px-4 py-3 h-full w-full flex flex-col justify-between'>
            <div className='flex items-center gap-2 text-xl'>
                <div className='p-2 bg-stone-100 shadow-xs text-blue-600 rounded-full'>
                    <CircleDollarSign size={20} />
                </div>
                <div>Budget</div>
            </div>
        </div>
    </div>
  )
}

export default Budget
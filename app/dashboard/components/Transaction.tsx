import React from 'react'
import { History } from 'lucide-react';

const Transaction = () => {
  return (
    <div className='h-full w-full'>
        <div className='px-4 py-3 h-full w-full flex flex-col'>
            <div className='flex items-center gap-2 text-xl pb-5'>
                <div className='p-2 bg-stone-100 shadow-xs text-blue-600 rounded-full'>
                    <History size={20} />
                </div>
                <div>Transaction History</div>
            </div>
            <div className='flex justify-between text-sm font-bold py-2 text-stone-500 pl-5 pr-8'>
                <div className=''>
                    NAME
                </div>
                <div className=''>
                    AMOUNT
                </div>
                <div className=''>
                    METHOD
                </div>
            </div>
            <div className='flex flex-col overflow-y-auto h-full custom-scroll' data-lenis-prevent>
                <div className='bg-stone-100 border-b border-b-stone-300 h-1/4 flex justify-between shrink-0 px-5 items-center' >
                    <div className='w-1/2 truncate'>
                        Figma
                    </div>
                    <div className='w-1/3'>
                        300$
                    </div>
                    <div className='w-1/3 text-right'>
                        Credit Card
                    </div>
                </div>
                <div className='bg-stone-100 border-b border-b-stone-300 h-1/4 flex justify-between shrink-0 px-5 items-center'>
                    <div className='w-1/2 truncate'>
                        Veg Wrap
                    </div>
                    <div className='w-1/3'>
                        80$
                    </div>
                    <div className='w-1/3 text-right'>
                        UPI
                    </div>
                </div>
                <div className='bg-stone-100 border-b border-b-stone-300 h-1/4 flex justify-between shrink-0 px-5 items-center'>
                    <div className='w-1/2 truncate'>
                        Chicken Burger
                    </div>
                    <div className='w-1/3'>
                        50$
                    </div>
                    <div className='w-1/3 text-right'>
                        Credit Card
                    </div>
                </div>
                <div className='bg-stone-100 border-b border-b-stone-300 h-1/4 flex justify-between shrink-0 px-5 items-center'>
                    <div className='w-1/2 truncate'>
                        ID Card
                    </div>
                    <div className='w-1/3'>
                        200$
                    </div>
                    <div className='w-1/3 text-right'>
                        Credit Card
                    </div>
                </div>
                <div className='bg-stone-100 border-b border-b-stone-300 h-1/4 flex justify-between shrink-0 px-5 items-center'>
                    <div className='w-1/2 truncate'>
                        Card Interest
                    </div>
                    <div className='w-1/3'>
                        200$
                    </div>
                    <div className='w-1/3 text-right'>
                        Credit Card
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Transaction
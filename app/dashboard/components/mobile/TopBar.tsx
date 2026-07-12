import { Menu } from 'lucide-react'
import React from 'react'

const TopBar = () => {
  return (
    <div className='fixed py-3 items-center px-5 flex w-full justify-between bg-stone-50 shadow-sm z-10'>
        <div className='text-xl text-stone-800'>
            Dashance
        </div>
        <div className='text-stone-400'>
            <Menu size={24}/>
        </div>
    </div>
  )
}

export default TopBar
"use client"
import React, { useState } from 'react'
import { Wallet, Eye, EyeOff, Plus, ArrowUp, FileText } from "lucide-react"

const Balance = () => {
    // handle dropdown toggle
    const [opened, setOpened] = useState(false)

    // handle money toggle
    const [shown, setShown] = useState(false)

    // current currency
    const [currentCurrency, setCurrency] = useState('INR')

  return (
    <div className='relative flex flex-col h-full w-full bg-stone-50 rounded-xl shadow-sm overflow-hidden min-h-0'>
        {/* Top Part */}
        <div className='flex justify-between px-4 py-3'>
            <div className='flex items-center gap-2 text-xl select-none'>
                <div className='p-2 bg-stone-100 shadow-xs text-blue-600 rounded-full'><Wallet size={20}/></div>
                <div>My balance</div>
            </div>
            <div className='rounded-xl shadow-sm p-0.5 select-none transition-all'>
                <div onClick={() => { setOpened(!opened) }} className='relative'>
                    <div className={`bg-stone-50 w-21 px-7 rounded-xl text-lg flex items-center justify-center hover:bg-stone-100 text-center pt-0.5`}>
                        <span className='cursor-pointer'>{currentCurrency}</span>  
                        <span className="leading-none mb-1">⌄</span> 
                    </div>
                
                {/* Dropdown Menu */}
                {   
                    <div className={`absolute z-10 backdrop-blur-sm text-lg origin-top top-5 -left-1 transition-all duration-200 mt-3 text-center shadow-lg  gap-y-5 ${opened ? "scale-100 rounded-t-xl rounded-b-xl" : "scale-90 opacity-0 pointer-events-none"}`}>
                        <div className='px-8 py-1 hover:bg-stone-200 shadow-2xs rounded-t-xl'
                        onClick={() => { setCurrency("INR") }}>INR</div>
                        <div className='px-8 py-1 hover:bg-stone-200 shadow-2xs rounded-b-xl'
                        onClick={() => { setCurrency("USD") }}>USD</div>
                    </div>
                }
                </div>
            </div>
        </div>
        {/* Money */}
        <div className='flex justify-between items-center min-h-0'>
            <div className='text-6xl font-bold px-4 flex items-center gap-4'>
                <div className='select-none'>
                    ₹54,32,414
                </div>
                <div className='text-stone-500 z-10 p-3 bg-stone-200 rounded-full hover:bg-stone-300 cursor-pointer pointer-events-auto' onClick={() => {setShown(!shown)}}>
                    {shown ? <Eye size={30}/> : <EyeOff size={30}/>}
                </div>
            </div>
            <div className='select-none shrink-0'>
                <img src="images/balanceCubes/cubes.png" className='w-32 md:w-48 lg:w-64' />
            </div>
        </div>
        {/* Buttons */}
        <div className='mt-auto'>
            <div className='flex gap-2 p-3 text-sm w-full'> 
                <div className='px-12 py-2 bg-blue-600 hover:bg-blue-500 cursor-pointer rounded-2xl text-stone-50 flex items-center gap-2'>
                    <span><Plus size={20} /></span>
                    <span className='select-none'>Add money</span>
                </div>
                <div className='px-12 py-2 bg-stone-800 hover:bg-stone-700 cursor-pointer rounded-2xl text-stone-50 flex items-center gap-2'>
                    <span><ArrowUp size={20} /></span>
                    <span className='select-none'>Send money</span>
                </div>
                <div className='px-12 py-2 bg-stone-200 hover:bg-stone-300 cursor-pointer rounded-2xl text-stone-600 flex items-center gap-2'>
                    <span><FileText size={20} /></span>
                    <span className='select-none'>View Transactions</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Balance
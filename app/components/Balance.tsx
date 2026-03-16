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
                    <div className='p-2 bg-stone-100 shadow-xs text-blue-600 rounded-full'><Wallet size={20} /></div>
                    <div>My balance</div>
                </div>
                {/* Button */}
                <div className="rounded-xl shadow-sm select-none transition-all">
                    <div onClick={() => setOpened(!opened)} className="relative w-full">

                        <div className="bg-stone-50 px-4 py-1 rounded-xl text-lg flex items-center justify-center gap-1 hover:bg-stone-100 text-center">
                            <span className="cursor-pointer">{currentCurrency}</span>
                            <span className="leading-none">⌄</span>
                        </div>

                        {/* Dropdown Menu */}
                        <div
                            className={`absolute z-10 backdrop-blur-sm text-lg origin-top top-6 transition-all duration-200 mt-4 text-center shadow-lg w-full ${opened
                                    ? "scale-100 opacity-100 rounded-xl"
                                    : "scale-95 opacity-0 pointer-events-none"
                                }`}
                        >
                            <div
                                className="w-full py-1 hover:bg-stone-200 rounded-t-xl"
                                onClick={() => setCurrency("INR")}
                            >
                                INR
                            </div>

                            <div
                                className="w-full py-1 hover:bg-stone-200 rounded-b-xl"
                                onClick={() => setCurrency("USD")}
                            >
                                USD
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* Money */}
            <div className='flex justify-between bg-red0 items-center min-h-0'>
                <div className='px-4 flex items-center '>
                    <div className='select-none gap-y-2 flex flex-col'>
                        <div className='font-bold text-6xl flex gap-4 items-center'>
                            <div>
                                ₹54,32,414
                            </div>
                            <div className='text-stone-500 z-10 p-3 bg-stone-200 rounded-full hover:bg-stone-300 cursor-pointer pointer-events-auto' onClick={() => { setShown(!shown) }}>
                                {shown ? <Eye size={30} /> : <EyeOff size={30} />}
                            </div>
                        </div>
                        <div className='text-lg text-stone-500'>
                            x% Balance Increase/Decrease
                        </div>
                    </div>
                </div>
                <div className='select-none shrink-0'>
                    <img src="images/balanceCubes/cubes.png" className='w-32 md:w-48 lg:w-64' />
                </div>
            </div>
            {/* Buttons */}
            <div className='mt-auto'>
                <div className='flex gap-2 p-3 text-md w-full'>
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
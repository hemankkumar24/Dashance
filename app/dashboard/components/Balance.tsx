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
                    <div className='text-lg md:text-xl'>My balance</div>
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
            <div className='flex justify-between items-center min-h-0'>
                <div className='px-4 flex items-center '>
                    <div className='select-none flex flex-col py-5 xl:py-0'>
                        <div className='font-bold text-4xl md:text-5xl xl:text-6xl flex gap-2 items-center'>
                            <div>
                                ₹54,32,414
                            </div>
                            <div className='text-stone-500 z-10 p-2 bg-stone-200 rounded-full hover:bg-stone-300 cursor-pointer pointer-events-auto' onClick={() => { setShown(!shown) }}>
                                {shown ? <Eye size={14} /> : <EyeOff size={14} />}
                            </div>
                        </div>
                        <div className='text-md xl:text-lg text-stone-500'>
                            x% Balance Increase/Decrease
                        </div>
                    </div>
                </div>
                <div className='select-none shrink-0'>
                    <img src="images/balanceCubes/cubes.png" className='w-64 -my-7 hidden xl:block xl:my-0' />
                </div>
            </div>
            {/* Buttons */}
            <div className="mt-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-1 p-3">

                    <button className="flex items-center justify-center gap-2 text-sm md:text-lg rounded-2xl bg-blue-600 px-4 py-1 xl:py-2 text-stone-50 transition-colors hover:bg-blue-500">
                        <Plus size={18} />
                        <span>Add money</span>
                    </button>

                    <button className="flex items-center text-sm md:text-lg justify-center gap-2 rounded-2xl bg-stone-800 px-4 py-1 xl:py-2 text-stone-50 transition-colors hover:bg-stone-700">
                        <ArrowUp size={18} />
                        <span>Send money</span>
                    </button>

                    <button className="hidden xl:flex xl:col-span-2 items-center justify-center gap-2 rounded-2xl bg-stone-200 px-4 py-3 text-stone-600 transition-colors hover:bg-stone-300">
                        <FileText size={18} />
                        <span>View Transactions</span>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Balance
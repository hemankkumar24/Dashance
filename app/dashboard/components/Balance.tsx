"use client"
import React, { useState } from 'react'
import { Wallet, Eye, EyeOff, Plus, ArrowUp, FileText } from "lucide-react"
import { useDashboard } from '@/app/context/DashboardProvider'
import { formatMonth, getLastUpdatedText } from '@/lib/utils/date'
import AddIncomeModal from "./overlays/AddIncomeModal";
import AddExpenseModal from './overlays/AddExpenseModal'
import AllTransactionsModal from './overlays/AllTransactionsModal'

const Balance = () => {
    // handle dropdown toggle
    const [currencyOpened, setCurrencyOpened] = useState(false)
    const [monthOpened, setMonthOpened] = useState(false);
    const [allTransactionsOpened, setAllTransactionsOpened] = useState(false);

    // handle money toggle
    const [shown, setShown] = useState(false)

    // current currency
    const [currentCurrency, setCurrency] = useState('INR')

    // loading data
    const { user, selectedMonth, setSelectedMonth, availableMonths } = useDashboard();

    // overlay modals
    const [incomeOpen, setIncomeOpen] = useState(false);
    const [expenseOpen, setExpenseOpen] = useState(false);

    return (
        <div className='relative flex flex-col h-full w-full bg-stone-50 rounded-xl shadow-sm overflow-hidden min-h-0'>
            {/* Top Part */}
            <div className='flex justify-between px-4 py-3'>
                <div className='flex items-center gap-2 text-xl select-none'>
                    <div className='p-2 bg-stone-100 shadow-xs text-blue-600 rounded-full'><Wallet size={20} /></div>
                    <div className='text-lg md:text-xl'>My balance</div>
                </div>
                <div className='flex gap-2'>
                    <div className="rounded-xl shadow-sm select-none transition-all">
                        <div
                            onClick={() => {
                                if (availableMonths.length > 0) {
                                    setMonthOpened((prev) => !prev);
                                }
                            }}
                            className={`relative w-full ${availableMonths.length === 0
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                                }`}
                        >

                            {/* Selected Month */}
                            <div className="bg-stone-50 px-4 py-1 rounded-xl text-lg flex items-center justify-center gap-1 hover:bg-stone-100 cursor-pointer group">
                                <span>
                                    {formatMonth(selectedMonth.month, selectedMonth.year)}
                                </span>
                                {availableMonths.length === 0 && (
                                    <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-stone-800 px-3 py-1 text-xs text-stone-50 opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-100">
                                        No transaction history
                                    </div>
                                )}
                                <span className="leading-none">⌄</span>
                            </div>

                            {/* Dropdown */}
                            <div
                                className={`absolute left-0 right-0 mt-3 origin-top z-20 overflow-hidden rounded-xl bg-stone-50/10 backdrop-blur-lg shadow-lg transition-all duration-200 ${monthOpened
                                    ? "scale-100 opacity-100"
                                    : "scale-95 opacity-0 pointer-events-none"
                                    }`}
                            >
                                {availableMonths.map((month) => {
                                    const active =
                                        month.month === selectedMonth.month &&
                                        month.year === selectedMonth.year;

                                    return (
                                        <div
                                            key={`${month.month}-${month.year}`}
                                            onClick={() => {
                                                setSelectedMonth({
                                                    month: month.month,
                                                    year: month.year,
                                                });
                                                setMonthOpened(false);
                                            }}
                                            className={`cursor-pointer py-2 transition-colors flex w-full justify-center ${active
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-stone-100"
                                                }`}
                                        >
                                            {formatMonth(month.month, month.year)}
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                    {/* Button */}
                    <div className="rounded-xl shadow-sm select-none transition-all">
                        <div onClick={() => setCurrencyOpened(!currencyOpened)} className="relative w-full">

                            <div className="bg-stone-50 px-4 py-1 rounded-xl text-lg flex items-center justify-center gap-1 hover:bg-stone-100 text-center">
                                <span className="cursor-pointer">{currentCurrency}</span>
                                <span className="leading-none">⌄</span>
                            </div>

                            {/* Dropdown Menu */}
                            <div
                                className={`absolute z-10 backdrop-blur-sm text-lg origin-top top-6 transition-all duration-200 mt-4 text-center shadow-lg w-full ${currencyOpened
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
            </div>
            {/* Money */}
            <div className='flex justify-between items-center min-h-0'>
                <div className='px-4 flex items-center '>
                    <div className='select-none flex flex-col py-5 xl:py-0'>
                        <div className='font-bold text-4xl md:text-5xl xl:text-6xl flex gap-2 items-center'>
                            <div>
                                ₹{(user?.currentBalance ?? 0).toLocaleString("en-IN")}
                            </div>
                            <div className='text-stone-500 z-10 p-2 bg-stone-200 rounded-full hover:bg-stone-300 cursor-pointer pointer-events-auto' onClick={() => { setShown(!shown) }}>
                                {shown ? <Eye size={14} /> : <EyeOff size={14} />}
                            </div>
                        </div>
                        <div className='text-md xl:text-lg text-stone-500'>
                            {getLastUpdatedText(new Date())}
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

                    <button className="flex items-center justify-center gap-2 text-sm md:text-lg rounded-2xl bg-blue-600 px-4 py-1 xl:py-2 text-stone-50 transition-colors hover:bg-blue-500" onClick={() => setIncomeOpen(true)}>
                        <Plus size={18} />
                        <span>Add money</span>
                    </button>

                    <button className="flex items-center text-sm md:text-lg justify-center gap-2 rounded-2xl bg-stone-800 px-4 py-1 xl:py-2 text-stone-50 transition-colors hover:bg-stone-700" onClick={() => setExpenseOpen(true)}>
                        <ArrowUp size={18} />
                        <span>Send money</span>
                    </button>

                    <button className="hidden xl:flex xl:col-span-2 items-center justify-center gap-2 rounded-2xl bg-stone-200 px-4 py-3 text-stone-600 transition-colors hover:bg-stone-300" onClick={() => setAllTransactionsOpened(true)} >
                        <FileText size={18} />
                        <span>View Transactions</span>
                    </button>

                </div>
            </div>
            <AllTransactionsModal 
                open={allTransactionsOpened}
                onClose={() => {setAllTransactionsOpened(false)}}
            />
            <AddIncomeModal
                open={incomeOpen}
                onClose={() => setIncomeOpen(false)}
            />
            <AddExpenseModal 
                open={expenseOpen}
                onClose={() => setExpenseOpen(false)}
            />
        </div>
    )
}

export default Balance
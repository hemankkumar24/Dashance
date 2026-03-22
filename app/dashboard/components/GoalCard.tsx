"use client"

import React, { useState } from 'react'

interface Props {
    title: string,
    progress: number
}

const GoalCard = ({ title, progress }: Props) => {
    const [toggled, setToggled] = useState(false)
    return (
        <div className={`w-full py-5 ${toggled ? "bg-zinc-700 text-stone-100" : "bg-stone-200 text-stone-800"} shrink-0 rounded-xl px-5 main-font transition-all duration-300`}>

            <div className='h-full w-full flex items-center justify-around gap-4 '>

                <div className='w-[40%] text-xl font-medium truncate'>
                    {title}
                </div>

                {/* Progress Section */}
                <div className='flex-1 flex gap-2 items-center'>

                    {/* Percentage */}
                    <div className={`text-sm ${toggled ? "text-stone-300" : "text-stone-600"}`}>
                        {progress}%
                    </div>

                    {/* Progress Bar */}
                    <div className='w-[60%] h-3 bg-stone-300 rounded-full overflow-hidden'>
                        <div
                            className='h-full bg-blue-500 rounded-full transition-all duration-500'
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                </div>

                {/* Action Icon */}
                <div className='w-8 text-lg h-8 flex justify-center items-center text-stone-800 bg-stone-300 rounded-full cursor-pointer hover:bg-stone-400/50 select-none transition' onClick={(() => { setToggled(!toggled) })}>
                    v
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${toggled ? "max-h-70 mt-4" : "max-h-0"}`}>
                <div className='h-70 flex items-center justify-center'>

                    <div className="relative w-52 h-52">

                        {/* SVG Arc */}
                        <svg className="w-full h-full -rotate-90">

                            {/* Background Arc */}
                            <circle
                                cx="100"
                                cy="100"
                                r="80"
                                stroke="#e7e5e4"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray="502"
                                strokeDashoffset="125"
                                strokeLinecap="round"
                            />

                            {/* Progress Arc */}
                            <circle
                                cx="100"
                                cy="100"
                                r="80"
                                stroke="#2563eb"
                                strokeWidth="13"
                                fill="transparent"
                                strokeDasharray="502"
                                strokeDashoffset={502 - (502 * progress) / 100}
                                strokeLinecap="round"
                                className="transition-all duration-500"
                            />

                        </svg>

                        {/* Center Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-sm text-stone-500">Target</div>
                            <div className="text-2xl font-semibold">${Math.floor(progress * 20)}</div>
                            <div className="text-xs text-stone-400">/ $2000</div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default GoalCard
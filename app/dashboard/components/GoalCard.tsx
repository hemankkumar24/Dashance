"use client"

import React, { useState } from 'react'
import { SemiGauge } from "../../components/Dashboard/SemiGauge"

interface Props {
    title: string,
    progress: number
}

const GoalCard = ({ title, progress }: Props) => {
    const [toggled, setToggled] = useState(false)
    return (
        <div className={`w-full py-5 ${toggled ? "bg-stone-800 text-stone-100" : "bg-stone-200 text-stone-800"} shrink-0 rounded-xl px-5 main-font transition-all duration-300`}>

            <div className='h-full w-full flex items-center justify-around gap-4 '>

                <div className='w-[40%] text-xl font-medium truncate select-none'>
                    {title}
                </div>

                {/* Progress Section */}
                <div className='flex-1 flex gap-2 items-center'>

                    {/* Percentage */}
                    <div className={`text-sm ${toggled ? "opacity-0": "opacity-100"}  transition-opacity duration-200 select-none`}>
                        {progress}%
                    </div>

                    {/* Progress Bar */}
                    <div className={`${toggled ? "opacity-0": "opacity-100"} transition-opacity duration-200 w-[60%] h-3 bg-stone-300 rounded-full overflow-hidden`}>
                        <div
                            className='h-full bg-blue-500 rounded-full transition-all duration-500'
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                </div>

                {/* Action Icon */}
                <div className={`w-8 text-lg h-8 flex justify-center items-center text-stone-800 bg-stone-300 rounded-full cursor-pointer hover:bg-stone-400/50 select-none transition ${toggled && "rotate-180"} transition-transform duration-300 select-none`} onClick={(() => { setToggled(!toggled) })}>
                    v
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ${toggled ? "max-h-70 mt-4" : "max-h-0"}`}>
                <div className='h-60 flex items-center justify-center'>
                    <SemiGauge progress={progress} value={600} max={2000} />
                </div>
            </div>
        </div>
    )
}

export default GoalCard
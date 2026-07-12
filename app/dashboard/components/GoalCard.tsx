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
        <div className={`w-full py-5 ${toggled ? "bg-stone-800 text-stone-100" : "bg-stone-100 border-stone-200 border text-stone-800"} shrink-0 rounded-xl px-5 main-font transition-all duration-300`} onClick={(() => { setToggled(!toggled) })}>

            <div className='h-full w-full flex items-center justify-around gap-4 '>

                <div className='w-[40%] text-xl font-medium truncate select-none'>
                    {title}
                </div>

                {/* Progress Section */}
                <div className="flex-1 flex items-center justify-end gap-2">

                    {/* Progress Bar */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ${toggled ? "w-0 opacity-0" : "flex-1 max-w-28 opacity-100"}`}>
                        <div className="h-3 bg-stone-300 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Percentage */}
                    <div className="text-sm shrink-0 transition-all duration-300">
                        {progress}%
                    </div>
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
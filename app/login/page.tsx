"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { LucideEye, LucideEyeOff } from 'lucide-react'


const page = () => {

    const [toggled, setToggled] = useState(false)

    return (
        <div className='w-full h-screen bg-black'>
            <img
                className='absolute w-full h-screen  object-cover opacity-80 '
                src="./images/wallpaper/wallpaper.jpg"
            />

            <div className='flex justify-center items-center w-full h-full py-0 md:py-5 xl:py-0'>
                
                {/* Container */}
                <div className='w-200 h-full xl:w-300 xl:h-200 xl:rounded-4xl md:border-stone-600 md:rounded-xl border xl:border-10'>
                    
                    <div className='xl:grid xl:grid-cols-2 w-full h-full'>

                        {/* LEFT SIDE (hidden on small screens like signup) */}
                        <div className='hidden xl:block bg-stone-950/20 rounded-2xl rounded-tr-none rounded-br-none backdrop-blur-xs relative'>
                            <div className='flex flex-col absolute bottom-0 left-0 px-5 py-5 gap-2'>
                                <div className='italic-font text-6xl text-white'>Get</div>
                                <div className='italic-font text-6xl text-white'>Everything</div>
                                <div className='italic-font text-6xl text-white'>You Want</div>

                                <div className='pt-5 main-font text-xl text-stone-100 w-[80%]'>
                                    You can get everything you want if you work hard, trust the process, and stick to the plan.
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className='bg-stone-950/30 backdrop-blur-md xl:bg-stone-50 h-full relative rounded-none md:rounded-xl xl:rounded-none'>
                            
                            {/* Logo */}
                            <div className='absolute inset-0 pt-2 text-2xl flex justify-center italic-font text-stone-50 xl:text-stone-800 pointer-events-none'>
                                Dashance
                            </div>

                            {/* Content */}
                            <div className='flex flex-col justify-center gap-2 w-full h-full'>
                                
                                <div className='main-font text-stone-50 xl:text-stone-800 text-5xl w-full text-center'>
                                    Welcome Back
                                </div>

                                <div className='main-font text-stone-200 xl:text-stone-500 text-xl w-full text-center'>
                                    Enter your email and password to access your account
                                </div>

                                <div className='px-4 md:px-10 pt-10'>
                                    
                                    {/* Email */}
                                    <div>
                                        <div className='text-stone-50 xl:text-stone-800 text-lg'>
                                            Email
                                        </div>
                                        <input
                                            type="text"
                                            className='text-lg w-full rounded-sm text-stone-500 px-3 py-3 bg-stone-100 outline-none border border-stone-300'
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className='pt-5'>
                                        
                                        <div className='text-stone-50 xl:text-stone-800 text-lg'>
                                            Password
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={toggled ? "text" : "password"}
                                                className='text-lg w-full rounded-sm text-stone-500 px-3 py-3 pr-10 bg-stone-100 outline-none border border-stone-300'
                                                placeholder="Enter your password"
                                            />

                                            <div className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer' onClick={() => {setToggled(!toggled)}}>
                                                {
                                                    toggled ? <LucideEyeOff className='text-stone-500/50' /> : <LucideEye className='text-stone-500/50' />
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* Remember + Forgot */}
                                    <div className='pt-2 flex justify-between text-sm text-stone-200 xl:text-stone-800'>
                                        <div className='flex gap-2'>
                                            <input type="checkbox" />
                                            Remember me
                                        </div>
                                        <div className='cursor-pointer'>
                                            Forgot Password
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <div className='pt-5'>
                                        <button className="w-full px-3 py-3 bg-stone-800 text-stone-50 rounded-sm cursor-pointer active:bg-stone-400 hover:bg-stone-700 active:text-stone-800">
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom link */}
                            <div className='w-full absolute bottom-0 flex justify-center text-lg pb-2 gap-1'>
                                <span className='text-stone-50 xl:text-stone-500'>
                                    Don't have an account?
                                </span>
                                <span className='text-stone-950 xl:text-stone-800'>
                                    <Link href="/signup">Sign Up</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
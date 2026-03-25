"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { LucideEye, LucideEyeOff } from 'lucide-react'

const page = () => {

    const [toggled, setToggled] = useState(false)
    const [confirmToggled, setConfirmToggled] = useState(false)

    return (
        <div className='w-full h-screen bg-black'>
            <img className='absolute w-full h-screen object-cover opacity-80' src="./images/wallpaper/wallpaper.jpg"></img>
            <div className='flex justify-center items-center w-full h-full py-0 md:py-5 xl:py-0'>
                <div className='w-200 h-full xl:w-300 xl:h-200 xl:rounded-4xl md:border-stone-600 rounded-xl border xl:border-10'>
                    <div className='xl:grid xl:grid-cols-2 w-full h-full'>
                        {/* Left Side with Bottom Left Text */}
                        <div className='hidden xl:block bg-stone-950/20 rounded-2xl rounded-tr-none rounded-br-none backdrop-blur-xs relative'>
                            <div className='flex flex-col absolute bottom-0 left-0 px-5 py-5 gap-2'>
                                <div className='italic-font text-6xl text-white'>
                                    Start
                                </div>
                                <div className='italic-font text-6xl text-white'>
                                    Your Journey
                                </div>
                                <div className='italic-font text-6xl text-white'>
                                    Today
                                </div>
                                <div className='pt-5 main-font text-xl text-stone-100 w-[80%]'>
                                    Create an account and begin building, exploring, and achieving your goals with us.
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className='bg-stone-950/30 backdrop-blur-sm xl:bg-stone-50 h-full relative rounded-none md:rounded-xl xl:rounded-none xl:rounded-tr-xl xl:rounded-br-xl'>
                            <div className='absolute inset-0 pt-5 text-2xl flex justify-center italic-font text-stone-50 xl:text-stone-800 pointer-events-none'>
                                Dashance
                            </div>

                            {/* Actual Content */}
                            <div className='flex flex-col justify-center gap-2 w-full h-full'>
                                <div className='main-font text-stone-50 xl:text-stone-800 text-5xl w-full text-center '>
                                    Create Account
                                </div>
                                <div className='main-font text-stone-200 xl:text-stone-500 text-xl w-full text-center'>
                                    Sign up to get started with your account
                                </div>

                                <div className='px-4 md:px-10 pt-10'>
                                    <div>
                                        <div className='text-stone-50 xl:text-stone-800 text-lg'>
                                            Email
                                        </div>
                                        <input type="text" className='text-lg w-full rounded-sm text-stone-500 px-3 py-3 bg-stone-100 outline-none border border-stone-300' placeholder="Enter your email" />
                                    </div>

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

                                    <div className='pt-5'>
                                        <div className='text-stone-50 xl:text-stone-800 text-lg'>
                                            Confirm Password
                                        </div>
                                        <input type="password" className='text-lg w-full rounded-sm text-stone-500 px-3 py-3 bg-stone-100 outline-none border border-stone-300' placeholder="Confirm your password" />
                                    </div>

                                    <div className='pt-5'>
                                        <button className="w-full px-3 py-3 bg-stone-800 text-stone-50 rounded-sm">
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full absolute bottom-0 flex justify-center text-lg pb-2 gap-1'>
                                <span className='text-stone-50 xl:text-stone-500'>Already have an account? </span>
                                <span className='text-stone-950 xl:text-stone-800'><Link href="/login">Sign In</Link></span>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
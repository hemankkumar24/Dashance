import React from 'react'
import Link from 'next/link'

const page = () => {
    return (
        <div className='w-full h-screen'>
            <img className='absolute w-full h-screen -z-5' src="./images/wallpaper/wallpaper.webp"></img>
            <div className='flex justify-center items-center w-full h-full'>
                <div className='w-300 h-200 rounded-4xl border-stone-50 border-10'>
                    <div className='grid grid-cols-2 w-full h-full'>
                        {/* Left Side with Bottom Left Text */}
                        <div className='bg-transparent relative'>
                            <div className='flex flex-col absolute bottom-0 left-0 px-5 py-5 gap-2'>
                                <div className='italic-font text-6xl text-white'>
                                    Get
                                </div>
                                <div className='italic-font text-6xl text-white'>
                                    Everything
                                </div>
                                <div className='italic-font text-6xl text-white'>
                                    You Want
                                </div>
                                <div className='pt-5 main-font text-xl text-stone-100 w-[80%]'>
                                    You can get everything you want if you work hard, trust the process, and stick to the plan.
                                </div>
                            </div>
                        </div>
                        {/* Right Side */}
                        <div className='bg-stone-50 h-full rounded-tr-xl relative rounded-br-'>
                            <div className='absolute inset-0 pt-2 text-2xl flex justify-center italic-font text-stone-800 pointer-events-none'>
                                Dashance
                            </div>
                            {/* Actual Content */}
                            <div className='flex flex-col justify-center gap-2 w-full h-full'>
                                <div className='main-font text-stone-800 text-5xl w-full text-center'>
                                    Welcome Back
                                </div>
                                <div className='main-font text-stone-500 text-xl w-full text-center'>
                                    Enter your email and password to access your account
                                </div>

                                <div className='px-10 pt-10'>
                                    <div>
                                        <div className='text-stone-800 text-lg'>
                                            Email
                                        </div>
                                        <input type="text" className='text-lg w-full rounded-sm text-stone-500 px-3 py-3 bg-stone-100 outline-none border border-stone-300' placeholder="Enter your email" />
                                    </div>
                                    <div className='pt-5'>
                                        <div className='text-stone-800 text-lg'>
                                            Password
                                        </div>
                                        <input type="password" className='text-lg w-full rounded-sm text-stone-500 px-3 py-3 bg-stone-100 outline-none border border-stone-300' placeholder="Enter your password" />
                                    </div>
                                    <div className='pt-2 flex justify-between text-stone-800 text-sm'>
                                        <div className='flex gap-2'>
                                            <input type="checkbox" />
                                            Remember me
                                        </div>
                                        <div>
                                            Forgot Password
                                        </div>
                                    </div>
                                    <div className='pt-5'>
                                        <button className="w-full px-3 py-3 bg-stone-800 text-stone-50 rounded-sm">Sign In</button>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full absolute bottom-0 flex justify-center text-lg pb-2 gap-1'>
                                <span className='text-stone-500'>Don't have an account? </span>
                                <span className='text-stone-800'><Link href="/signup">Sign Up</Link></span>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default page
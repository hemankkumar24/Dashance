"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { LoaderCircle, LucideEye, LucideEyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FadeUpText from './components/FadeUp'

const page = () => {

    // router definition
    const router = useRouter();

    // ui related definition
    const [toggled, setToggled] = useState(false)
    const [loading, setLoading] = useState(false);
    // form related definitions
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // random line of the day
    const messages = ["Stay consistent. Your future self will thank you.", "Every great financial journey starts with one login.", "Keep building the habits that build wealth.", "Small decisions. Big financial wins.", "You're one step closer to your goals.", "Your financial journey continues here."]

    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, []);

    // handle login logic
    const handleLoginSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
                credentials: "include",
            })


            const data = await response.json();

            if (response.ok) {
                router.push("/dashboard");
            } else {
                setError(data.message);
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full h-dvh bg-black'>
            <img
                className='absolute w-full h-dvh object-cover opacity-90'
                src="./images/wallpaper/wallpaperNew.webp"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className='flex justify-center items-center px-2 w-full h-full py-0 md:py-5 xl:py-0'>
                <div className='w-200 h-150 xl:w-300 md:h-200 xl:rounded-4xl md:border-gray-400 md:border-2 xl:border-stone-600 rounded-xl xl:border-10'>

                    <div className='xl:grid xl:grid-cols-[1.3fr_1fr] w-full h-full'>

                        {/* Left Side */}
                        <div className='hidden xl:block bg-stone-950/30 rounded-2xl rounded-tr-none rounded-br-none backdrop-blur-xs relative'>
                            <div className='flex flex-col absolute bottom-0 left-0 px-5 py-5 gap-2'>
                                <div className='italic-font text-6xl text-white'>
                                    Master
                                </div>
                                <div className='italic-font text-6xl text-white'>
                                    Your
                                </div>
                                <div className='italic-font text-6xl text-white'>
                                    Money
                                </div>

                                <div className='pt-5 main-font text-xl text-stone-100 w-[80%]'>
                                    You can get everything you want if you work hard, trust the process, and stick to the plan.
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className='bg-stone-50 backdrop-blur-xs lg:backdrop-blur-sm xl:bg-stone-50 h-full relative rounded-xl xl:rounded-none xl:rounded-tr-xl xl:rounded-br-xl'>

                            <div className='absolute inset-0 pt-5 text-2xl flex justify-center italic-font text-stone-800 pointer-events-auto h-14'>
                                <Link href="/">Dashance</Link>
                            </div>

                            {/* Content */}
                            <div className='flex flex-col justify-center gap-1 w-full h-full'>

                                <div className='main-font text-stone-800 xl:text-stone-800 text-4xl xl:text-5xl w-full text-center'>
                                    Welcome Back
                                </div>

                                <div className='main-font text-stone-500 xl:text-stone-500 text-lg w-full text-center'>
                                    <FadeUpText
                                        text={message}
                                    />
                                </div>

                                <form className='px-5 md:px-10 pt-10' onSubmit={handleLoginSubmit}>

                                    {/* Email */}
                                    <div>
                                        <div className='text-stone-800 xl:text-stone-800 text-sm md:text-lg'>
                                            Email
                                        </div>

                                        <input
                                            type="text"
                                            className='text-sm xl:text-lg w-full rounded-sm text-stone-950 px-3 py-3 bg-stone-50 outline-none border border-stone-300'
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); }}
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className='pt-3 xl:pt-5'>
                                        <div className='text-stone-800 xl:text-stone-800  text-sm md:text-lg'>
                                            Password
                                        </div>

                                        <div className="relative">
                                            <input
                                                type={toggled ? "text" : "password"}
                                                className='text-sm xl:text-lg w-full rounded-sm text-stone-950 px-3 py-3 pr-10 bg-stone-50 outline-none border border-stone-300'
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => { setPassword(e.target.value); }}
                                            />

                                            <div
                                                className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer'
                                                onClick={() => setToggled(!toggled)}
                                            >
                                                {
                                                    toggled
                                                        ? <LucideEyeOff className='text-stone-500/50' />
                                                        : <LucideEye className='text-stone-500/50' />
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* Error logging area */}
                                    {
                                        error && <div className='text-sm text-red-500 py-2'>
                                            {error}
                                        </div>
                                    }

                                    {/* Remember + Forgot */}
                                    <div className='pt-3 xl:pt-5 flex justify-between text-sm text-stone-500 xl:text-stone-800'>
                                        <div className='flex gap-2'>
                                            <input type="checkbox" />
                                            Remember me
                                        </div>

                                        <div className='cursor-pointer'>
                                            Forgot Password
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <div className='pt-3 xl:pt-5'>
                                        <button className='w-full px-3 py-3 text-sm xl:text-md border border-white/20 md:border-none bg-stone-800 text-stone-50 rounded-sm cursor-pointer active:bg-stone-400 hover:bg-stone-700 active:text-stone-800' type='submit' disabled={loading}>
                                            {loading ? (
                                                <LoaderCircle className="animate-spin" />
                                            ) : (
                                                "Login"
                                            )}
                                        </button>
                                    </div>

                                </form>
                            </div>

                            {/* Bottom Link */}
                            <div className='w-full absolute bottom-0 flex justify-center text-lg pb-2 gap-1'>
                                <span className='text-stone-500 xl:text-stone-500'>
                                    Don't have an account?
                                </span>

                                <span className='text-blue-600'>
                                    <Link href="/signup">
                                        Sign Up
                                    </Link>
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
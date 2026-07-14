"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const [step, setStep] = useState(0);

    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
    const [budget, setBudget] = useState("");

    return (
        <div className="relative w-full h-dvh overflow-hidden bg-black">

            {/* Wallpaper */}
            <img
                src="/images/wallpaper/wallpaperNew.webp"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

            {/* Logo */}
            <Link
                href="/"
                className="absolute top-8 left-1/2 -translate-x-1/2 italic-font text-3xl text-white z-20"
            >
                Dashance
            </Link>

            {/* Progress */}

            <div className="absolute top-8 right-8 flex gap-2 z-20">

                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-500 ${
                            i === step
                                ? "w-8 bg-white"
                                : "w-2 bg-white/30"
                        }`}
                    />
                ))}

            </div>

            {/* Main */}

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">

                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .45 }}
                    className="w-full max-w-2xl"
                >

                    <div className="italic-font text-white text-6xl md:text-8xl">
                        {
                            step === 0
                                ? "Welcome."
                                : step === 1
                                    ? `Hi${name ? `, ${name}` : ""}.`
                                    : "Almost done."
                        }
                    </div>

                    <div className="main-font text-stone-300 text-xl mt-5 leading-relaxed max-w-xl">

                        {
                            step === 0 &&
                            "Let's personalize your workspace."

                        }

                        {
                            step === 1 &&
                            "How much money do you currently have?"
                        }

                        {
                            step === 2 &&
                            "Set your monthly spending budget."
                        }

                    </div>

                    {/* Input */}

                    <div className="mt-20">

                        {
                            step === 0 && (

                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    className="w-full bg-transparent border-b-2 border-white/20 focus:border-white text-white text-5xl md:text-6xl outline-none pb-4 placeholder:text-white/30 transition"
                                />

                            )
                        }

                        {
                            step === 1 && (

                                <div className="flex items-center">

                                    <span className="text-white text-6xl mr-4">
                                        ₹
                                    </span>

                                    <input
                                        value={balance}
                                        onChange={(e) => setBalance(e.target.value)}
                                        placeholder="0"
                                        type="number"
                                        className="w-full bg-transparent border-b-2 border-white/20 focus:border-white text-white text-6xl outline-none pb-4 placeholder:text-white/30 transition"
                                    />

                                </div>

                            )
                        }

                        {
                            step === 2 && (

                                <div className="flex items-center">

                                    <span className="text-white text-6xl mr-4">
                                        ₹
                                    </span>

                                    <input
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                        placeholder="0"
                                        type="number"
                                        className="w-full bg-transparent border-b-2 border-white/20 focus:border-white text-white text-6xl outline-none pb-4 placeholder:text-white/30 transition"
                                    />

                                </div>

                            )
                        }

                    </div>

                    {/* Continue */}

                    <div className="mt-20">

                        <button
                            onClick={() => {
                                if (step < 2)
                                    setStep(step + 1);
                                else {
                                    // submit
                                }
                            }}
                            className="bg-white text-stone-900 px-8 py-4 rounded-full main-font text-lg hover:scale-105 active:scale-95 transition"
                        >

                            {
                                step === 2
                                    ? "Finish Setup →"
                                    : "Continue →"
                            }

                        </button>

                    </div>

                </motion.div>

            </div>

        </div>
    );
}
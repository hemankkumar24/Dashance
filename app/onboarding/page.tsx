"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const [step, setStep] = useState(0);

    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
    const [budget, setBudget] = useState("");

    const steps = ["Personalize", "Balance", "Budget"];

    const currentTitle =
        step === 0 ? "Welcome." : step === 1 ? `Hi${name ? `, ${name}` : ""}.` : "Almost done.";

    const currentSubtitle =
        step === 0
            ? "Let’s personalize your workspace."
            : step === 1
                ? "What's your current account balance?"
                : "Set your monthly spending budget.";

    const inputClassName =
        "w-full rounded-3xl border border-white/10 bg-white/8 px-5 py-4 text-lg text-white placeholder:text-white/35 outline-none backdrop-blur-md transition focus:border-white/25 focus:bg-white/12 sm:px-6 sm:py-5 sm:text-xl lg:text-2xl";

    return (
        <div className="relative min-h-dvh overflow-hidden bg-[#050505]">
            <img
                src="/images/wallpaper/wallpaperNew.webp"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-70"
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_38%),linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.72))]" />

            <div className="relative z-10 flex min-h-dvh flex-col">
                <header className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-5 lg:px-10 lg:pt-8">
                    <Link
                        href="/"
                        className="italic-font text-2xl text-white/95 transition hover:text-white sm:text-3xl"
                    >
                        Dashance
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <span className="main-font text-xs uppercase tracking-[0.35em] text-white/45 sm:text-sm">
                            Setup
                        </span>
                        <div className="flex gap-2">
                            {[0, 1, 2].map((index) => (
                                <div
                                    key={index}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${index === step ? "w-10 bg-white" : "w-2 bg-white/30"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </header>

                <main className="flex flex-1 items-center justify-center px-4 py-4 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
                    <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:rounded-[2.5rem]">
                        <div className="grid min-h-136 lg:grid-cols-[1fr_1.15fr]">
                            <aside className="relative hidden overflow-hidden border-r border-white/10 bg-white/5 p-8 lg:flex lg:flex-col lg:justify-between xl:p-10">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_35%)]" />
                                <div className="relative z-10 space-y-8">
                                    <div className="inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 main-font text-sm tracking-[0.24em] text-white/70">
                                        Smooth onboarding
                                    </div>
                                    <div className="space-y-4 text-white">
                                        <div className="max-w-sm italic-font text-5xl leading-[0.95] xl:text-6xl">
                                            Clean setup.
                                            <br />
                                            Minimal friction.
                                        </div>
                                        <p className="max-w-md pb-4 main-font text-base leading-7 text-white/72 xl:text-lg">
                                            Set up your workspace in a few quick steps with a calm, focused interface that stays clear on every screen size.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative z-10 grid gap-3 text-white/72 main-font">
                                    {steps.map((label, index) => (
                                        <div
                                            key={label}
                                            className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition ${index === step
                                                ? "border-white/20 bg-white/12 text-white"
                                                : "border-white/8 bg-white/5"
                                                }`}
                                        >
                                            <span>{label}</span>
                                            <span className="text-xs uppercase tracking-[0.28em]">
                                                0{index + 1}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </aside>

                            <section className="flex items-center px-5 py-6 sm:px-8 sm:py-10 md:px-10 lg:px-12 lg:py-12">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.45 }}
                                    className="w-full"
                                >
                                    <div className="mb-8 flex flex-wrap items-center gap-3 sm:mb-10">
                                        <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2 main-font text-xs tracking-[0.3em] text-white/70">
                                            {steps[step]}
                                        </span>
                                        <span className="main-font text-sm text-white/45 sm:text-base">
                                            Step {step + 1} of 3
                                        </span>
                                    </div>

                                    <div className="max-w-2xl space-y-6">
                                        <div className="italic-font text-4xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                                            {currentTitle}
                                        </div>

                                        <p className="max-w-xl main-font text-base leading-7 text-white/70 sm:text-lg lg:text-xl">
                                            {currentSubtitle}
                                        </p>
                                    </div>

                                    <div className="mt-10 sm:mt-14">
                                        {step === 0 && (
                                            <input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Your name"
                                                className={inputClassName}
                                            />
                                        )}

                                        {step === 1 && (
                                            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/8 px-5 py-4 backdrop-blur-md transition focus-within:border-white/25 focus-within:bg-white/12 sm:px-6 sm:py-5">
                                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg text-white/80 sm:h-14 sm:w-14 sm:text-xl">
                                                    ₹
                                                </span>
                                                <input
                                                    value={balance}
                                                    onChange={(e) => setBalance(e.target.value)}
                                                    placeholder="0"
                                                    type="number"
                                                    inputMode="numeric"
                                                    className="w-full bg-transparent text-lg text-white outline-none placeholder:text-white/35 sm:text-xl lg:text-2xl"
                                                />
                                            </div>
                                        )}

                                        {step === 2 && (
                                            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/8 px-5 py-4 backdrop-blur-md transition focus-within:border-white/25 focus-within:bg-white/12 sm:px-6 sm:py-5">
                                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg text-white/80 sm:h-14 sm:w-14 sm:text-xl">
                                                    ₹
                                                </span>
                                                <input
                                                    value={budget}
                                                    onChange={(e) => setBudget(e.target.value)}
                                                    placeholder="0"
                                                    type="number"
                                                    inputMode="numeric"
                                                    className="w-full bg-transparent text-lg text-white outline-none placeholder:text-white/35 sm:text-xl lg:text-2xl"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:items-center">
                                        {step > 0 && (
                                            <button
                                                onClick={() => setStep(step - 1)}
                                                className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 py-3.5 main-font text-sm text-white/90 transition hover:bg-white/10 sm:w-auto sm:px-7 sm:py-4"
                                            >
                                                ← Back
                                            </button>
                                        )}

                                        <button
                                            onClick={() => {
                                                if (step < 2) {
                                                    setStep(step + 1);
                                                } else {
                                                    // submit
                                                }
                                            }}
                                            className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 main-font text-sm font-medium text-stone-900 transition hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:px-8 sm:py-4 sm:text-base"
                                        >
                                            {step === 2 ? "Finish setup →" : "Continue →"}
                                        </button>
                                    </div>
                                </motion.div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
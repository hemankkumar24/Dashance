"use client";

import { ArrowBigDown, ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDashboard } from "@/app/context/DashboardProvider";
import { celebrateGoal } from "@/lib/celebrate";

import { toast } from "sonner";

interface AddIncomeModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AddIncomeModal({
    open,
    onClose,
}: AddIncomeModalProps) {
    if (!open) return null;

    const categories = [
        "Salary",
        "Freelance",
        "Investment",
        "Gift",
        "Other",
    ];

    const { refreshDashboard, goals, setCompletingGoalId } = useDashboard();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Salary");
    const [loading, setLoading] = useState(false);
    const [goalId, setGoalId] = useState("")
    const successSound = useRef<HTMLAudioElement | null>(null);


    const handleSubmit = async () => {
        if (!title.trim() || !amount) return;

        try {
            setLoading(true);

            const response = await fetch("/api/transactions", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    amount: Number(amount),
                    category,
                    type: "income",
                    createdAt: customDate ? transactionDate : undefined,
                    goalId: goalId || undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            if (data.goalCompleted) {
                celebrateGoal();

                const goalname = goals.find(goal => goal.id === goalId)?.title;

                toast.success(`${goalname} funded`, {
                    description: "Congratulations! Time to set your next goal.",
                });
                setCompletingGoalId(data.goalId);
                successSound.current = new Audio("/sounds/goal-complete.mp3");
                successSound.current.volume = 0.5; // 0–1
                successSound.current.currentTime = 0;
                await successSound.current.play();

                setTimeout(async () => {
                    await refreshDashboard();
                    setCompletingGoalId(null);
                }, 900);
            }
            else {
                await refreshDashboard();
            }

            setTitle("");
            setAmount("");
            setCategory("Salary");

            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const [customDate, setCustomDate] = useState(false);

    const [transactionDate, setTransactionDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm md:items-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full md:max-w-xl rounded-t-[2rem] md:rounded-[2rem] bg-stone-50 border border-stone-200 shadow-2xl animate-in slide-in-from-bottom md:fade-in md:zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-5 border-stone-200">

                    <div className="flex items-center gap-3">

                        <div className="rounded-full bg-green-100 p-2 text-green-600">
                            <ArrowBigDown size={20} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">
                                Add Income
                            </h2>

                            <p className="text-sm text-stone-500">
                                Record a new income transaction.
                            </p>
                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 transition hover:bg-stone-200"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Form */}
                <div className="mt-8 space-y-5 px-5">

                    <div>
                        <label className="text-sm text-stone-500">
                            Title
                        </label>

                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Salary"
                            className="mt-2 w-full rounded-2xl bg-stone-100 border border-stone-200 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-stone-600 mb-2">
                            Amount
                        </label>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">
                                ₹
                            </span>

                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="w-full rounded-2xl border border-stone-200 bg-stone-100 pl-8 pr-4 py-3 outline-none transition focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-stone-600 mb-2">
                            Category
                        </label>

                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full appearance-none rounded-2xl border border-stone-200 bg-stone-100 px-4 py-3 outline-none transition focus:border-blue-500"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>

                            <ChevronDown
                                size={18}
                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-stone-200 bg-stone-100 p-4">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-stone-500">
                                    Transaction Date
                                </p>

                                <p className="mt-1 font-medium">
                                    {customDate
                                        ? new Date(transactionDate).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })
                                        : "Today"}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setCustomDate((prev) => !prev)}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                {customDate ? "Use Today" : "Change"}
                            </button>

                        </div>

                        {customDate && (
                            <input
                                type="date"
                                value={transactionDate}
                                onChange={(e) => setTransactionDate(e.target.value)}
                                max={new Date().toISOString().split("T")[0]}
                                className="mt-4 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                            />
                        )}

                    </div>

                    <div>
                        <label className="block text-sm text-stone-600 mb-2">
                            Contribute to Goal (Optional)
                        </label>

                        <div className="relative">
                            <select
                                value={goalId}
                                onChange={(e) => setGoalId(e.target.value)}
                                className="w-full appearance-none rounded-2xl border border-stone-200 bg-stone-100 px-4 py-3 outline-none transition focus:border-blue-500"
                            >
                                <option value="">Don't add to a goal</option>

                                {goals
                                    .filter((goal) => !goal.archived)
                                    .map((goal) => (
                                        <option key={goal.id} value={goal.id}>
                                            {goal.title}
                                        </option>
                                    ))}
                            </select>

                            <ChevronDown
                                size={18}
                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
                            />
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="mt-8 flex justify-end gap-3 pb-5 px-5">

                    <button
                        onClick={onClose}
                        className="rounded-2xl bg-stone-200 px-5 py-3 hover:bg-stone-300 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading || !title.trim() || !amount}
                        className="rounded-2xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-500 transition"
                    >
                        {loading ? "Saving..." : "Save Income"}
                    </button>

                </div>

            </div>
        </div>
    );
}
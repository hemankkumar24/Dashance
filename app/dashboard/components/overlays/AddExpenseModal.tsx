"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useDashboard } from "@/app/context/DashboardProvider";

interface AddExpenseModalProps {
    open: boolean;
    onClose: () => void;
}

const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Bills",
    "Health",
    "Education",
    "Investment",
    "Other",
];

export default function AddExpenseModal({
    open,
    onClose,
}: AddExpenseModalProps) {
    const { goals, refreshDashboard } = useDashboard();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [goalId, setGoalId] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleSubmit = async () => {
        if (!title.trim() || !amount) return;

        try {
            setLoading(true);

            await fetch("/api/transactions", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    amount: Number(amount),
                    category,
                    type: "expense",
                    goalId: goalId || undefined,
                }),
            });

            await refreshDashboard();

            setTitle("");
            setAmount("");
            setCategory("Food");
            setGoalId("");

            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm md:items-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full md:max-w-xl rounded-t-[2rem] md:rounded-[2rem] bg-stone-50 border border-stone-200 shadow-2xl p-7 animate-in fade-in zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between">

                    <div>
                        <h2 className="text-2xl font-semibold">
                            Add Expense
                        </h2>

                        <p className="mt-1 text-sm text-stone-500">
                            Record where your money went.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-stone-200 transition"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Form */}
                <div className="mt-8 space-y-5">

                    {/* Title */}

                    <div>

                        <label className="block text-sm text-stone-600 mb-2">
                            Title
                        </label>

                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Chicken Burger"
                            className="w-full rounded-2xl border border-stone-200 bg-stone-100 px-4 py-3 outline-none transition focus:border-blue-500"
                        />

                    </div>

                    {/* Amount */}

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

                    {/* Category */}

                    <div>

                        <label className="block text-sm text-stone-600 mb-2">
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-2xl border border-stone-200 bg-stone-100 px-4 py-3 outline-none transition focus:border-blue-500"
                        >
                            {categories.map((category) => (
                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* Goal */}

                    {goals.filter((goal) => !goal.archived).length > 0 && (

                        <div>

                            <label className="block text-sm text-stone-600 mb-2">
                                Contribute to Goal
                            </label>

                            <select
                                value={goalId}
                                onChange={(e) => setGoalId(e.target.value)}
                                className="w-full rounded-2xl border border-stone-200 bg-stone-100 px-4 py-3 outline-none transition focus:border-blue-500"
                            >
                                <option value="">
                                    None
                                </option>

                                {goals
                                    .filter((goal) => !goal.archived)
                                    .map((goal) => (
                                        <option
                                            key={goal.id}
                                            value={goal.id}
                                        >
                                            {goal.icon} {goal.title}
                                        </option>
                                    ))}

                            </select>

                        </div>

                    )}

                </div>

                {/* Footer */}

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="rounded-2xl bg-stone-200 px-5 py-3 transition hover:bg-stone-300"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={
                            loading ||
                            !title.trim() ||
                            !amount
                        }
                        onClick={handleSubmit}
                        className="rounded-2xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Expense"}
                    </button>

                </div>

            </div>
        </div>
    );
}
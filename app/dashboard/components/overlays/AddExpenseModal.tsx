"use client";

import { useState } from "react";
import { ArrowBigUp, X } from "lucide-react";
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
    const [goalError, setGoalError] = useState("");
    const [customDate, setCustomDate] = useState(false);

    const [transactionDate, setTransactionDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    if (!open) return null;

    const handleSubmit = async () => {
        if (!title.trim() || !amount) return;

        try {
            setLoading(true);

            setGoalError("");

            if (goalId) {
                const selectedGoal = goals.find((goal) => goal.id === goalId);

                if (
                    selectedGoal &&
                    Number(amount) > selectedGoal.currentAmount
                ) {
                    setGoalError(
                        `This goal only has ₹${selectedGoal.currentAmount.toLocaleString("en-IN")} available.`
                    );
                    return;
                }
            }

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
                    goalId,
                    createdAt: customDate ? transactionDate : undefined,
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
                className="w-full md:max-w-xl rounded-t-[2rem] md:rounded-[2rem] bg-stone-50 border border-stone-200 shadow-2xl animate-in slide-in-from-bottom md:fade-in md:zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-5 border-stone-200">

                    <div className="flex items-center gap-3">

                        <div className="rounded-full bg-red-100 p-2 text-red-600">
                            <ArrowBigUp size={20} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">
                                Add Expense
                            </h2>

                            <p className="text-sm text-stone-500">
                                Record where your money went.
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
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    setGoalError("");
                                }}
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
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
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

                    {/* Goal */}

                    {goals.filter((goal) => !goal.archived) && (

                        <div>

                            <label className="block text-sm text-stone-600 mb-2">
                                Use Goal Funds (optional)
                            </label>

                            <select
                                value={goalId}
                                onChange={(e) => {
                                    setGoalId(e.target.value);
                                    setGoalError("");
                                }}
                                className="w-full rounded-2xl border border-stone-200 bg-stone-100 px-4 py-3 outline-none transition focus:border-blue-500"
                            >
                                <option value="">
                                    Don't use goal funds
                                </option>

                                {goals
                                    .filter((goal) => !goal.archived)
                                    .map((goal) => (
                                        <option
                                            key={goal.id}
                                            value={goal.id}
                                        >
                                            {goal.title}
                                        </option>
                                    ))}

                            </select>
                            {goalError && (
                                <p className="mt-2 text-sm text-red-600">
                                    {goalError}
                                </p>
                            )}
                        </div>



                    )}

                </div>

                {/* Footer */}

                <div className="mt-8 flex justify-end gap-3 pb-6 px-5">

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
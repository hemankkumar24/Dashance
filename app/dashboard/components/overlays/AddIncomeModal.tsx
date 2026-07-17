"use client";

import { ArrowBigDown, X } from "lucide-react";
import { useState } from "react";
import { useDashboard } from "@/app/context/DashboardProvider";

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

    const { refreshDashboard } = useDashboard();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Salary");
    const [loading, setLoading] = useState(false);

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
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            await refreshDashboard();

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
                className="w-full md:max-w-xl rounded-t-[2rem] md:rounded-[2rem] bg-stone-50 border border-stone-200 shadow-2xl p-7 animate-in fade-in zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between">

                    <div>
                        <h2 className="text-2xl font-semibold">
                            Add Income
                        </h2>

                        <p className="text-stone-500 mt-1">
                            Record a new income transaction.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-stone-200 transition"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Form */}
                <div className="mt-8 space-y-5">

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
                        <label className="text-sm text-stone-500">
                            Amount
                        </label>

                        <input
                            type="number"
                            placeholder="₹25,000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="mt-2 w-full rounded-2xl bg-stone-100 border border-stone-200 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-stone-500">
                            Category
                        </label>

                        <select
                            className="mt-2 w-full rounded-2xl bg-stone-100 border border-stone-200 px-4 py-3 outline-none focus:border-blue-500"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((category, key) => {
                                return (
                                    <option key={key}>
                                        {category}
                                    </option>
                                );
                            })}
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

                </div>

                {/* Footer */}
                <div className="mt-8 flex justify-end gap-3">

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
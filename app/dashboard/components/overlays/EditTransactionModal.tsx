import { DashboardTransaction, useDashboard } from "@/app/context/DashboardProvider";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface EditTransactionModalProps {
    open: boolean;
    transaction: DashboardTransaction | null;
    onClose: () => void;
    onUpdate: (transaction: DashboardTransaction) => void;
}

const EditTransactionModal = ({ open, transaction, onClose, onUpdate }: EditTransactionModalProps) => {
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

    const { goals, refreshDashboard } = useDashboard();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [goalId, setGoalId] = useState("");
    const [loading, setLoading] = useState(false);
    const [customDate, setCustomDate] = useState(false);

    const [transactionDate, setTransactionDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    useEffect(() => {
        if (!transaction) return;

        setTitle(transaction.title);
        setAmount(transaction.amount.toString());
        setCategory(transaction.category);
        setGoalId(transaction.goalId ?? "");

        setTransactionDate(
            new Date(transaction.createdAt)
                .toISOString()
                .split("T")[0]
        );

        setCustomDate(true);
    }, [transaction]);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            console.log({
                title,
                amount,
                category,
                goalId,
                createdAt: transactionDate,
                type: transaction?.type,
            });

            const response = await fetch(`/api/transactions/${transaction?.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    amount: Number(amount),
                    category,
                    goalId,
                    createdAt: transactionDate,
                    type: transaction?.type,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }
            console.log(data.transaction);
            onUpdate(data.transaction);

            await refreshDashboard();
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    if (!open || !transaction) return null;

    return transaction.type === "income" ? (
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
                            Edit Income
                        </h2>

                        <p className="text-stone-500 mt-1">
                            Update your income transaction.
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
                        {loading ? "Saving..." : "Save Changes"}
                    </button>

                </div>

            </div>
        </div>
    ) : (
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
                            Edit Expense
                        </h2>

                        <p className="mt-1 text-sm text-stone-500">
                            Update your expense transaction.
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
                        {loading ? "Saving..." : "Save Changes"}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default EditTransactionModal
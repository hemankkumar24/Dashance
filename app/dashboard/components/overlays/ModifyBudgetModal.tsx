"use client";

import { LoaderCircle, Wallet, X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ModifyBudgetModalProps {
    open: boolean;
    currentBudget: number;
    loading?: boolean;
    onClose: () => void;
    onSave: (budget: number) => Promise<void> | void;
}

const ModifyBudgetModal = ({
    open,
    currentBudget,
    loading = false,
    onClose,
    onSave,
}: ModifyBudgetModalProps) => {
    const [budget, setBudget] = useState(currentBudget);

    useEffect(() => {
        if (open) setBudget(currentBudget);
    }, [open, currentBudget]);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !loading) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, loading, onClose]);

    if (!open) return null;

    const changed = budget !== currentBudget;
    const valid = budget > 0;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
                    absolute bottom-0 left-0 right-0
                    rounded-t-3xl bg-white shadow-2xl
                    animate-in slide-in-from-bottom duration-200

                    md:top-1/2 md:left-1/2 md:bottom-auto md:right-auto
                    md:w-full md:max-w-md
                    md:-translate-x-1/2 md:-translate-y-1/2
                    md:rounded-3xl
                    md:zoom-in-95 md:fade-in
                "
            >
                {/* Mobile drag handle */}
                <div className="flex justify-center pt-3 md:hidden">
                    <div className="h-1.5 w-12 rounded-full bg-stone-300" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-stone-100 p-2 text-blue-600">
                            <Wallet size={20} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">
                                Monthly Budget
                            </h2>

                            <p className="text-sm text-stone-500">
                                Update your monthly spending limit.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-full p-2 transition hover:bg-stone-100"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-6 px-6 py-6">

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Budget
                        </label>

                        <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50 px-4">
                            <span className="text-stone-500 text-lg">₹</span>

                            <input
                                autoFocus
                                type="number"
                                value={budget}
                                min={1}
                                onChange={(e) =>
                                    setBudget(Number(e.target.value))
                                }
                                onKeyDown={(e) => {
                                    if (
                                        e.key === "Enter" &&
                                        valid &&
                                        changed &&
                                        !loading
                                    ) {
                                        onSave(budget);
                                    }
                                }}
                                className="w-full bg-transparent px-2 py-4 text-lg outline-none"
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl bg-stone-100 p-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-stone-500">
                                Current Budget
                            </span>

                            <span>
                                ₹{currentBudget.toLocaleString()}
                            </span>
                        </div>

                        <div className="my-3 h-px bg-stone-200" />

                        <div className="flex justify-between">
                            <span className="text-stone-500">
                                New Budget
                            </span>

                            <span className="text-lg font-semibold text-blue-600">
                                ₹{budget.toLocaleString()}
                            </span>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-stone-200 px-6 py-5">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-xl border border-stone-200 px-5 py-2.5 hover:bg-stone-100"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={!changed || !valid || loading}
                        onClick={() => onSave(budget)}
                        className="flex min-w-32 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? (
                            <LoaderCircle
                                size={18}
                                className="animate-spin"
                            />
                        ) : (
                            "Save Budget"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModifyBudgetModal;
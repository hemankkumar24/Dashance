"use client";

import {
    Car,
    Gamepad2,
    Home,
    Laptop,
    LoaderCircle,
    Plane,
    Target,
    Wallet,
    X,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const ICONS = [
    { name: "Target", icon: Target },
    { name: "Laptop", icon: Laptop },
    { name: "Plane", icon: Plane },
    { name: "Car", icon: Car },
    { name: "House", icon: Home },
    { name: "Gamepad2", icon: Gamepad2 },
    { name: "Wallet", icon: Wallet },
] as const;

interface GoalModalProps {
    open: boolean;
    loading?: boolean;
    onClose: () => void;
    onCreate: (goal: {
        title: string;
        targetAmount: number;
        icon: string;
    }) => Promise<void> | void;
}

const GoalModal = ({
    open,
    loading = false,
    onClose,
    onCreate,
}: GoalModalProps) => {
    const [title, setTitle] = useState("");
    const [targetAmount, setTargetAmount] = useState(0);
    const [icon, setIcon] = useState("Target");

    useEffect(() => {
        if (!open) return;

        setTitle("");
        setTargetAmount(0);
        setIcon("Target");
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handler);

        return () => window.removeEventListener("keydown", handler);
    }, [open, onClose]);

    if (!open) return null;

    const valid =
        title.trim().length > 0 &&
        targetAmount > 0;

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
                 animate-in slide-in-from-bottom md:fade-in md:zoom-in-95 duration-200
                md:top-1/2
                md:left-1/2
                md:bottom-auto
                md:right-auto
                md:w-full
                md:max-w-lg
                md:-translate-x-1/2
                md:-translate-y-1/2
                md:rounded-3xl
            "
            >
                <div className="flex justify-center pt-3 md:hidden">
                    <div className="h-1.5 w-12 rounded-full bg-stone-300" />
                </div>

                {/* Header */}

                <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">

                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-stone-100 p-2 text-blue-600">
                            <Target size={20} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">
                                Create Goal
                            </h2>

                            <p className="text-sm text-stone-500">
                                Start saving towards something meaningful.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-stone-100"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}

                <div className="space-y-6 p-6">

                    {/* Title */}

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Goal Name
                        </label>

                        <input
                            autoFocus
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="e.g. MacBook Pro"
                            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Target */}

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Target Amount
                        </label>

                        <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50 px-4">
                            <span className="text-stone-500">
                                ₹
                            </span>

                            <input
                                type="number"
                                min={1}
                                value={targetAmount}
                                onChange={(e) => { 
                                    setTargetAmount(Number(e.target.value))}
                                }
                                className="w-full bg-transparent px-2 py-3 outline-none"
                            />
                        </div>
                    </div>

                    {/* Icons */}

                    <div>
                        <label className="mb-3 block text-sm font-medium">
                            Choose an Icon
                        </label>

                        <div className="grid grid-cols-4 gap-3">
                            {ICONS.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        key={item.name}
                                        type="button"
                                        onClick={() =>
                                            setIcon(item.name)
                                        }
                                        className={`rounded-2xl border p-4 transition ${
                                            icon === item.name
                                                ? "border-blue-600 bg-blue-50 text-blue-600"
                                                : "border-stone-200 hover:bg-stone-100"
                                        }`}
                                    >
                                        <Icon className="mx-auto" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer */}

                <div className="flex flex-col-reverse gap-3 border-t border-stone-200 p-6 md:flex-row md:justify-end">

                    <button
                        onClick={onClose}
                        className="rounded-xl border border-stone-200 px-5 py-3 hover:bg-stone-100"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={!valid || loading}
                        onClick={() =>
                            onCreate({
                                title: title.trim(),
                                targetAmount,
                                icon,
                            })
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? (
                            <LoaderCircle
                                className="animate-spin"
                                size={18}
                            />
                        ) : (
                            "Create Goal"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GoalModal;
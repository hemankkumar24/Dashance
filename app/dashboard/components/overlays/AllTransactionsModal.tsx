"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DashboardTransaction } from "@/app/context/DashboardProvider";
import TransactionMonth from "../Transactions/TransactionMonth";
import { LoaderCircle, X } from "lucide-react";

interface AllTransactionsModalProps {
    open: boolean;
    onClose: () => void;
}

const AllTransactionsModal = ({
    open,
    onClose,
}: AllTransactionsModalProps) => {

    const [transactions, setTransactions] = useState<DashboardTransaction[]>([]);

    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    const [hasMore, setHasMore] = useState(true);

    const LIMIT = 20;

    useEffect(() => {

        if (!open) return;

        const observer = new IntersectionObserver(
            (entries) => {

                const entry = entries[0];

                if (
                    entry.isIntersecting &&
                    hasMore &&
                    !loading
                ) {

                    fetchTransactions(page + 1);

                }

            },
            {
                threshold: 0.5,
            }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();

    }, [page, hasMore, loading, open]);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchTransactions = async (
        pageNumber: number,
        reset = false
    ) => {

        try {

            setLoading(true);
            console.log("Fetching page", pageNumber);
            const response = await fetch(
                `/api/transactions?page=${pageNumber}&limit=${LIMIT}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setTransactions(prev =>
                reset
                    ? data.transactions
                    : [...prev, ...data.transactions]
            );

            setHasMore(data.hasMore);

            setPage(pageNumber);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        if (!open) return;

        fetchTransactions(1, true);

    }, [open]);

    const groupedTransactions = useMemo(() => {

        const grouped: Record<string, DashboardTransaction[]> = {};

        transactions.forEach((transaction) => {

            const date = new Date(transaction.createdAt);

            const month = date.toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
            });

            if (!grouped[month]) {
                grouped[month] = [];
            }

            grouped[month].push(transaction);

        });

        return grouped;

    }, [transactions]);

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50" data-lenis-prevent>

            {/* Backdrop */}

            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}

            <div
                className="
                    absolute inset-0
                    md:inset-auto
                    md:left-1/2
                    md:top-1/2
                    md:w-190
                    md:max-w-[90vw]
                    h-[92vh]
                    md:-translate-x-1/2
                    md:-translate-y-1/2
                    overflow-hidden
                    bg-white
                    rounded-t-[32px]
                    md:rounded-[32px]
                    shadow-[0_30px_80px_rgba(0,0,0,0.12)]
                    border border-stone-200
                    animate-in
                    fade-in
                    zoom-in-95
                    duration-200
                "
            >

                {/* Header */}

                <div className="sticky top-0 z-20 flex items-center justify-between bg-white px-6 py-5">

                    <h1 className="text-2xl font-bold">
                        Transactions
                    </h1>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 transition hover:bg-stone-100"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Scrollable Content */}

                <div className="h-[calc(100%-80px)] overflow-y-auto px-6 py-6">

                    <div className="space-y-10">

                        {Object.entries(groupedTransactions).map(
                            ([month, transactions]) => (

                                <TransactionMonth
                                    key={month}
                                    month={month}
                                    transactions={transactions}
                                />

                            )
                        )}

                    </div>

                    {/* Loader */}

                    {loading && (

                        <div className="flex justify-center py-8">

                            <LoaderCircle
                                size={32}
                                className="animate-spin text-stone-500"
                            />

                        </div>

                    )}

                    {/* Infinite Scroll Observer */}

                    <div
                        ref={observerRef}
                        className="h-4"
                    />

                </div>

            </div>

        </div>

    );

};

export default AllTransactionsModal;
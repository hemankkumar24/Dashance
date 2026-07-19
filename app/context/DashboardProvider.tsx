"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

export interface DashboardUser {
    name: string;
    currentBalance: number;
    monthlyBudget: number;
    onboardingComplete: boolean;
}

export interface DashboardTransaction {
    id: string;
    title: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    goalId?: string;
    createdAt: string;
}

export interface DashboardGoal {
    id: string;
    title: string;
    icon: string;
    targetAmount: number;
    currentAmount: number;
    archived: boolean;
}

// just defining what will be in the context
interface DashboardContextType {
    user: DashboardUser | null;

    transactions: DashboardTransaction[];
    goals: DashboardGoal[];

    expenseTransactions: DashboardTransaction[];
    incomeTransactions: DashboardTransaction[];

    selectedMonth: {
        month: number;
        year: number;
    };

    setSelectedMonth: React.Dispatch<
        React.SetStateAction<{
            month: number;
            year: number;
        }>
    >;

    availableMonths: {
        month: number;
        year: number;
        label: string;
    }[];

    getTransactions: (params: {
        month: number;
        year: number;
        type?: "income" | "expense";
    }) => DashboardTransaction[];

    getSpent: (month: number, year: number) => number;

    getIncome: (month: number, year: number) => number;

    loading: boolean;
    error: string;

    refreshDashboard: () => Promise<void>;

    getCashflowForYear: (year: number) => {
        month: number;
        income: number;
        expense: number;
    }[];

    completingGoalId: string | null;
    setCompletingGoalId: React.Dispatch<
        React.SetStateAction<string | null>
    >;
}
// create the context area
const DashboardContext = createContext<DashboardContextType | null>(null);

// context provider that takes components as children and provides them data
export function DashboardProvider({
    children,
}: {
    children: ReactNode; // children to be react nodes
}) {
    // all the states
    const [user, setUser] = useState<DashboardUser | null>(null);

    const [transactions, setTransactions] = useState<DashboardTransaction[]>([]);

    const [goals, setGoals] = useState<DashboardGoal[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [completingGoalId, setCompletingGoalId] = useState<string | null>(null);

    // the main usecase is to simply update, ui 
    const refreshDashboard = async () => {
        try {
            const response = await fetch("/api/dashboard", {
                credentials: "include",
            });
            const data = await response.json();
            setUser(data.user);
            setTransactions(data.transactions);
            setGoals(data.goals);
            setLoading(false);
        }
        catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong.");
            }
        }
    };

    // calculating total spent and total income
    const now = new Date;

    // available months calculations
    const [selectedMonth, setSelectedMonth] = useState({
        month: now.getMonth(),
        year: now.getFullYear(),
    });

    const availableMonths = [
        ...new Map(
            transactions.map((transaction) => {
                const date = new Date(transaction.createdAt);

                const key = `${date.getFullYear()}-${date.getMonth()}`;

                return [
                    key,
                    {
                        month: date.getMonth(),
                        year: date.getFullYear(),
                        label: date.toLocaleString("en-IN", {
                            month: "long",
                            year: "numeric",
                        }),
                    },
                ];
            })
        ).values(),
    ].sort((a, b) => {
        if (a.year !== b.year) {
            return b.year - a.year;
        }

        return b.month - a.month;
    });

    const getTransactions = ({
        month,
        year,
        type,
    }: {
        month: number;
        year: number;
        type?: "income" | "expense";
    }) => {
        return transactions.filter((transaction) => {
            const date = new Date(transaction.createdAt);

            const sameMonth =
                date.getMonth() === month &&
                date.getFullYear() === year;

            const sameType =
                !type || transaction.type === type;

            return sameMonth && sameType;
        });
    };

    const getSpent = (month: number, year: number) => {
        return getTransactions({
            month,
            year,
            type: "expense",
        }).reduce((sum, transaction) => sum + transaction.amount, 0);
    };

    const getIncome = (month: number, year: number) => {
        return getTransactions({
            month,
            year,
            type: "income",
        }).reduce((sum, transaction) => sum + transaction.amount, 0);
    };

    const expenseTransactions = getTransactions({
        month: selectedMonth.month,
        year: selectedMonth.year,
        type: "expense",
    });

    const incomeTransactions = getTransactions({
        month: selectedMonth.month,
        year: selectedMonth.year,
        type: "income",
    });

    const getCashflowForYear = (year: number) => {
        return Array.from({ length: 12 }, (_, month) => ({
            month,
            income: getIncome(month, year),
            expense: getSpent(month, year),
        }));
    };

    useEffect(() => {
        refreshDashboard();
    }, []);

    return (

        <DashboardContext.Provider

            value={{
                user, // user db
                transactions, // transactions (all)
                goals, // goals (all)

                expenseTransactions, // expense transactions for a certain month
                incomeTransactions, // income transactions for a certain month
                getTransactions, // get all transactions for any month

                selectedMonth,  // the currently selected month
                setSelectedMonth,// expense, income depends on this
                getSpent, // this accepts month individually
                getIncome, // this accepts month individually

                availableMonths, // find all months available for the user

                loading, // if loading currently
                error, // if an error occurs

                refreshDashboard, // refresh
                getCashflowForYear, // for cashflow

                // for animation
                completingGoalId, 
                setCompletingGoalId,
            }}

        >

            {children}

        </DashboardContext.Provider>

    )
}

export function useDashboard() {
    const context = useContext(DashboardContext);

    if (!context) {
        throw new Error(
            "useDashboard must be used inside DashboardProvider"
        );
    }

    return context;
}

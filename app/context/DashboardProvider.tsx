"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

// just defining what will be in the context
interface DashboardContextType {
    user: any;
    transactions: any[];
    goals: any[];

    loading: boolean;
    error: string;

    refreshDashboard: () => Promise<void>;
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
    const [user, setUser] = useState(null);

    const [transactions, setTransactions] = useState([]);

    const [goals, setGoals] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");



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


    useEffect(() => {
        refreshDashboard();
    }, []);

    return (

        <DashboardContext.Provider

            value={{
                user,
                transactions,
                goals,

                loading,
                error,

                refreshDashboard,
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

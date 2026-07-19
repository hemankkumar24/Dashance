"use client"

import React, { useState } from 'react'
import { SemiGauge } from "../../components/Dashboard/SemiGauge"
import { Edit3Icon } from 'lucide-react'
import {
    Target,
    Laptop,
    Plane,
    Car,
    Home,
    Gamepad2,
    Wallet,
} from "lucide-react";
import EditGoalModal from './overlays/EditGoalModal';
import { useDashboard } from '@/app/context/DashboardProvider';

interface Props {
    id: string,
    title: string,
    icon: string,
    targetAmount: number,
    currentAmount: number
}

interface GoalProps {
    id: string;
    title: string;
    icon: string;
    targetAmount: number;
    currentAmount: number;
}

const GoalCard = ({ id, title, icon, targetAmount, currentAmount }: Props) => {

    const goalIcons = {
        Target,
        Laptop,
        Plane,
        Car,
        House: Home,
        Gamepad2,
        Wallet,
    } as const;
    const Icon = goalIcons[icon as keyof typeof goalIcons] ?? Target;

    const progress = Number(((currentAmount / targetAmount) * 100).toFixed(2))

    const [toggled, setToggled] = useState(false)
    // edit modal
    const [editOpen, setEditOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [goalError, setGoalError] = useState("");

    // handle saving and deleting
    const { refreshDashboard } = useDashboard();

    const handleSave = async (goal: {
        id: string;
        title: string;
        icon: string;
        targetAmount: number;
    }) => {
        try {
            setLoading(true);

            const res = await fetch(`/api/goals/${goal.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: goal.title,
                    icon: goal.icon,
                    targetAmount: goal.targetAmount,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            await refreshDashboard();

            setEditOpen(false);
        } catch (err) {
            if (err instanceof Error) {
                setGoalError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            setLoading(true);

            const res = await fetch(`/api/goals/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                console.error(data.message)
                throw new Error(data.message);
            }

            await refreshDashboard();

            setEditOpen(false);
        } catch (err) {
            if (err instanceof Error) {
                setGoalError(err.message);
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className={`w-full relative py-5 ${toggled ? "bg-stone-800 text-stone-100" : "bg-stone-100 border-stone-200 border text-stone-800"} shrink-0 rounded-xl px-5 main-font transition-all duration-300`} onClick={(() => { setToggled(!toggled) })}>

                <div className='h-full w-full flex items-center justify-around gap-4 '>

                    <div className='w-[40%] text-xl font-medium truncate select-none flex items-center gap-2'>
                        <Icon size={20} className="shrink-0" /> {title}
                    </div>

                    {/* Progress Section */}
                    <div className="flex-1 flex items-center justify-end gap-2">

                        {/* Progress Bar */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ${toggled ? "w-0 opacity-0" : "flex-1 max-w-28 opacity-100"}`}>
                            <div className="h-3 bg-stone-300 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${progress >= 100 ? "bg-green-500" : "bg-blue-500"} rounded-full transition-all duration-500`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Percentage */}
                        {!toggled && <div className="text-sm shrink-0 transition-all duration-300">
                            {progress}%
                        </div>}
                    </div>
                </div>
                <div className={`overflow-hidden transition-all duration-500 ${toggled ? "max-h-70 mt-4" : "max-h-0"}`}>
                    <div className='h-60 flex items-center justify-center'>
                        <SemiGauge progress={progress} value={currentAmount} max={targetAmount} />
                    </div>
                </div>

                {toggled &&
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setEditOpen(true);
                            }}
                            className="rounded-xl border border-stone-600/30 bg-stone-700/70 p-2 text-stone-200 backdrop-blur transition hover:bg-stone-600"
                        >
                            <Edit3Icon size={18} />
                        </button>
                    </div>
                }
            </div>
            <EditGoalModal
                open={editOpen}
                loading={loading}
                onClose={() => setEditOpen(false)}
                onSave={handleSave}
                onDelete={handleDelete}
                goalError={goalError}
                setGoalError={setGoalError}
                goal={{
                    id,
                    title,
                    icon,
                    targetAmount,
                }}
            />
        </div>
    )
}

export default GoalCard
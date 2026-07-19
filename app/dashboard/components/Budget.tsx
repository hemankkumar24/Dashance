import React, { useState } from 'react'
import { CircleDollarSign } from 'lucide-react'
import BudgetBar from './BudgetBar'
import { useDashboard } from '@/app/context/DashboardProvider';
import ModifyBudgetModal from './overlays/ModifyBudgetModal';
const Budget = () => {

  // loading data
  const { user, getSpent, selectedMonth, refreshDashboard } = useDashboard();

  const spentThisMonth = getSpent(
    selectedMonth.month,
    selectedMonth.year
  );

  const netSpentFromBudget = user?.monthlyBudget ? user.monthlyBudget - spentThisMonth : 0;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (budget: number) => {
    setLoading(true);
    try {
      await fetch("/api/budget", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(budget),
      });

      setOpen(false);
      refreshDashboard();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='h-full w-full min-h-0'>
      <div className='px-4 pt-3 pb-2 h-full w-full min-h-0 flex flex-col'>
        <div className='flex items-center gap-2 text-lg md:text-xl shrink-0'>
          <div className='p-2 bg-stone-100 shadow-xs text-blue-600 rounded-full'>
            <CircleDollarSign size={20} />
          </div>
          <div className='text-md'>Budget</div>
        </div>
        <div className='flex-1 min-h-0 flex flex-col'>
          <div className='flex-1 min-h-0 flex flex-col justify-center '>
            <div className='w-full'>
              <BudgetBar spent={spentThisMonth} total={user?.monthlyBudget} />
            </div>
            <div className='flex flex-wrap pb-4 gap-1 text-sm md:text-lg leading-tight py-2'>
              {
                netSpentFromBudget >= 0 ? (
                  <>
                    <div className='text-stone-600'>
                      Great job!, You have
                    </div>
                    <div className='text-green-500'>
                      ₹{netSpentFromBudget} left
                    </div>
                  </>
                ) : (
                  <>
                    <div className='text-stone-600'>
                      You are
                    </div>
                    <div className='text-red-500'>
                      ₹{netSpentFromBudget * -1}
                    </div>
                    <div className='text-stone-600'>
                      over budget
                    </div>
                  </>
                )
              }

            </div>
          </div>

          <div className='mt-auto pt-2 shrink-0'>
            <button className='w-full py-3 px-3 flex items-center justify-center text-center rounded-lg bg-blue-600 cursor-pointer hover:bg-blue-500 text-stone-50 text-sm lg:text-lg leading-none' onClick={() => {setOpen(true)}}>
              Modify budget
            </button>
          </div>
        </div>
      </div>
      {user && (
        <ModifyBudgetModal
          open={open}
          currentBudget={user.monthlyBudget}
          loading={loading}
          onClose={() => setOpen(false)}
          onSave={(budget) => handleSave(budget)}
        />
      )}
    </div>
  )
}

export default Budget
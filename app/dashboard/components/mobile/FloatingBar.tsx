import {
  NotebookText,
  HomeIcon,
  Plus,
  Target,
  Wallet,
  LucideIcon,
  ArrowUpRight,
  ArrowDownLeft,
  X,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AddExpenseModal from "../overlays/AddExpenseModal";
import AddIncomeModal from "../overlays/AddIncomeModal";

interface Props {
  home: boolean;
  wallet: boolean;
  goals: boolean;
  transactions: boolean;
  setHome: Dispatch<SetStateAction<boolean>>;
  setWallet: Dispatch<SetStateAction<boolean>>;
  setGoals: Dispatch<SetStateAction<boolean>>;
  setTransactions: Dispatch<SetStateAction<boolean>>;
}

interface NavItemProps {
  active: boolean;
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
}

const NavItem = ({
  active,
  label,
  Icon,
  onClick,
}: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className="relative flex h-14 w-16 flex-col items-center justify-center rounded-3xl"
    >
      <AnimatePresence>
        {active && (
          <motion.div
            layoutId="floating-pill"
            className="absolute inset-0 rounded-2xl bg-stone-900"
            transition={{
              type: "spring",
              stiffness: 900,
              damping: 45,
              mass: 0.45,
            }}
          />
        )}
      </AnimatePresence>

      <Icon
        size={24}
        strokeWidth={1.6}
        className={`relative z-10 transition-colors duration-300 ${active
          ? "text-white"
          : "text-zinc-500 dark:text-zinc-400"
          }`}
      />

      <span
        className={`relative z-10 mt-1 text-[10px] font-medium transition-colors duration-300 ${active
          ? "text-white"
          : "text-zinc-500 dark:text-zinc-400"
          }`}
      >
        {label}
      </span>
    </button>
  );
};

const FloatingBar = ({
  home,
  wallet,
  goals,
  transactions,
  setHome,
  setWallet,
  setGoals,
  setTransactions,
}: Props) => {

  const [showPicker, setShowPicker] = useState(false);
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 left-1/2 z-50 w-full max-w-[420px] -translate-x-1/2 px-6">
        <div className="rounded-[2.5rem] border border-white/50 bg-white/40 p-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.3)] backdrop-blur-[48px] dark:border-white/10 dark:bg-black/40">
          <div className="flex items-center justify-between px-2">
            <NavItem
              active={home}
              label="Home"
              Icon={HomeIcon}
              onClick={() => {
                setHome(true);
                setWallet(false);
                setGoals(false);
                setTransactions(false);
              }}
            />

            <NavItem
              active={wallet}
              label="Wallet"
              Icon={Wallet}
              onClick={() => {
                setHome(false);
                setWallet(true);
                setGoals(false);
                setTransactions(false);
              }}
            />

            <button
              onClick={() => setShowPicker(true)}
              className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
            >
              <Plus size={28} />
            </button>

            <NavItem
              active={goals}
              label="Goals"
              Icon={Target}
              onClick={() => {
                setHome(false);
                setWallet(false);
                setGoals(true);
                setTransactions(false);
              }}
            />

            <NavItem
              active={transactions}
              label="Transactions"
              Icon={NotebookText}
              onClick={() => {
                setHome(false);
                setWallet(false);
                setGoals(false);
                setTransactions(true);
              }}
            />
          </div>
        </div>
      </div>
      {showPicker && (
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          onClick={() => setShowPicker(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
                absolute bottom-0 left-0 right-0
                rounded-t-3xl bg-white shadow-2xl
                animate-in slide-in-from-bottom duration-200
                md:top-1/2
                md:left-1/2
                md:bottom-auto
                md:right-auto
                md:w-full
                md:max-w-sm
                md:-translate-x-1/2
                md:-translate-y-1/2
                md:rounded-3xl
            "
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 md:hidden">
              <div className="h-1.5 w-12 rounded-full bg-stone-300" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-stone-100 p-2 text-blue-600">
                  <Plus size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    Add Transaction
                  </h2>

                  <p className="text-sm text-stone-500">
                    Choose what you'd like to add.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowPicker(false)}
                className="rounded-full p-2 transition hover:bg-stone-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-3 p-6">

              <button
                onClick={() => {
                  setShowPicker(false);
                  setIncomeOpen(true);
                }}
                className="flex w-full items-center gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 transition hover:border-green-200 hover:bg-green-50 active:scale-[0.98]"
              >
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  <ArrowDownLeft size={22} />
                </div>

                <div className="text-left">
                  <div className="font-semibold">
                    Income
                  </div>

                  <div className="text-sm text-stone-500">
                    Record money you've received.
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowPicker(false);
                  setExpenseOpen(true);
                }}
                className="flex w-full items-center gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 transition hover:border-red-200 hover:bg-red-50 active:scale-[0.98]"
              >
                <div className="rounded-full bg-red-100 p-3 text-red-600">
                  <ArrowUpRight size={22} />
                </div>

                <div className="text-left">
                  <div className="font-semibold">
                    Expense
                  </div>

                  <div className="text-sm text-stone-500">
                    Record money you've spent.
                  </div>
                </div>
              </button>

            </div>
          </div>
        </div>
      )}
      <AddIncomeModal
        open={incomeOpen}
        onClose={() => setIncomeOpen(false)}
      />

      <AddExpenseModal
        open={expenseOpen}
        onClose={() => setExpenseOpen(false)}
      />
    </>
  );
};

export default FloatingBar;
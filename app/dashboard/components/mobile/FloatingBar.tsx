import {
  NotebookText,
  HomeIcon,
  Plus,
  Target,
  Wallet,
  LucideIcon,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
      className="relative flex h-14 w-14 flex-col items-center justify-center rounded-3xl"
    >
      <AnimatePresence>
        {active && (
          <motion.div
            layoutId="floating-pill"
            className="absolute inset-0 rounded-3xl bg-stone-900"
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
        className={`relative z-10 transition-colors duration-300 ${
          active
            ? "text-white"
            : "text-zinc-500 dark:text-zinc-400"
        }`}
      />

      <span
        className={`relative z-10 mt-1 text-[10px] font-medium transition-colors duration-300 ${
          active
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
  return (
    <div className="fixed bottom-8 left-1/2 z-50 w-full max-w-[420px] -translate-x-1/2 px-6">
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

          <button className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-105 active:scale-95 dark:bg-white dark:text-black dark:shadow-[0_8px_24px_rgba(255,255,255,0.25)]">
            <Plus size={28} strokeWidth={2} />
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
  );
};

export default FloatingBar;
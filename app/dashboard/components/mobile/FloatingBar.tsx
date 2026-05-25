import { ChartArea, HomeIcon, Plus, Target, Wallet } from 'lucide-react'

const FloatingBar = () => {

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[420px] px-6 z-50">
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-[48px] border border-white/50 dark:border-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-2">
                <div className="flex h-full w-full px-2 justify-between items-center">
                    
                    <div className="flex flex-col items-center gap-1 cursor-pointer group w-14">
                        <HomeIcon size={24} strokeWidth={1.5} className="text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white group-active:scale-95 transition-all duration-300" />
                        <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">Home</span>
                    </div>

                    <div className="flex flex-col items-center gap-1 cursor-pointer group w-14">
                        <Wallet size={24} strokeWidth={1.5} className="text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white group-active:scale-95 transition-all duration-300" />
                        <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">Wallet</span>
                    </div>

                    <div className="relative flex flex-col items-center justify-center rounded-full cursor-pointer w-16 h-16 bg-black dark:bg-white text-white dark:text-black shadow-[0_8px_24px_rgba(0,0,0,0.25)] dark:shadow-[0_8px_24px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 transition-all duration-300">
                        <Plus size={28} strokeWidth={2} />
                    </div>

                    <div className="flex flex-col items-center gap-1 cursor-pointer group w-14">
                        <Target size={24} strokeWidth={1.5} className="text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white group-active:scale-95 transition-all duration-300" />
                        <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">Goals</span>
                    </div>

                    <div className="flex flex-col items-center gap-1 cursor-pointer group w-14">
                        <ChartArea size={24} strokeWidth={1.5} className="text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white group-active:scale-95 transition-all duration-300" />
                        <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">Analytics</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FloatingBar
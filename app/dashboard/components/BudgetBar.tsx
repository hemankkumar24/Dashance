interface Props {
  spent: number;
  total: number;
}

const BudgetBar = ({ spent, total }: Props) => {
  const percentage = Math.min((spent / total) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex items-end justify-between">
        <div className="pt-2">
          <p className="text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 relative top-1">
            ${spent}
          </p>
          <p className="text-sm text-stone-500 relative pt-0.5">
            of ${total} spent
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
            January
          </p>

          <p
            className={`mt-1 text-2xl ${
              percentage > 80
                ? "text-red-500"
                : "text-blue-600"
            }`}
          >
            {Math.round(percentage)}%
          </p>
        </div>
      </div>

      <div className="mt-3 h-2 rounded-full bg-stone-200 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            percentage > 80
              ? "bg-gradient-to-r from-orange-400 to-red-500"
              : "bg-gradient-to-r from-sky-400 via-blue-500 to-blue-600"
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default BudgetBar;
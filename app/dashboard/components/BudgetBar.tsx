interface Props {
    spent: number,
    total: number
} 

const BudgetBar = ({ spent, total }: Props) => {
  const percentage = Math.min((spent / total) * 100, 100);

  return (
    <div className="w-full">
      <div className="font-semibold leading-tight text-4xl">
        ${spent} <span className="inline text-gray-500 text-xl">of ${total} spent</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full mt-1 overflow-hidden">
        <div
          className={`h-full ${ percentage > 80 ? "bg-red-500" : "bg-green-500"} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetBar;
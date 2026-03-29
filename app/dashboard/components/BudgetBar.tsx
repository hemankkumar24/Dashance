interface Props {
    spent: number,
    total: number
} 

const BudgetBar = ({ spent, total }: Props) => {
  const percentage = Math.min((spent / total) * 100, 100);

  return (
    <div className="w-full max-w-md">
      <div className="text-5xl font-semibold">
        ${spent} <span className="text-gray-500 text-lg">of ${total} spent</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
        <div
          className={`h-full ${ percentage > 80 ? "bg-red-500" : "bg-green-500"} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetBar;
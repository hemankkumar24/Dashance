
interface Props {
    progress: number,
    value: number,
    max: number
}

const SemiGauge = ({ progress = 30, value , max }: Props) => {
  const radius = 70
  const stroke = 12
  const normalizedRadius = radius - stroke / 2
  const circumference = Math.PI * normalizedRadius // half circle

  const offset = circumference - (progress / 100) * circumference


  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-64 h-40">

        <svg
          viewBox="0 0 200 120"
          className="w-full h-full"
        >
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="transparent"
            stroke="#e5e5e5"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Progress arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="transparent"
            stroke="#2563eb"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-4">
          <div className="text-sm text-stone-400">Target</div>
          <div className="text-3xl font-semibold text-white">${value}</div>
          <div className="text-xs text-stone-400">/ ${max}</div>
        </div>

      </div>
    </div>
  )
}
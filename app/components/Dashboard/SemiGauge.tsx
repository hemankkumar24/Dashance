
interface Props {
    progress: number,
    value: number,
    max: number
}

export const SemiGauge = ({ progress, value, max }: Props) => {
  const stroke = 12
  const width = 200
  const radius = width / 2 - stroke / 2
  const height = radius + stroke
  const circumference = Math.PI * radius
  const clampedProgress = Math.min(100, Math.max(0, progress))
  const offset = circumference * (1 - clampedProgress / 100)

  const cx = width / 2
  const cy = height - stroke / 2
  const startX = cx - radius
  const endX = cx + radius
  const arcPath = `M ${startX} ${cy} A ${radius} ${radius} 0 0 1 ${endX} ${cy}`


  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-full max-w-xs aspect-2/1">

        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
        >
          {/* Background arc */}
          <path
            d={arcPath}
            fill="transparent"
            stroke="#e5e5e5"
            strokeWidth={stroke}
            strokeLinecap="round"
          />

          {/* Progress arc */}
          <path
            d={arcPath}
            fill="transparent"
            stroke="#2563eb"
            strokeWidth="13"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 top-10 flex flex-col items-center justify-center">
          <div className="text-lg text-stone-400">Target</div>
          <div className="text-5xl font-semibold text-white">${value}</div>
          <div className="text-lg text-stone-400">/ ${max}</div>
        </div>

      </div>
    </div>
  )
}
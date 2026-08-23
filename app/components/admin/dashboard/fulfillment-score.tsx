export function FulfillmentScore({
  delivered,
  total,
}: {
  delivered: number;
  total: number;
}) {
  const score = total === 0 ? 0 : Math.round((delivered / total) * 1000);
  const label =
    score >= 750 ? "High" : score >= 400 ? "Medium" : total === 0 ? "Idle" : "Low";
  const color =
    score >= 750 ? "#34D399" : score >= 400 ? "#FBBF24" : "#F472B6";

  const radius = 70;
  const circumference = Math.PI * radius;
  const progress = (score / 1000) * circumference;

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[#161616] p-4 sm:p-5">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-medium text-white">Fulfillment Score</h2>
        <span className="rounded-lg border border-white/10 px-2 py-1 text-[11px] text-zinc-400">
          Delivered ratio
        </span>
      </div>
      <div className="flex flex-col items-center py-2">
        <svg width="200" height="120" viewBox="0 0 200 120">
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="#1F1F2C"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke={color}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${progress} ${circumference}`}
          />
          <text
            x="100"
            y="88"
            textAnchor="middle"
            className="fill-white text-3xl font-semibold"
          >
            {score}
          </text>
          <text
            x="100"
            y="108"
            textAnchor="middle"
            className="fill-zinc-500 text-[11px]"
          >
            / 1000
          </text>
        </svg>
        <p className="mt-1 text-sm font-medium" style={{ color }}>
          {label}
        </p>
      </div>
    </section>
  );
}
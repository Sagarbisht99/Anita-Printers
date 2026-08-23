export function OrdersTrendChart({
  points,
}: {
  points: { label: string; value: number }[];
}) {
  const max = Math.max(...points.map((p) => p.value), 1);
  const width = 640;
  const height = 220;
  const padX = 24;
  const padY = 24;
  const step = points.length > 1 ? (width - padX * 2) / (points.length - 1) : 0;

  const coords = points.map((point, index) => {
    const x = padX + index * step;
    const y = height - padY - (point.value / max) * (height - padY * 2);
    return { x, y, ...point };
  });

  const line = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`)
    .join(" ");
  const area = `${line} L ${coords.at(-1)?.x ?? padX} ${height - padY} L ${padX} ${height - padY} Z`;

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[#161616] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-white">Orders Summary</h2>
        <span className="rounded-lg border border-white/10 px-2 py-1 text-[11px] text-zinc-400">
          Last 6 months
        </span>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full min-w-[480px]">
          <defs>
            <linearGradient id="ordersFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#ordersFill)" />
          <path d={line} fill="none" stroke="#60A5FA" strokeWidth="3" />
          {coords.map((c) => (
            <g key={c.label}>
              <circle cx={c.x} cy={c.y} r="4" fill="#93C5FD" />
              <text
                x={c.x}
                y={height - 6}
                textAnchor="middle"
                className="fill-zinc-500 text-[10px]"
              >
                {c.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}

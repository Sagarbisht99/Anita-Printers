export function CategoryDonut({
  items,
}: {
  items: { name: string; value: number; color: string }[];
}) {
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  const radius = 54;
  const stroke = 16;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[#161616] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-white">Products by Category</h2>
        <span className="rounded-lg border border-white/10 px-2 py-1 text-[11px] text-zinc-400">
          Catalog
        </span>
      </div>
      <div className="flex flex-col items-center gap-5 sm:flex-row">
        <div className="relative">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#1F1F2C"
              strokeWidth={stroke}
            />
            {items.map((item) => {
              const length = (item.value / total) * circumference;
              const circle = (
                <circle
                  key={item.name}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={stroke}
                  strokeDasharray={`${length} ${circumference - length}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                />
              );
              offset += length;
              return circle;
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xl font-semibold text-white">{total}</p>
            <p className="text-[11px] text-zinc-500">Products</p>
          </div>
        </div>
        <ul className="w-full space-y-2">
          {items.length === 0 ? (
            <li className="text-sm text-zinc-500">No category data yet</li>
          ) : (
            items.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2 text-zinc-300">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </span>
                <span className="text-zinc-500">{item.value}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}

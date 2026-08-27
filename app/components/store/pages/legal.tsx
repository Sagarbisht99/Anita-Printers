import Link from "next/link";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-medium tracking-[0.16em] text-store-muted uppercase">
        Legal
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-store-navy sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-sm text-store-muted">Last updated: {updated}</p>
      <div className="mt-10 space-y-8 text-[15px] leading-7 text-store-ink [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-store-navy [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
      <div className="mt-12 border-t border-store-line pt-6">
        <Link
          href="/"
          className="inline-flex rounded-full border border-store-navy/20 bg-store-paper px-4 py-2 text-sm font-medium text-store-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-store-navy hover:bg-store-navy hover:text-white"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}

import Link from "next/link";

export function Pagination({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  const baseClass =
    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors";

  return (
    <nav className="mt-10 flex items-center justify-center gap-3">
      {prevDisabled ? (
        <span className={`${baseClass} border-border text-foreground/30`}>
          Previous
        </span>
      ) : (
        <Link
          href={buildHref(page - 1)}
          className={`${baseClass} border-border hover:border-accent hover:text-accent`}
        >
          Previous
        </Link>
      )}
      <span className="text-sm text-foreground/55">
        Page {page} of {totalPages}
      </span>
      {nextDisabled ? (
        <span className={`${baseClass} border-border text-foreground/30`}>
          Next
        </span>
      ) : (
        <Link
          href={buildHref(page + 1)}
          className={`${baseClass} border-border hover:border-accent hover:text-accent`}
        >
          Next
        </Link>
      )}
    </nav>
  );
}

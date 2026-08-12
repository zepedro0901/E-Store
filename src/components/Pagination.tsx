import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/i18n/interpolate";

export async function Pagination({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const { dict } = await getDictionary();
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  const baseClass =
    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors";

  return (
    <nav className="mt-10 flex items-center justify-center gap-3">
      {prevDisabled ? (
        <span className={`${baseClass} border-border text-foreground/30`}>
          {dict.common.previous}
        </span>
      ) : (
        <Link
          href={buildHref(page - 1)}
          className={`${baseClass} border-border hover:border-accent hover:text-accent`}
        >
          {dict.common.previous}
        </Link>
      )}
      <span className="text-sm text-foreground/55">
        {interpolate(dict.pagination.pageOf, { page, totalPages })}
      </span>
      {nextDisabled ? (
        <span className={`${baseClass} border-border text-foreground/30`}>
          {dict.common.next}
        </span>
      ) : (
        <Link
          href={buildHref(page + 1)}
          className={`${baseClass} border-border hover:border-accent hover:text-accent`}
        >
          {dict.common.next}
        </Link>
      )}
    </nav>
  );
}

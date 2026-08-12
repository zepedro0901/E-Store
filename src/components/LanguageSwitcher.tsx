"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocale } from "@/i18n/actions";
import { useTranslations } from "@/i18n/use-translations";
import type { Locale } from "@/i18n/locales";

const OPTIONS: { locale: Locale; label: string }[] = [
  { locale: "pt", label: "PT" },
  { locale: "en", label: "EN" },
];

export function LanguageSwitcher() {
  const { locale } = useTranslations();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSwitch(next: Locale) {
    if (next === locale || isPending) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
      {OPTIONS.map((option, i) => (
        <span key={option.locale} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-foreground/30">|</span>}
          <button
            type="button"
            onClick={() => handleSwitch(option.locale)}
            aria-current={option.locale === locale}
            className={
              option.locale === locale
                ? "text-accent"
                : "text-foreground/50 transition-colors hover:text-accent"
            }
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}

"use client";

import { useLocaleContext } from "./LocaleProvider";

export function useTranslations() {
  return useLocaleContext();
}

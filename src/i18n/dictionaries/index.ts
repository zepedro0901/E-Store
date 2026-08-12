import en from "./en";
import pt from "./pt";
import type { Locale } from "../locales";

export type { Dictionary } from "./en";

export const dictionaries: Record<Locale, typeof en> = { en, pt };

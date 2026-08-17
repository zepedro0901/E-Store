import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return { title: dict.contact.metaTitle };
}

export default async function ContactPage() {
  const { dict } = await getDictionary();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight">
        {dict.contact.title}
      </h1>
      <p className="mt-3 text-sm text-foreground/60">{dict.contact.subtitle}</p>

      <div className="mt-10 border-t border-border pt-8">
        <p className="text-sm leading-relaxed text-foreground/70">
          {dict.contact.intro}
        </p>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-accent/80">
          {dict.contact.emailLabel}
        </p>
        <a
          href="mailto:customerservice@pangolinresinworks.com"
          className="mt-2 inline-block font-display text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
        >
          customerservice@pangolinresinworks.com
        </a>
      </div>
    </div>
  );
}

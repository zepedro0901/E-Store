import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return { title: dict.faq.metaTitle };
}

export default async function FaqPage() {
  const { dict } = await getDictionary();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight">
        {dict.faq.title}
      </h1>
      <p className="mt-3 text-justify text-sm text-foreground/60">{dict.faq.subtitle}</p>

      <div className="mt-10 flex flex-col divide-y divide-border border-t border-border">
        {dict.faq.items.map((item) => (
          <div key={item.question} className="py-6">
            <h2 className="font-display text-lg font-semibold tracking-tight text-accent">
              {item.question}
            </h2>
            <p className="mt-3 whitespace-pre-line text-justify text-sm leading-relaxed text-foreground/70">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { PolicySections } from "@/components/PolicySections";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return { title: dict.terms.metaTitle };
}

export default async function TermsPage() {
  const { dict } = await getDictionary();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight">
        {dict.terms.title}
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-wide text-foreground/50">
        {dict.terms.updated}
      </p>

      <div className="mt-10">
        <PolicySections sections={dict.terms.sections} />
      </div>
    </div>
  );
}

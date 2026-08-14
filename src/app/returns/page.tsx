import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { PolicySections } from "@/components/PolicySections";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return { title: dict.returns.metaTitle };
}

export default async function ReturnsPage() {
  const { dict } = await getDictionary();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight">
        {dict.returns.title}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-foreground/70">
        {dict.returns.intro}
      </p>

      <div className="mt-10">
        <PolicySections sections={dict.returns.sections} />
      </div>
    </div>
  );
}

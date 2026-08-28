import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { PolicySections } from "@/components/PolicySections";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return pageMetadata({
    title: dict.privacy.metaTitle,
    description: dict.privacy.metaDescription,
    path: "/privacy",
  });
}

export default async function PrivacyPage() {
  const { dict } = await getDictionary();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        {dict.privacy.title}
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-wide text-foreground/50">
        {dict.privacy.updated}
      </p>

      <div className="mt-10">
        <PolicySections sections={dict.privacy.sections} />
      </div>
    </div>
  );
}

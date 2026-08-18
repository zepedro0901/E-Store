type PolicySection = {
  heading: string;
  paragraphs: string[];
};

export function PolicySections({ sections }: { sections: PolicySection[] }) {
  return (
    <div className="flex flex-col gap-10">
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight text-accent">
            {section.heading}
          </h2>
          <div className="mt-3 flex flex-col gap-3">
            {section.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-justify text-sm leading-relaxed text-foreground/70 break-words"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

import { ReactNode } from "react";

export const PageHeader = ({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) => (
  <div className="border-b border-border bg-muted/30">
    <div className="container mx-auto px-4 py-10 md:py-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div className="max-w-3xl">
        {eyebrow && (
          <div className="text-xs font-mono uppercase tracking-widest text-emergency mb-3">
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{title}</h1>
        {description && (
          <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  </div>
);
import * as Icons from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SAFETY_GUIDES } from "@/data/mock";

export default function Safety() {
  return (
    <div>
      <PageHeader eyebrow="Survival Guide" title="Flood survival, step by step" description="Bookmark this page. It's lightweight and works on slow connections." />
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAFETY_GUIDES.map(g => {
            const Icon = (Icons as any)[g.icon] ?? Icons.BookOpen;
            return (
              <article key={g.id} className="rounded-lg border border-border bg-card p-5 hover:shadow-elegant transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-md bg-emergency/10 text-emergency flex items-center justify-center"><Icon className="h-5 w-5" /></div>
                  <h2 className="font-semibold text-lg">{g.title}</h2>
                </div>
                <ul className="space-y-2 text-sm text-foreground">
                  {g.points.map((p, i) => (
                    <li key={i} className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emergency shrink-0" /><span className="text-muted-foreground">{p}</span></li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

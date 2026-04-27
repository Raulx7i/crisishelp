import { Phone } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { HELPLINES } from "@/data/mock";

const GROUPS = [
  { key: "primary", label: "Primary emergency" },
  { key: "police", label: "Police" },
  { key: "fire", label: "Fire & rescue" },
  { key: "medical", label: "Medical" },
  { key: "disaster", label: "Disaster management" },
  { key: "rescue", label: "Rescue forces" },
  { key: "support", label: "Support lines" },
  { key: "govt", label: "Government" },
  { key: "ngo", label: "NGOs" },
  { key: "volunteer", label: "Local volunteers" },
];

export default function Helplines() {
  return (
    <div>
      <PageHeader eyebrow="Verified Directory" title="Emergency helpline numbers" description="Tap any number to call. All numbers verified for India / Tamil Nadu." />
      <div className="container mx-auto px-4 py-10 space-y-10">
        {GROUPS.map(g => {
          const items = HELPLINES.filter(h => h.category === g.key);
          if (!items.length) return null;
          return (
            <section key={g.key}>
              <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-3">{g.label}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map(h => (
                  <a key={h.number} href={`tel:${h.number.replace(/\s|-/g, "")}`} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:border-emergency hover:shadow-emergency transition-all">
                    <div className="h-12 w-12 rounded-md bg-emergency text-emergency-foreground flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold truncate">{h.name}</div>
                      <div className="text-xs text-muted-foreground">{h.desc}</div>
                      <div className="font-mono font-bold text-emergency text-lg mt-0.5">{h.number}</div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

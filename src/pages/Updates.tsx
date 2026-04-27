import { CheckCircle2, Megaphone, Filter } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { UPDATES } from "@/data/mock";
import { cn } from "@/lib/utils";

const TYPES = [
  { v: "all", label: "All" },
  { v: "rescue", label: "Rescue" },
  { v: "road", label: "Roads" },
  { v: "shelter", label: "Shelters" },
  { v: "info", label: "Info" },
];

export default function Updates() {
  const [t, setT] = useState("all");
  const list = t === "all" ? UPDATES : UPDATES.filter(u => u.type === t);
  return (
    <div>
      <PageHeader eyebrow="Community Updates" title="Verified updates only" description="Real-time updates from district control, traffic police, NDRF and verified relief coordinators." />
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          {TYPES.map(x => (
            <button key={x.v} onClick={() => setT(x.v)} className={cn("px-3 py-1.5 rounded-full text-sm font-medium border transition-colors shrink-0", t === x.v ? "bg-foreground text-background border-foreground" : "bg-card border-border text-muted-foreground hover:bg-muted")}>{x.label}</button>
          ))}
        </div>

        <ul className="space-y-3">
          {list.map(u => (
            <li key={u.id} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-7 w-7 rounded-md bg-accent/15 text-accent flex items-center justify-center"><Megaphone className="h-4 w-4" /></span>
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{u.source}</span>
                <span className="text-xs text-muted-foreground">· {u.time}</span>
                {u.verified && <span className="ml-auto text-[10px] font-mono uppercase inline-flex items-center gap-1 text-safe"><CheckCircle2 className="h-3 w-3" /> verified</span>}
              </div>
              <h3 className="font-semibold text-base">{u.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{u.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

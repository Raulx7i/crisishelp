import { PageHeader } from "@/components/layout/PageHeader";
import { RESCUE_REQUESTS, ALERTS, SHELTERS } from "@/data/mock";
import { Activity, AlertTriangle, Building2, Users, Phone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const STAT = [
  { label: "Active rescue requests", value: 23, delta: "+5 last hr", icon: Activity, tone: "emergency" },
  { label: "Open shelter capacity", value: "1,240", delta: "8 shelters", icon: Building2, tone: "neutral" },
  { label: "Citizens at risk", value: "4,800", delta: "Adyar + Velachery", icon: Users, tone: "warning" },
  { label: "Severe alerts", value: 1, delta: "Adyar river", icon: AlertTriangle, tone: "emergency" },
];

const STATUS_TONE: Record<string, string> = {
  urgent: "bg-emergency/15 text-emergency",
  dispatched: "bg-warning/15 text-warning",
  received: "bg-accent/15 text-accent",
  completed: "bg-safe/15 text-safe",
};

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        eyebrow="Admin · District Control"
        title="Operations dashboard"
        description="Live rescue requests, shelter status, alerts and citizen reports."
        actions={<Button variant="outline"><Download className="h-4 w-4 mr-2" />Export report</Button>}
      />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT.map(s => (
            <div key={s.label} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">{s.label}</div>
                  <div className="text-3xl font-bold mt-2">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.delta}</div>
                </div>
                <div className={cn("h-10 w-10 rounded-md flex items-center justify-center", s.tone === "emergency" ? "bg-emergency/10 text-emergency" : s.tone === "warning" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground")}>
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="requests">
          <TabsList>
            <TabsTrigger value="requests">Rescue requests</TabsTrigger>
            <TabsTrigger value="shelters">Shelters</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="mt-4">
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-xs uppercase font-mono text-muted-foreground">
                    <tr>
                      {["ID", "Name", "Area", "People", "Medical", "Water", "Status", "Time", "Action"].map(h => <th key={h} className="text-left px-4 py-3 whitespace-nowrap">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {RESCUE_REQUESTS.map(r => (
                      <tr key={r.id} className="hover:bg-muted/30">
                        <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                        <td className="px-4 py-3 font-medium">{r.name}</td>
                        <td className="px-4 py-3">{r.area}</td>
                        <td className="px-4 py-3">{r.people}</td>
                        <td className="px-4 py-3">{r.medical ? <span className="text-emergency font-semibold">Yes</span> : "No"}</td>
                        <td className="px-4 py-3 capitalize">{r.water}</td>
                        <td className="px-4 py-3"><span className={cn("text-[10px] px-2 py-1 rounded-full font-mono uppercase", STATUS_TONE[r.status])}>{r.status}</span></td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{r.time}</td>
                        <td className="px-4 py-3"><a href={`tel:${r.phone}`} className="inline-flex items-center gap-1 text-accent text-xs font-medium"><Phone className="h-3 w-3" />Call</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shelters" className="mt-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {SHELTERS.filter(s => s.capacity).map(s => {
                const pct = s.capacity ? Math.round(((s.capacity - (s.available ?? 0)) / s.capacity) * 100) : 0;
                return (
                  <div key={s.id} className="rounded-lg border border-border bg-card p-4">
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.address}</div>
                    <div className="mt-3 flex items-baseline justify-between text-sm"><span>{s.available}/{s.capacity} open</span><span className="text-xs text-muted-foreground">{pct}% full</span></div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden"><div className={cn("h-full", pct > 90 ? "bg-emergency" : pct > 60 ? "bg-warning" : "bg-safe")} style={{ width: `${pct}%` }} /></div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="mt-4">
            <ul className="space-y-2">
              {ALERTS.map(a => (
                <li key={a.id} className="rounded-lg border border-border bg-card p-4 flex gap-3">
                  <span className={cn("mt-1.5 h-2.5 w-2.5 rounded-full shrink-0", a.level === "severe" ? "bg-emergency" : a.level === "warning" ? "bg-warning" : "bg-accent")} />
                  <div className="flex-1"><div className="flex justify-between"><span className="font-semibold">{a.area}</span><span className="text-xs text-muted-foreground">{a.time}</span></div><p className="text-sm text-muted-foreground">{a.message}</p></div>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

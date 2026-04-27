import { useMemo, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PageHeader } from "@/components/layout/PageHeader";
import { SHELTERS, Shelter } from "@/data/mock";
import { Phone, Building2, HeartPulse, Utensils, Battery, Sailboat, Shield, Tent } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPES: { v: Shelter["type"]; label: string; color: string; icon: any }[] = [
  { v: "shelter", label: "Shelters", color: "#0ea5e9", icon: Building2 },
  { v: "hospital", label: "Hospitals", color: "#dc2626", icon: HeartPulse },
  { v: "food", label: "Food camps", color: "#16a34a", icon: Utensils },
  { v: "charging", label: "Charging", color: "#f59e0b", icon: Battery },
  { v: "boat", label: "Rescue boats", color: "#0891b2", icon: Sailboat },
  { v: "police", label: "Police", color: "#475569", icon: Shield },
  { v: "govcamp", label: "Govt camps", color: "#7c3aed", icon: Tent },
];

const colorFor = (t: Shelter["type"]) => TYPES.find(x => x.v === t)?.color ?? "#475569";

const iconFor = (t: Shelter["type"]) => L.divIcon({
  className: "",
  html: `<div style="background:${colorFor(t)};width:22px;height:22px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
  iconSize: [22, 22], iconAnchor: [11, 11],
});

export default function Resources() {
  const [active, setActive] = useState<Set<Shelter["type"]>>(new Set(TYPES.map(t => t.v)));
  const visible = useMemo(() => SHELTERS.filter(s => active.has(s.type)), [active]);

  // Fix Leaflet tile rendering inside grid
  useEffect(() => { setTimeout(() => window.dispatchEvent(new Event("resize")), 100); }, []);

  const toggle = (t: Shelter["type"]) => {
    setActive(prev => { const n = new Set(prev); n.has(t) ? n.delete(t) : n.add(t); return n; });
  };

  return (
    <div>
      <PageHeader eyebrow="Resource Map" title="Find safe places near you" description="Shelters, hospitals, food camps, charging stations, rescue boats and government camps." />
      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-[280px_1fr] gap-6">
        <aside className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Filter by type</div>
          {TYPES.map(t => {
            const Icon = t.icon;
            const on = active.has(t.v);
            const count = SHELTERS.filter(s => s.type === t.v).length;
            return (
              <button key={t.v} onClick={() => toggle(t.v)} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-md border text-sm transition-colors", on ? "bg-card border-border" : "bg-muted/40 border-transparent text-muted-foreground")}>
                <span className="h-7 w-7 rounded-md flex items-center justify-center text-white" style={{ background: t.color }}><Icon className="h-4 w-4" /></span>
                <span className="flex-1 text-left font-medium">{t.label}</span>
                <span className="text-xs font-mono">{count}</span>
              </button>
            );
          })}
        </aside>

        <div className="rounded-lg border border-border overflow-hidden h-[600px]">
          <MapContainer center={[13.04, 80.24]} zoom={11} className="h-full w-full" scrollWheelZoom>
            <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {visible.map(s => (
              <Marker key={s.id} position={[s.lat, s.lng]} icon={iconFor(s.type)}>
                <Popup>
                  <div className="text-sm">
                    <div className="font-semibold text-foreground">{s.name}</div>
                    <div className="text-muted-foreground">{s.address}</div>
                    {s.capacity != null && (
                      <div className="mt-1 text-xs"><strong>{s.available}/{s.capacity}</strong> beds open</div>
                    )}
                    {s.phone && <a href={`tel:${s.phone}`} className="mt-1 inline-flex items-center gap-1 text-emergency font-semibold"><Phone className="h-3 w-3" />{s.phone}</a>}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

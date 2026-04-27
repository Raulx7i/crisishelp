import { Link } from "react-router-dom";
import {
  AlertTriangle, Phone, MapPin, LifeBuoy, HeartPulse, Utensils,
  HandHeart, UserSearch, BookOpen, Sparkles, Radio, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALERTS } from "@/data/mock";

const QUICK_ACTIONS = [
  { to: "/get-help", title: "Request Rescue", desc: "Submit SOS with live location", icon: LifeBuoy, tone: "emergency" as const },
  { to: "/resources", title: "Nearby Shelters", desc: "Map of safe places", icon: MapPin, tone: "neutral" as const },
  { to: "/helplines", title: "Emergency Numbers", desc: "Verified helpline directory", icon: Phone, tone: "neutral" as const },
  { to: "/helplines", title: "Medical Help", desc: "Hospitals & ambulance", icon: HeartPulse, tone: "neutral" as const },
  { to: "/resources", title: "Food & Water", desc: "Camps & supply centers", icon: Utensils, tone: "neutral" as const },
  { to: "/donate", title: "Donate Relief", desc: "Money, clothes, time", icon: HandHeart, tone: "neutral" as const },
  { to: "/missing", title: "Report Missing Person", desc: "Search & post", icon: UserSearch, tone: "neutral" as const },
  { to: "/safety", title: "Survival Tips", desc: "Quick offline-ready guide", icon: BookOpen, tone: "neutral" as const },
];

const TIPS = [
  "Move to highest safe floor immediately.",
  "Switch off mains electricity if water is rising.",
  "Drink only boiled or bottled water.",
  "Keep phone battery above 30% — text don't call.",
];

const Index = () => (
  <div>
    <section className="relative border-b border-border bg-gradient-to-b from-background to-muted/40">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emergency/10 text-emergency text-xs font-mono uppercase tracking-widest mb-5">
              <span className="status-dot status-dot-live" /> Active flood response · Chennai
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
              When every minute counts,<br />
              <span className="text-emergency">help is one tap away.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Rapid Crisis Response coordinates rescue, shelters, medical aid and verified
              updates during floods and disasters. Built for citizens, volunteers and
              government responders.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="destructive" className="h-14 text-base font-semibold pulse-emergency">
                <Link to="/get-help">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  I Need Help Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 text-base">
                <Link to="/assistant">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Ask Crisis AI
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <a href="tel:112" className="font-semibold text-foreground hover:text-emergency">📞 National 112</a>
              <a href="tel:108" className="font-semibold text-foreground hover:text-emergency">🚑 Ambulance 108</a>
              <a href="tel:1077" className="font-semibold text-foreground hover:text-emergency">🌊 Disaster 1077</a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
                <div className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-emergency" />
                  <span className="text-sm font-semibold">Live Flood Alerts</span>
                </div>
                <span className="text-[10px] font-mono uppercase text-muted-foreground">Updated 2 min ago</span>
              </div>
              <ul className="divide-y divide-border">
                {ALERTS.map(a => (
                  <li key={a.id} className="px-4 py-3 flex gap-3">
                    <span className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${
                      a.level === "severe" ? "bg-emergency" : a.level === "warning" ? "bg-warning" : "bg-accent"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-semibold text-foreground">{a.area}</span>
                        <span className="text-[11px] text-muted-foreground shrink-0">{a.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{a.message}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border px-4 py-3">
                <Link to="/updates" className="text-sm font-medium text-accent hover:underline inline-flex items-center gap-1">
                  All verified updates <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="container mx-auto px-4 py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Quick actions</h2>
          <p className="text-muted-foreground mt-1">Large buttons. Clear icons. Designed for stress.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {QUICK_ACTIONS.map(({ to, title, desc, icon: Icon, tone }, i) => (
          <Link
            key={i}
            to={to}
            className={`group rounded-lg border p-5 transition-all hover:shadow-elegant hover:-translate-y-0.5 ${
              tone === "emergency"
                ? "border-emergency/30 bg-emergency/5 hover:bg-emergency/10"
                : "border-border bg-card hover:bg-muted/40"
            }`}
          >
            <div className={`h-11 w-11 rounded-md flex items-center justify-center mb-3 ${
              tone === "emergency" ? "bg-emergency text-emergency-foreground" : "bg-muted text-foreground"
            }`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="text-base font-semibold text-foreground">{title}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{desc}</div>
          </Link>
        ))}
      </div>
    </section>

    <section className="border-y border-border bg-muted/40">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emergency mb-2">Survival basics</div>
            <h2 className="text-2xl font-bold mb-4">Remember these four things</h2>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {TIPS.map(t => (
                <li key={t} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emergency shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button asChild size="lg" variant="outline">
            <Link to="/safety">Open survival guide <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default Index;
import { useState } from "react";
import { HandHeart, Shirt, Utensils, Droplet, Users, IndianRupee } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const TYPES = [
  { id: "money", label: "Money", icon: IndianRupee, desc: "100% to relief operations" },
  { id: "food", label: "Food", icon: Utensils, desc: "Dry rations, ready meals" },
  { id: "clothes", label: "Clothes", icon: Shirt, desc: "Clean, dry, packed" },
  { id: "blood", label: "Blood", icon: Droplet, desc: "Register as donor" },
  { id: "volunteer", label: "Volunteer", icon: Users, desc: "Time on the ground" },
];

export default function Donate() {
  const [active, setActive] = useState("money");
  return (
    <div>
      <PageHeader eyebrow="Donation Center" title="Give what you can" description="Money, supplies, blood or your time — every contribution is coordinated through verified relief teams." />
      <div className="container mx-auto px-4 py-10 grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-2">
          {TYPES.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} className={`w-full flex items-center gap-3 p-3 rounded-md border text-left transition-colors ${active === t.id ? "bg-card border-emergency" : "bg-muted/40 border-transparent hover:bg-muted"}`}>
              <div className={`h-10 w-10 rounded-md flex items-center justify-center ${active === t.id ? "bg-emergency text-emergency-foreground" : "bg-background text-muted-foreground"}`}>
                <t.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-sm">{t.label}</div>
                <div className="text-xs text-muted-foreground">{t.desc}</div>
              </div>
            </button>
          ))}
        </aside>

        <form onSubmit={(e) => { e.preventDefault(); toast.success("Thank you — we'll be in touch within 24 hours."); }} className="rounded-lg border border-border bg-card p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-md bg-emergency/10 text-emergency flex items-center justify-center"><HandHeart className="h-6 w-6" /></div>
            <h2 className="text-2xl font-bold">{TYPES.find(t => t.id === active)?.label} contribution</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label htmlFor="d-name">Name</Label><Input id="d-name" required className="mt-1.5 h-11" /></div>
            <div><Label htmlFor="d-phone">Phone</Label><Input id="d-phone" type="tel" required className="mt-1.5 h-11" /></div>
            {active === "money" && (
              <div className="sm:col-span-2"><Label htmlFor="d-amount">Amount (₹)</Label><Input id="d-amount" type="number" min={100} defaultValue={500} className="mt-1.5 h-11" /></div>
            )}
            {active === "blood" && (
              <div className="sm:col-span-2"><Label htmlFor="d-blood">Blood group</Label><Input id="d-blood" placeholder="e.g. O+" className="mt-1.5 h-11" /></div>
            )}
            {active === "volunteer" && (
              <div className="sm:col-span-2"><Label htmlFor="d-skill">Skills / availability</Label><Input id="d-skill" placeholder="e.g. driving, first aid, weekends" className="mt-1.5 h-11" /></div>
            )}
            {(active === "food" || active === "clothes") && (
              <div className="sm:col-span-2"><Label htmlFor="d-qty">Quantity / details</Label><Input id="d-qty" placeholder="e.g. 20 kg rice, 50 t-shirts" className="mt-1.5 h-11" /></div>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full h-12">Submit contribution</Button>
          <p className="text-xs text-muted-foreground">All donations channelled via the District Disaster Management Authority and verified NGO partners.</p>
        </form>
      </div>
    </div>
  );
}

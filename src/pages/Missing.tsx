import { useState } from "react";
import { UserSearch, Upload, Phone } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MISSING_PERSONS } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Missing() {
  const [q, setQ] = useState("");
  const filtered = MISSING_PERSONS.filter(m => m.name.toLowerCase().includes(q.toLowerCase()) || m.lastSeen.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader eyebrow="Missing Persons Portal" title="Find. Reunite. Help families." description="Report a missing loved one or search the registry of reported persons." />
      <div className="container mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8">
        <form onSubmit={e => { e.preventDefault(); toast.success("Report submitted to district control room."); (e.target as HTMLFormElement).reset(); }} className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-md bg-emergency/10 text-emergency flex items-center justify-center"><UserSearch className="h-5 w-5" /></div>
            <h2 className="text-xl font-bold">Report a missing person</h2>
          </div>
          <div><Label htmlFor="m-name">Full name</Label><Input id="m-name" required className="mt-1.5 h-11" /></div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label htmlFor="m-age">Age</Label><Input id="m-age" type="number" min={0} max={120} required className="mt-1.5 h-11" /></div>
            <div><Label htmlFor="m-contact">Family contact</Label><Input id="m-contact" type="tel" required className="mt-1.5 h-11" /></div>
          </div>
          <div><Label htmlFor="m-seen">Last seen</Label><Input id="m-seen" placeholder="Place / time" required className="mt-1.5 h-11" /></div>
          <div>
            <Label htmlFor="m-photo">Photo</Label>
            <label htmlFor="m-photo" className="mt-1.5 flex items-center gap-3 border border-dashed border-border rounded-md p-3 cursor-pointer hover:bg-muted/40">
              <Upload className="h-5 w-5 text-muted-foreground" /><span className="text-sm text-muted-foreground">JPG/PNG/WEBP — max 5 MB</span>
            </label>
            <input id="m-photo" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" />
          </div>
          <Button type="submit" className="w-full h-12">Submit report</Button>
        </form>

        <div>
          <Label htmlFor="search">Search registry</Label>
          <Input id="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Name or last seen location" className="mt-1.5 h-11" />
          <ul className="mt-4 space-y-3">
            {filtered.map(m => (
              <li key={m.id} className="rounded-lg border border-border bg-card p-4 flex gap-4">
                <div className="h-14 w-14 rounded-md bg-muted text-muted-foreground flex items-center justify-center text-lg font-semibold shrink-0">{m.name.split(" ").map(s => s[0]).slice(0, 2).join("")}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold">{m.name}, {m.age}</div>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${m.status === "found" ? "bg-safe/15 text-safe" : "bg-emergency/15 text-emergency"}`}>{m.status}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{m.lastSeen} · {m.time}</div>
                  <a href={`tel:${m.contact}`} className="text-sm text-emergency font-mono inline-flex items-center gap-1 mt-1"><Phone className="h-3 w-3" />{m.contact}</a>
                </div>
              </li>
            ))}
            {!filtered.length && <li className="text-sm text-muted-foreground p-4">No matching records.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}

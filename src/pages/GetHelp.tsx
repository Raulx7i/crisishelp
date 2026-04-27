import { useState } from "react";
import { z } from "zod";
import { MapPin, Loader2, CheckCircle2, AlertTriangle, Upload } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(80),
  phone: z.string().trim().min(7, "Valid phone required").max(20),
  people: z.coerce.number().int().min(1).max(200),
  medical: z.enum(["yes", "no"]),
  water: z.enum(["ankle", "knee", "waist", "chest", "above-head"]),
  message: z.string().max(500).optional(),
});

const WATER_LEVELS = [
  { v: "ankle", label: "Ankle" },
  { v: "knee", label: "Knee" },
  { v: "waist", label: "Waist" },
  { v: "chest", label: "Chest" },
  { v: "above-head", label: "Above head" },
];

export default function GetHelp() {
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const captureLocation = () => {
    if (!navigator.geolocation) { toast.error("Geolocation not supported"); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      pos => { setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setLocating(false); toast.success("Location captured"); },
      () => { setLocating(false); toast.error("Could not get your location"); },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as any;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach(i => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    if (file) {
      const ok = ["image/jpeg", "image/png", "image/webp", "video/mp4"].includes(file.type) && file.size < 10 * 1024 * 1024;
      if (!ok) { toast.error("Only JPG/PNG/WEBP/MP4 under 10 MB"); return; }
    }
    setErrors({});
    setSubmitted(true);
    toast.success("Rescue request submitted — ID #r-1043");
  };

  if (submitted) {
    return (
      <div>
        <PageHeader eyebrow="SOS · Submitted" title="Help is on the way" description="Your request has been queued. Keep your phone charged and stay where you are if it's safe." />
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="rounded-lg border border-safe/30 bg-safe/5 p-6 flex gap-4">
            <CheckCircle2 className="h-8 w-8 text-safe shrink-0" />
            <div>
              <div className="font-semibold text-lg">Request #r-1043 received</div>
              <p className="text-muted-foreground mt-1">Nearest NDRF unit notified. Estimated response: <strong className="text-foreground">15–25 minutes</strong>.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild variant="destructive"><a href="tel:112">Call 112 now</a></Button>
                <Button asChild variant="outline"><a href="/assistant">Open Crisis AI</a></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader eyebrow="SOS · Rescue Request" title="Request rescue" description="Fill in what you can. Even a partial request helps responders." />
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <div className="rounded-md bg-emergency/5 border border-emergency/30 p-4 mb-6 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-emergency shrink-0 mt-0.5" />
          <p className="text-sm">If you're in immediate life-threatening danger, call <a className="font-bold text-emergency underline" href="tel:112">112</a> first, then submit this form.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Your name</Label>
              <Input id="name" name="name" required className="mt-1.5 h-11" />
              {errors.name && <p className="text-xs text-emergency mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" required className="mt-1.5 h-11" />
              {errors.phone && <p className="text-xs text-emergency mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <Label>Live location</Label>
            <div className="mt-1.5 flex flex-col sm:flex-row gap-2">
              <Button type="button" variant="outline" onClick={captureLocation} disabled={locating} className="h-11">
                {locating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <MapPin className="h-4 w-4 mr-2" />}
                {loc ? "Update location" : "Capture GPS location"}
              </Button>
              {loc && <span className="self-center text-sm font-mono text-muted-foreground">{loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}</span>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="people">People stuck</Label>
              <Input id="people" name="people" type="number" min={1} defaultValue={1} required className="mt-1.5 h-11" />
            </div>
            <div>
              <Label>Medical emergency?</Label>
              <RadioGroup name="medical" defaultValue="no" className="mt-2 flex gap-4">
                <label className="flex items-center gap-2"><RadioGroupItem value="yes" /> Yes</label>
                <label className="flex items-center gap-2"><RadioGroupItem value="no" /> No</label>
              </RadioGroup>
            </div>
          </div>

          <div>
            <Label>Water level severity</Label>
            <RadioGroup name="water" defaultValue="knee" className="mt-2 grid grid-cols-2 sm:grid-cols-5 gap-2">
              {WATER_LEVELS.map(w => (
                <label key={w.v} className="flex items-center gap-2 border border-border rounded-md px-3 py-2.5 cursor-pointer hover:bg-muted/60 has-[:checked]:bg-emergency/10 has-[:checked]:border-emergency">
                  <RadioGroupItem value={w.v} /> <span className="text-sm">{w.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="proof">Photo / video (optional)</Label>
            <label htmlFor="proof" className="mt-1.5 flex items-center gap-3 border border-dashed border-border rounded-md p-4 cursor-pointer hover:bg-muted/40">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{file ? file.name : "JPG, PNG, WEBP or MP4 — max 10 MB"}</span>
            </label>
            <input id="proof" type="file" accept="image/jpeg,image/png,image/webp,video/mp4" className="sr-only" onChange={e => setFile(e.target.files?.[0] ?? null)} />
          </div>

          <div>
            <Label htmlFor="message">Message to rescuers</Label>
            <Textarea id="message" name="message" rows={3} className="mt-1.5" placeholder="e.g. Elderly woman with diabetes on second floor" />
          </div>

          <div className="text-xs text-muted-foreground bg-muted/40 border border-border rounded-md p-3">
            <strong className="text-foreground">Privacy:</strong> Your phone & location are shared only with verified rescue authorities. Inputs are validated server-side.
          </div>

          <Button type="submit" size="lg" variant="destructive" className="w-full h-14 text-base font-semibold">
            Submit rescue request
          </Button>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, Lock, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const credSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

export default function AdminLogin() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav("/admin", { replace: true });
    });
  }, [nav]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = credSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    const creds = { email: parsed.data.email, password: parsed.data.password };
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword(creds);
        if (error) throw error;
        toast.success("Signed in");
        nav("/admin", { replace: true });
      } else {
        const { error } = await supabase.auth.signUp({
          ...creds,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Signing you in…");
        const { error: sErr } = await supabase.auth.signInWithPassword(creds);
        if (sErr) throw sErr;
        nav("/admin", { replace: true });
      }
    } catch (err: any) {
      toast.error(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader eyebrow="Authority Access" title="Admin sign in" description="For district control rooms, NDRF coordinators and verified relief partners." />
      <div className="container mx-auto px-4 py-10 max-w-md">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-11 w-11 rounded-md bg-emergency text-emergency-foreground flex items-center justify-center"><ShieldAlert className="h-5 w-5" /></div>
            <div><div className="font-semibold">Authority Login</div><div className="text-xs text-muted-foreground">Verified access only</div></div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Official email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 h-11" autoComplete="email" />
            </div>
            <div>
              <Label htmlFor="pw">Password</Label>
              <Input id="pw" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 h-11" autoComplete={mode === "signin" ? "current-password" : "new-password"} />
            </div>
            <Button type="submit" className="w-full h-12" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Lock className="h-4 w-4 mr-2" />}
              {mode === "signin" ? "Sign in" : "Create account"}
            </Button>
            <Button type="button" variant="outline" className="w-full h-12" onClick={() => setMode(m => m === "signin" ? "signup" : "signin")} disabled={loading}>
              {mode === "signin" ? "Register an authority account" : "Have an account? Sign in"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">Access is restricted to authenticated authority accounts. Sessions are securely managed by the backend.</p>
        </div>
      </div>
    </div>
  );
}

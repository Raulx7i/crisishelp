import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, Lock } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
  const nav = useNavigate();
  const [otp, setOtp] = useState(false);

  return (
    <div>
      <PageHeader eyebrow="Authority Access" title="Admin sign in" description="For district control rooms, NDRF coordinators and verified relief partners." />
      <div className="container mx-auto px-4 py-10 max-w-md">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-11 w-11 rounded-md bg-emergency text-emergency-foreground flex items-center justify-center"><ShieldAlert className="h-5 w-5" /></div>
            <div><div className="font-semibold">Authority Login</div><div className="text-xs text-muted-foreground">Role-based access</div></div>
          </div>

          <form onSubmit={e => { e.preventDefault(); nav("/admin"); }} className="space-y-4">
            <div><Label htmlFor="email">Official email</Label><Input id="email" type="email" required className="mt-1.5 h-11" /></div>
            {!otp ? (
              <div><Label htmlFor="pw">Password</Label><Input id="pw" type="password" required className="mt-1.5 h-11" /></div>
            ) : (
              <div><Label htmlFor="otp">6-digit OTP</Label><Input id="otp" inputMode="numeric" maxLength={6} required className="mt-1.5 h-11 font-mono tracking-widest" /></div>
            )}
            <Button type="submit" className="w-full h-12"><Lock className="h-4 w-4 mr-2" />Sign in</Button>
            <Button type="button" variant="outline" className="w-full h-12" onClick={() => setOtp(o => !o)}>{otp ? "Use password" : "Use OTP instead"}</Button>
            <Button type="button" variant="ghost" className="w-full h-12">Continue with Google</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">Demo: any input opens the dashboard. Production uses bcrypt + role-based access control.</p>
        </div>
      </div>
    </div>
  );
}

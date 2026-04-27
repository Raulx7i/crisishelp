import { Link, NavLink } from "react-router-dom";
import { Menu, ShieldAlert, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/get-help", label: "Get Help" },
  { to: "/assistant", label: "AI Assistant" },
  { to: "/resources", label: "Resources" },
  { to: "/safety", label: "Safety Guide" },
  { to: "/helplines", label: "Helplines" },
  { to: "/donate", label: "Donate" },
  { to: "/missing", label: "Missing" },
  { to: "/updates", label: "Updates" },
];

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Rapid Crisis Response home">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emergency text-emergency-foreground shadow-sm">
            <ShieldAlert className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight">Rapid Crisis Response</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <span className="status-dot status-dot-live" /> Live · Emergency Platform
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="destructive" className="hidden sm:inline-flex font-semibold">
            <Link to="/get-help">SOS</Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="hidden md:inline-flex">
            <Link to="/admin/login">Admin</Link>
          </Button>
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-3 grid grid-cols-2 gap-1" aria-label="Mobile">
            {NAV.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-3 text-sm font-medium rounded-md",
                    isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/60"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/admin" onClick={() => setOpen(false)} className="px-3 py-3 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted/60">
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
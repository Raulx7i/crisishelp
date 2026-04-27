import { ShieldAlert, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const SiteFooter = () => (
  <footer className="border-t border-border bg-muted/40 mt-16">
    <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-4 text-sm">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emergency text-emergency-foreground">
            <ShieldAlert className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <span className="font-bold">Rapid Crisis Response</span>
        </div>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          A community emergency response platform helping people survive floods and
          other disasters. Built for the Google Developer Group hackathon.
        </p>
        <div className="mt-4 flex items-center gap-2 text-emergency font-semibold">
          <Phone className="h-4 w-4" />
          <a href="tel:112" className="hover:underline">National Emergency: 112</a>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Get help</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li><Link to="/get-help" className="hover:text-foreground">Request rescue</Link></li>
          <li><Link to="/assistant" className="hover:text-foreground">Crisis AI Assistant</Link></li>
          <li><Link to="/safety" className="hover:text-foreground">Survival guide</Link></li>
          <li><Link to="/missing" className="hover:text-foreground">Report missing person</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Coordinate</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li><Link to="/resources" className="hover:text-foreground">Resource map</Link></li>
          <li><Link to="/donate" className="hover:text-foreground">Donate / Volunteer</Link></li>
          <li><Link to="/updates" className="hover:text-foreground">Verified updates</Link></li>
          <li><Link to="/admin" className="hover:text-foreground">Admin dashboard</Link></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="container mx-auto px-4 py-4 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} Rapid Crisis Response — Prototype</span>
        <span>For real emergencies always call your local services first.</span>
      </div>
    </div>
  </footer>
);
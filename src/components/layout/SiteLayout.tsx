import { Outlet } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { AssistantFab } from "@/components/assistant/AssistantFab";

export const SiteLayout = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SiteHeader />
    <main id="main" className="flex-1">
      <Outlet />
    </main>
    <SiteFooter />
    <AssistantFab />
  </div>
);
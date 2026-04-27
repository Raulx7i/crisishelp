import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { SiteLayout } from "@/components/layout/SiteLayout";
import GetHelp from "./pages/GetHelp.tsx";
import Assistant from "./pages/Assistant.tsx";
import Resources from "./pages/Resources.tsx";
import Safety from "./pages/Safety.tsx";
import Helplines from "./pages/Helplines.tsx";
import Donate from "./pages/Donate.tsx";
import Missing from "./pages/Missing.tsx";
import Updates from "./pages/Updates.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/get-help" element={<GetHelp />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/helplines" element={<Helplines />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/missing" element={<Missing />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

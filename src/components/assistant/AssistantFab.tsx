import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { ChatPanel } from "./ChatPanel";
import { cn } from "@/lib/utils";

export const AssistantFab = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close Crisis AI Assistant" : "Open Crisis AI Assistant"}
        className={cn(
          "fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full shadow-emergency",
          "flex items-center justify-center text-white transition-transform",
          "hover:scale-105 active:scale-95",
          open ? "bg-primary" : "bg-emergency pulse-emergency"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[min(420px,calc(100vw-2.5rem))]">
          <div className="shadow-elegant rounded-lg overflow-hidden">
            <ChatPanel compact />
          </div>
        </div>
      )}
    </>
  );
};

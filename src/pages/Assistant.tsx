import { PageHeader } from "@/components/layout/PageHeader";
import { ChatPanel } from "@/components/assistant/ChatPanel";

export default function Assistant() {
  return (
    <div>
      <PageHeader eyebrow="AI · Crisis Assistant" title="Crisis AI Assistant" description="Powered by Google Gemini. Ask anything about flood survival, first aid, evacuation or coordination — in English or Tamil." />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <ChatPanel />
      </div>
    </div>
  );
}

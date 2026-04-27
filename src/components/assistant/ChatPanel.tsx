import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Send, Sparkles, RotateCcw, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useStreamChat } from "./useStreamChat";
import { cn } from "@/lib/utils";

const QUICK_PROMPTS = [
  "I'm stuck in flood water — what do I do?",
  "How do I purify drinking water?",
  "First aid for someone who nearly drowned",
  "Evacuating with elderly parents — checklist",
  "தண்ணீர் ஏறுகிறது — என்ன செய்வது?",
];

export const ChatPanel = ({ compact = false }: { compact?: boolean }) => {
  const { messages, isStreaming, error, send, reset } = useStreamChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    send(text);
    setInput("");
  };

  const onMic = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Voice input is not supported on this browser."); return; }
    const recog = new SR();
    recog.lang = "en-IN";
    recog.interimResults = false;
    setListening(true);
    recog.onresult = (ev: any) => {
      const t = ev.results?.[0]?.[0]?.transcript ?? "";
      setInput(prev => (prev ? prev + " " : "") + t);
    };
    recog.onend = () => setListening(false);
    recog.onerror = () => setListening(false);
    recog.start();
  };

  return (
    <div className={cn("flex flex-col bg-card border border-border rounded-lg overflow-hidden", compact ? "h-[560px]" : "h-[calc(100vh-220px)] min-h-[520px]")}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-accent text-accent-foreground flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold">Crisis AI Assistant</div>
            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <span className="status-dot status-dot-live" /> Powered by Gemini · EN / தமிழ்
            </div>
          </div>
        </div>
        {messages.length > 0 && (
          <Button size="sm" variant="ghost" onClick={reset} className="text-xs">
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> New chat
          </Button>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="rounded-md bg-muted/60 border border-border p-4 text-sm text-foreground">
              <p className="font-medium mb-1">How I can help right now</p>
              <p className="text-muted-foreground leading-relaxed">
                Describe your situation in plain language. I'll give calm, step-by-step survival
                guidance, first aid, and translate to Tamil. In real emergencies, also call <span className="font-mono font-semibold text-emergency">112</span>.
              </p>
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Quick prompts</div>
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map(q => (
                  <button key={q} onClick={() => send(q)} className="text-xs px-3 py-2 rounded-full border border-border bg-background hover:bg-muted transition-colors text-left">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed",
              m.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground prose prose-sm prose-slate max-w-none [&_p]:my-1.5 [&_ol]:my-1.5 [&_ul]:my-1.5 [&_li]:my-0.5 [&_strong]:text-foreground"
            )}>
              {m.role === "assistant" ? <ReactMarkdown>{m.content || "…"}</ReactMarkdown> : m.content}
            </div>
          </div>
        ))}

        {isStreaming && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-3.5 py-2.5 text-sm text-muted-foreground">
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:120ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:240ms]" />
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="text-sm text-emergency border border-emergency/30 bg-emergency/10 rounded-md p-3">{error}</div>
        )}
      </div>

      <form onSubmit={onSubmit} className="border-t border-border p-3 bg-background">
        <div className="flex gap-2 items-end">
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSubmit(); } }}
            placeholder="Describe your situation… (Enter to send)"
            rows={1}
            className="resize-none min-h-[44px] max-h-32"
            disabled={isStreaming}
            aria-label="Message Crisis AI Assistant"
          />
          <Button type="button" size="icon" variant={listening ? "destructive" : "outline"} onClick={onMic} aria-label="Voice input" className="h-[44px] w-[44px] shrink-0">
            <Mic className="h-4 w-4" />
          </Button>
          <Button type="submit" size="icon" disabled={isStreaming || !input.trim()} className="h-[44px] w-[44px] shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

import { corsHeaders } from "@supabase/supabase-js/cors";

const SYSTEM_PROMPT = `You are "Crisis AI Assistant" inside Rapid Crisis Response, an emergency platform helping people survive floods and disasters.

RULES:
1. Lives may depend on your reply — be CALM, CLEAR, and STEP-BY-STEP.
2. Use short numbered steps. No long paragraphs.
3. If the user is in immediate danger, the FIRST line must be a one-sentence calm reassurance, then numbered survival steps.
4. Always remind them of India's emergency numbers when relevant: 112 (all), 108 (ambulance), 100 (police), 101 (fire), 1077 (district disaster), 1554 (coast guard).
5. Detect language. If user writes Tamil, reply in Tamil. Otherwise English. Offer to switch.
6. For flood/water situations always cover: stay high, stay dry, signal, conserve phone battery, share location.
7. Provide first-aid basics (CPR, bleeding control, drowning, hypothermia, snake bite) when asked, with clear "Call 108 now" reminder.
8. NEVER invent specific helpline numbers, addresses or shelter names. If unsure, tell the user to check the Resources page in this app.
9. Refuse anything unrelated to safety, disaster, first aid, or coordinating relief — politely redirect.
10. End with a short reassuring sentence. Never panic.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service unavailable" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("crisis-assistant error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
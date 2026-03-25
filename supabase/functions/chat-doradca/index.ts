import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Jesteś wirtualnym asystentem Dariusza Wentrycha — eksperta finansowego z ponad 20-letnim doświadczeniem w oddłużaniu i doradztwie finansowym w Polsce.

INFORMACJE O DARIUSZU WENTRYCHU:
- Doradca finansowy z ponad 20-letnim doświadczeniem
- Autor bestsellerowej książki „Nowe życie bez długów" — praktyczny poradnik do odzyskania kontroli nad finansami
- Pomógł ponad 15 000 klientów wyjść z problemów finansowych
- Nr 1 w Polsce w konsolidacji kredytów
- Regularnie występuje w mediach: Dzień Dobry TVN, Fakt, TVP, Dziennik Polski
- Znany z konkretnego języka i podejścia skupionego na realnych potrzebach ludzi
- Prywatnie pasjonuje się sportem i podróżami, kibic piłki nożnej i koszykówki

INFORMACJE O FIRMIE:
- Firma specjalizuje się w konsolidacji kredytów, oddłużaniu i doradztwie finansowym
- Ponad 20 lat na rynku
- Pomogliśmy ponad 15 000 klientów
- Oferujemy bezpłatną analizę sytuacji finansowej
- Pracujemy z klientami o różnych poziomach zadłużenia
- Gwarantujemy pełną poufność i indywidualne podejście

ZASADY ODPOWIADANIA:
1. Odpowiadaj krótko, konkretnie i przyjaźnie — maksymalnie 3-4 zdania
2. Pisz w pierwszej osobie jako asystent Dariusza (nie udawaj samego Dariusza)
3. Zawsze kieruj rozmowę w stronę pomocy finansowej
4. Na końcu KAŻDEJ odpowiedzi dodaj zachętę do wypełnienia krótkiego quizu/kalkulatora, np.: "Chcesz sprawdzić, ile możesz zaoszczędzić? Wypełnij nasz krótki quiz!"
5. Bądź empatyczny i profesjonalny
6. Nie podawaj konkretnych porad finansowych — zachęcaj do kontaktu z zespołem
7. Jeśli ktoś pyta o coś niezwiązanego z finansami/firmą, grzecznie przekieruj rozmowę na temat pomocy finansowej
8. WAŻNE — WULGARNE I NIEODPOWIEDNIE WIADOMOŚCI: Jeśli użytkownik używa wulgarnego języka, obraża, pisze nieodpowiednie treści lub próbuje prowokować — NIE reaguj emocjonalnie. Odpowiedz spokojnie i profesjonalnie, np.: "Rozumiem, że możesz być sfrustrowany. Jestem tu, żeby pomóc w kwestiach finansowych. Jeśli masz pytanie dotyczące oddłużania lub konsolidacji — chętnie odpowiem." Nigdy nie powtarzaj wulgarnych słów. Zawsze przekieruj rozmowę na merytoryczny temat.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Zbyt wiele zapytań, spróbuj ponownie za chwilę." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usługa tymczasowo niedostępna." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Błąd serwera AI" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat-doradca error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUp, Sparkles } from 'lucide-react';

import NewCalculatorEmbed from '@/components/NewCalculatorEmbed';


type Msg = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-doradca`;

const suggestions = [
  'Kim jest Dariusz?',
  'Jak działa konsolidacja?',
  'Ile zaoszczędzę?',
  'Pomożecie z długami?',
  'Czy wasza oferta będzie lepsza niż konkurencja?',
];

const Doradca = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasConversation = messages.length > 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showQuiz]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  useEffect(() => {
    if (messages.length >= 2 && messages[messages.length - 1]?.role === 'assistant' && !isLoading) {
      setShowQuiz(true);
    }
  }, [messages, isLoading]);

  const streamChat = async (allMessages: Msg[]) => {
    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: allMessages }),
    });

    if (!resp.ok || !resp.body) {
      const err = await resp.json().catch(() => ({ error: 'Błąd połączenia' }));
      throw new Error(err.error || 'Błąd połączenia');
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = '';
    let assistantSoFar = '';

    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: 'assistant', content: assistantSoFar }];
      });
    };

    let streamDone = false;
    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });
      let idx: number;
      while ((idx = textBuffer.indexOf('\n')) !== -1) {
        let line = textBuffer.slice(0, idx);
        textBuffer = textBuffer.slice(idx + 1);
        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (line.startsWith(':') || line.trim() === '') continue;
        if (!line.startsWith('data: ')) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') { streamDone = true; break; }
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) upsert(content);
        } catch {
          textBuffer = line + '\n' + textBuffer;
          break;
        }
      }
    }
  };

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: 'user', content: text.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setIsLoading(true);
    try {
      await streamChat(updated);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Przepraszam, wystąpił błąd. Spróbuj ponownie.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const renderInputBox = (autoFocus = false) => (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="bg-white border-2 border-warm-neutral-200 rounded-2xl overflow-hidden focus-within:border-prestige-gold-400 transition-colors shadow-lg">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Napisz swoje pytanie..."
          rows={1}
          autoFocus={autoFocus}
          className="w-full bg-transparent text-navy-900 placeholder:text-warm-neutral-400 pl-4 pr-14 pt-3.5 pb-3.5 text-base resize-none focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-prestige-gold-400 hover:bg-prestige-gold-500 disabled:bg-warm-neutral-200 disabled:text-warm-neutral-400 text-navy-900 rounded-xl p-2 transition-all duration-200"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-warm-neutral-50 font-lato flex flex-col">
      {/* SEO */}
      <title>Zapytaj Dariusza Wentrycha — Doradca Finansowy AI</title>
      <meta name="description" content="Zadaj pytanie o oddłużanie, konsolidację kredytów i finanse. Dariusz Wentrych — 20 lat doświadczenia, 15 000+ klientów." />

      {/* Header z bio */}
      <div className="bg-navy-900 text-white px-6 pt-8 pb-5">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
              alt="Dariusz Wentrych"
              className="w-16 h-16 rounded-full border-2 border-prestige-gold-400/40 object-cover flex-shrink-0 shadow-xl"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-base font-bold font-montserrat leading-tight">Dariusz Wentrych</h1>
              <p className="text-prestige-gold-400 text-xs font-semibold">
                🏆 Nr 1 w oddłużaniu osób fizycznych w Polsce
              </p>
              <p className="text-warm-neutral-300 text-xs">
                Najbardziej zaufany ekspert w dziedzinie oddłużania
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-warm-neutral-300 leading-relaxed">
            <p>
              📖 Autor bestsellerowej książki <span className="text-prestige-gold-400 font-semibold">„Nowe życie bez długów"</span>
            </p>
            <p>
              📺 Wkrótce Dariusz Wentrych wystąpi w programie <span className="text-white font-semibold">„Życie na Kredycie"</span>
            </p>
            <p>
              ✅ Ponad <span className="text-prestige-gold-400 font-semibold">15 000+ obsłużonych klientów</span> w całej Polsce
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4">
        {!hasConversation ? (
          /* Empty state — centered vertically */
          <div className="flex-1 flex flex-col items-center justify-center py-8">
            <img
              src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
              alt="Dariusz Wentrych"
              className="w-16 h-16 rounded-full border-2 border-prestige-gold-300 object-cover mb-4 shadow-lg"
            />
            <h2 className="text-navy-900 font-bold text-lg sm:text-xl font-montserrat mb-1 text-center">
              Co chciałbyś wiedzieć?
            </h2>
            <p className="text-warm-neutral-500 text-sm mb-6 text-center max-w-sm">
              Zapytaj o Dariusza, konsolidację, oddłużanie lub nasze usługi
            </p>

            <div className="w-full max-w-lg mb-4">
              {renderInputBox(true)}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs text-warm-neutral-600 hover:text-navy-900 bg-white hover:bg-prestige-gold-50 border border-warm-neutral-200 hover:border-prestige-gold-300 rounded-full px-3 py-1.5 transition-all duration-200 shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Szybka ścieżka CTA */}
            <div className="w-full max-w-lg mt-6 text-center">
              <div className="relative flex items-center justify-center mb-3">
                <div className="border-t border-warm-neutral-200 flex-1" />
                <span className="px-3 text-xs text-warm-neutral-400">lub</span>
                <div className="border-t border-warm-neutral-200 flex-1" />
              </div>
              <button
                onClick={() => navigate('/kalkulator-nowy')}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 hover:from-prestige-gold-500 hover:to-prestige-gold-600 text-navy-900 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
              >
                <ArrowUp className="w-4 h-4 rotate-90" />
                Sprawdź swoją ofertę od razu
              </button>
            </div>
          </div>
        ) : (
          /* Conversation view */
          <div className="flex-1 flex flex-col py-4">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <img
                      src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                      alt="Dariusz"
                      className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-1 border border-prestige-gold-200"
                    />
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-business-blue-600 text-white rounded-br-md'
                        : 'bg-white border border-warm-neutral-200 text-navy-900 rounded-bl-md shadow-sm'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="whitespace-pre-wrap leading-relaxed text-sm text-navy-900">
                        {msg.content}
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-2.5">
                  <img src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" alt="Dariusz" className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-1 border border-prestige-gold-200" />
                  <div className="bg-white border border-warm-neutral-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-warm-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-warm-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-warm-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Quiz inline po odpowiedzi */}
              {showQuiz && !isLoading && (
                <div className="bg-white border-2 border-prestige-gold-300 rounded-2xl p-4 sm:p-5 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-prestige-gold-500" />
                    <p className="text-navy-900 font-bold text-sm font-montserrat">
                      Sprawdź ile możesz zaoszczędzić
                    </p>
                  </div>
                  <NewCalculatorEmbed />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Sticky input */}
            <div className="sticky bottom-0 bg-warm-neutral-50 pt-2 pb-3">
              <InputBox />
            </div>
          </div>
        )}
      </div>

      {/* Mini footer */}
      <div className="border-t border-warm-neutral-200 py-3 px-4 text-center text-xs text-warm-neutral-400">
        <span>© {new Date().getFullYear()} Wentrych.pl</span>
        <span className="mx-2">·</span>
        <a href="https://wentrych.pl/polityka-prywatnosci" target="_blank" rel="noopener noreferrer" className="hover:text-navy-900 transition-colors">Polityka prywatności</a>
        <span className="mx-2">·</span>
        <a href="https://wentrych.pl/regulamin" target="_blank" rel="noopener noreferrer" className="hover:text-navy-900 transition-colors">Regulamin</a>
      </div>
    </div>
  );
};

export default Doradca;

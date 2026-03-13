import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowRight, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Msg = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-doradca`;

const suggestions = [
  'Kim jest Dariusz?',
  'Jak działa konsolidacja?',
  'Ile mogę zaoszczędzić?',
  'Pomożecie z długami?',
];

const Doradca = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [input]);

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
      setMessages(prev => [...prev, { role: 'assistant', content: 'Przepraszam, wystąpił błąd. Spróbuj ponownie za chwilę.' }]);
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

  return (
    <div className="min-h-screen flex flex-col bg-navy-900">
      {/* Minimal top bar */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10">
        <button onClick={() => navigate('/')} className="text-warm-neutral-400 hover:text-white text-sm transition-colors">
          ← Strona główna
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-warm-neutral-400 text-xs sm:text-sm">Asystent AI online</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
        
        {!hasMessages ? (
          /* Empty state — centered like ChatGPT */
          <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4">
            <img
              src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
              alt="Dariusz Wentrych"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-prestige-gold-400/50 shadow-2xl object-cover mb-5"
            />
            <h1 className="text-white text-xl sm:text-2xl font-bold font-montserrat mb-2 text-center">
              Zapytaj o cokolwiek
            </h1>
            <p className="text-warm-neutral-400 text-sm sm:text-base text-center max-w-md mb-8">
              Dariusz Wentrych — 20 lat doświadczenia, 15 000+ klientów, autor „Nowe życie bez długów"
            </p>

            {/* Input box */}
            <div className="w-full max-w-xl">
              <form onSubmit={handleSubmit} className="relative">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden focus-within:border-prestige-gold-400/50 transition-colors">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Napisz wiadomość..."
                    rows={1}
                    className="w-full bg-transparent text-white placeholder:text-warm-neutral-500 px-4 pt-4 pb-12 text-sm sm:text-base resize-none focus:outline-none"
                    disabled={isLoading}
                  />
                  <div className="absolute bottom-3 right-3">
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="bg-prestige-gold-400 hover:bg-prestige-gold-500 disabled:bg-white/10 disabled:text-warm-neutral-600 text-navy-900 rounded-lg p-2 transition-all duration-200"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs sm:text-sm text-warm-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full px-3 py-1.5 transition-all duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Chat conversation */
          <>
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <img
                      src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                      alt="Dariusz"
                      className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-1 border border-prestige-gold-400/30"
                    />
                  )}
                  <div
                    className={`max-w-[80%] ${
                      msg.role === 'user'
                        ? 'bg-business-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3'
                        : 'text-warm-neutral-200'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm prose-invert max-w-none [&_p]:text-warm-neutral-200 [&_p]:leading-relaxed [&_p]:text-sm sm:[&_p]:text-base">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <span className="text-sm sm:text-base">{msg.content}</span>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-3">
                  <img
                    src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                    alt="Dariusz"
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-1 border border-prestige-gold-400/30"
                  />
                  <div className="flex gap-1 items-center pt-2">
                    <span className="w-1.5 h-1.5 bg-warm-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-warm-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-warm-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* CTA banner — subtle */}
            {!isLoading && messages.length >= 2 && (
              <div className="px-4 sm:px-6 pb-2">
                <button
                  onClick={() => navigate('/kalkulator-nowy')}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-prestige-gold-400/20 to-prestige-gold-500/20 hover:from-prestige-gold-400/30 hover:to-prestige-gold-500/30 border border-prestige-gold-400/30 text-prestige-gold-300 hover:text-prestige-gold-200 font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 text-xs sm:text-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Sprawdź ile możesz zaoszczędzić — Krótki Quiz
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Bottom input */}
            <div className="border-t border-white/10 p-3 sm:p-4">
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden focus-within:border-prestige-gold-400/50 transition-colors">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Napisz wiadomość..."
                    rows={1}
                    className="w-full bg-transparent text-white placeholder:text-warm-neutral-500 px-4 pt-3 pb-10 text-sm sm:text-base resize-none focus:outline-none"
                    disabled={isLoading}
                  />
                  <div className="absolute bottom-2.5 right-3">
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="bg-prestige-gold-400 hover:bg-prestige-gold-500 disabled:bg-white/10 disabled:text-warm-neutral-600 text-navy-900 rounded-lg p-1.5 transition-all duration-200"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Doradca;

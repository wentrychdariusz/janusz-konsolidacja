import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowRight, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import NewCalculatorEmbed from '@/components/NewCalculatorEmbed';

type Msg = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-doradca`;

const suggestions = [
  'Kim jest Dariusz?',
  'Jak działa konsolidacja?',
  'Ile zaoszczędzę?',
  'Pomożecie z długami?',
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
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  // Show quiz after first AI response
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

  return (
    <div className="min-h-screen bg-warm-neutral-50 font-lato flex flex-col">
      {/* Compact header with bio */}
      <div className="bg-navy-900 text-white px-4 py-4 sm:py-5">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <img
            src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
            alt="Dariusz Wentrych"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-prestige-gold-400/40 object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold font-montserrat leading-tight">
              Dariusz Wentrych
            </h1>
            <p className="text-prestige-gold-400 text-xs sm:text-sm font-medium">
              Doradca finansowy · 20 lat · 15 000+ klientów
            </p>
            <p className="text-warm-neutral-400 text-xs mt-0.5 leading-snug hidden sm:block">
              Autor „Nowe życie bez długów" · Ekspert TVN, TVP, Fakt
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="ml-auto text-warm-neutral-500 hover:text-white text-xs whitespace-nowrap transition-colors flex-shrink-0"
          >
            ← Główna
          </button>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
          {!hasConversation && (
            <div className="text-center py-6 sm:py-10">
              <p className="text-navy-900 font-bold text-lg sm:text-xl font-montserrat mb-1">
                Co chciałbyś wiedzieć?
              </p>
              <p className="text-warm-neutral-500 text-sm mb-5">
                Zapytaj o Dariusza, firmę lub nasze usługi finansowe
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs sm:text-sm text-warm-neutral-600 hover:text-navy-900 bg-white hover:bg-prestige-gold-50 border border-warm-neutral-200 hover:border-prestige-gold-300 rounded-full px-3 py-1.5 transition-all duration-200 shadow-sm"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2.5 mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <img
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                  alt="Dariusz"
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-1 border border-prestige-gold-200"
                />
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm sm:text-base ${
                  msg.role === 'user'
                    ? 'bg-business-blue-600 text-white rounded-br-md'
                    : 'bg-white border border-warm-neutral-200 text-navy-900 rounded-bl-md shadow-sm'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none [&_p]:text-navy-900 [&_p]:leading-relaxed [&_p]:text-sm [&_p]:mb-1.5 [&_strong]:text-navy-900">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-2.5 mb-4">
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

          <div ref={messagesEndRef} />

          {/* Quiz appears inline after AI responds */}
          {showQuiz && !isLoading && (
            <div className="mt-4 mb-4 bg-white border-2 border-prestige-gold-300 rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-prestige-gold-500" />
                <p className="text-navy-900 font-bold text-sm sm:text-base font-montserrat">
                  Sprawdź ile możesz zaoszczędzić
                </p>
              </div>
              <NewCalculatorEmbed />
            </div>
          )}
        </div>

        {/* Input — sticky bottom */}
        <div className="sticky bottom-0 bg-warm-neutral-50 border-t border-warm-neutral-200 px-4 py-3">
          <form onSubmit={handleSubmit} className="relative">
            <div className="bg-white border-2 border-warm-neutral-200 rounded-2xl overflow-hidden focus-within:border-prestige-gold-400 transition-colors shadow-md">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Napisz pytanie..."
                rows={1}
                className="w-full bg-transparent text-navy-900 placeholder:text-warm-neutral-400 pl-4 pr-12 pt-3 pb-3 text-sm sm:text-base resize-none focus:outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2.5 bottom-2.5 bg-prestige-gold-400 hover:bg-prestige-gold-500 disabled:bg-warm-neutral-200 disabled:text-warm-neutral-400 text-navy-900 rounded-lg p-2 transition-all duration-200"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Doradca;

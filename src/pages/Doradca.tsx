import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import TopHeader from '@/components/TopHeader';
import Footer from '@/components/Footer';

type Msg = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-doradca`;

const suggestedQuestions = [
  'Kim jest Dariusz Wentrych?',
  'Jak mogę skonsolidować swoje kredyty?',
  'Ile mogę zaoszczędzić na ratach?',
  'Czy pomożecie mi z długami?',
];

const Doradca = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  return (
    <div className="min-h-screen flex flex-col bg-warm-neutral-50 font-lato">
      <TopHeader />

      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-6 sm:py-10">
        {/* Hero card z info o Dariuszu */}
        <div className="bg-white rounded-2xl shadow-lg border border-prestige-gold-200/30 p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 sm:gap-6">
            <img
              src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
              alt="Dariusz Wentrych"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-3 border-prestige-gold-200 shadow-lg object-cover flex-shrink-0"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-navy-900 font-montserrat mb-1">
                Zapytaj o Dariusza Wentrycha
              </h1>
              <p className="text-prestige-gold-600 font-semibold text-sm sm:text-base mb-2">
                Doradca finansowy · Autor „Nowe życie bez długów"
              </p>
              <p className="text-warm-neutral-600 text-sm sm:text-base leading-relaxed">
                Ponad 20 lat doświadczenia, 15 000+ zadowolonych klientów, znany z mediów (TVN, TVP, Fakt).
                Zadaj pytanie — dowiedz się więcej o Dariuszu, firmie lub naszych usługach.
              </p>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-warm-neutral-200/50 flex flex-col min-h-[400px] sm:min-h-[500px]">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="bg-prestige-gold-100 rounded-full p-4 mb-4">
                  <MessageCircle className="w-8 h-8 text-prestige-gold-600" />
                </div>
                <p className="text-warm-neutral-600 mb-6 text-sm sm:text-base">
                  Zadaj pytanie o Dariuszu, firmie lub naszych usługach finansowych
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="text-left text-sm bg-warm-neutral-50 hover:bg-prestige-gold-50 border border-warm-neutral-200 hover:border-prestige-gold-300 rounded-xl px-4 py-3 transition-all duration-200 text-navy-900"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm sm:text-base ${
                    msg.role === 'user'
                      ? 'bg-business-blue-600 text-white rounded-br-md'
                      : 'bg-warm-neutral-100 text-navy-900 rounded-bl-md'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="bg-warm-neutral-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-warm-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-warm-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-warm-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* CTA po odpowiedzi */}
          {messages.length > 0 && !isLoading && (
            <div className="px-4 sm:px-6 pb-2">
              <button
                onClick={() => navigate('/kalkulator-nowy')}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 hover:from-prestige-gold-500 hover:to-prestige-gold-600 text-navy-900 font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                Sprawdź ile możesz zaoszczędzić — Krótki Quiz
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-warm-neutral-200 p-3 sm:p-4 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Wpisz swoje pytanie..."
              className="flex-1 bg-warm-neutral-50 border border-warm-neutral-200 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-prestige-gold-300 focus:border-transparent text-navy-900 placeholder:text-warm-neutral-400"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-business-blue-600 hover:bg-business-blue-700 text-white rounded-xl px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Doradca;

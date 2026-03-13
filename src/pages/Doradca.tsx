import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowRight, Sparkles, Users, TrendingUp, BookOpen, Award } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import TopHeader from '@/components/TopHeader';
import Footer from '@/components/Footer';

type Msg = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-doradca`;

const suggestions = [
  'Kim jest Dariusz?',
  'Jak działa konsolidacja?',
  'Ile mogę zaoszczędzić?',
  'Pomożecie z długami?',
];

const achievements = [
  { icon: Users, number: '15 000+', text: 'zadowolonych klientów' },
  { icon: TrendingUp, number: '20 lat', text: 'doświadczenia' },
  { icon: BookOpen, number: '1', text: 'bestsellerowa książka' },
  { icon: Award, number: 'Nr 1', text: 'w oddłużaniu w Polsce' },
];

const Doradca = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

    // Scroll to chat
    setTimeout(() => {
      chatSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

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
    <div className="min-h-screen flex flex-col font-lato">
      <TopHeader />

      {/* Hero bio section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
            <img
              src="/lovable-uploads/334d50e2-cfc0-48be-97b0-4521fb97af10.png"
              alt="Dariusz Wentrych - Doradca finansowy"
              className="w-40 h-52 sm:w-48 sm:h-64 object-cover rounded-2xl shadow-2xl border-4 border-prestige-gold-400/30 flex-shrink-0"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat mb-2">
                Dariusz Wentrych
              </h1>
              <p className="text-prestige-gold-400 font-semibold text-base sm:text-lg mb-4">
                Doradca finansowy · Autor „Nowe życie bez długów"
              </p>
              <p className="text-warm-neutral-300 text-sm sm:text-base leading-relaxed mb-3">
                Dariusz Wentrych to doradca finansowy z ponad 20-letnim doświadczeniem, który pomaga klientom podejmować świadome decyzje dotyczące ich pieniędzy. Jest autorem bestsellerowej książki „Nowe życie bez długów".
              </p>
              <p className="text-warm-neutral-300 text-sm sm:text-base leading-relaxed">
                Regularnie występuje w mediach — Dzień Dobry TVN, TVP, Fakt, Dziennik Polski. Znany z konkretnego podejścia skupionego na realnych potrzebach ludzi.
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10">
            {achievements.map((a, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <a.icon className="w-6 h-6 text-prestige-gold-400 mx-auto mb-2" />
                <div className="text-lg sm:text-xl font-bold text-white font-montserrat">{a.number}</div>
                <p className="text-warm-neutral-400 text-xs sm:text-sm">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat section */}
      <section ref={chatSectionRef} className="bg-warm-neutral-50 flex-1 py-10 sm:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-navy-900 font-montserrat mb-2">
              Masz pytanie? Zapytaj teraz
            </h2>
            <p className="text-warm-neutral-500 text-sm sm:text-base">
              Wpisz co chciałbyś wiedzieć o Dariuszu, firmie lub naszych usługach
            </p>
          </div>

          {/* Input box — always visible */}
          <form onSubmit={handleSubmit} className="relative mb-6">
            <div className="bg-white border-2 border-warm-neutral-200 rounded-2xl overflow-hidden shadow-lg focus-within:border-prestige-gold-400 focus-within:shadow-xl transition-all duration-300">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Napisz swoje pytanie..."
                rows={1}
                className="w-full bg-transparent text-navy-900 placeholder:text-warm-neutral-400 px-4 sm:px-5 pt-4 pb-12 text-sm sm:text-base resize-none focus:outline-none"
                disabled={isLoading}
              />
              <div className="absolute bottom-3 right-3">
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-prestige-gold-400 hover:bg-prestige-gold-500 disabled:bg-warm-neutral-200 disabled:text-warm-neutral-400 text-navy-900 rounded-xl p-2.5 transition-all duration-200 shadow-md"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Suggestion chips — only when no messages */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs sm:text-sm text-warm-neutral-600 hover:text-navy-900 bg-white hover:bg-prestige-gold-50 border border-warm-neutral-200 hover:border-prestige-gold-300 rounded-full px-4 py-2 transition-all duration-200 shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          {messages.length > 0 && (
            <div className="space-y-5 mb-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <img
                      src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png"
                      alt="Dariusz"
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1 border-2 border-prestige-gold-200 shadow"
                    />
                  )}
                  <div
                    className={`max-w-[85%] ${
                      msg.role === 'user'
                        ? 'bg-business-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-md'
                        : 'bg-white border border-warm-neutral-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm text-navy-900'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none [&_p]:text-navy-900 [&_p]:leading-relaxed [&_p]:text-sm sm:[&_p]:text-base [&_strong]:text-navy-900">
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
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1 border-2 border-prestige-gold-200 shadow"
                  />
                  <div className="bg-white border border-warm-neutral-200 rounded-2xl rounded-bl-md px-4 py-4 shadow-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-warm-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-warm-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-warm-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* CTA do formularza — po odpowiedzi */}
          {!isLoading && messages.length >= 2 && (
            <div className="bg-gradient-to-r from-prestige-gold-50 to-prestige-gold-100/50 border-2 border-prestige-gold-300 rounded-2xl p-5 sm:p-6 text-center shadow-lg">
              <p className="text-navy-900 font-bold text-base sm:text-lg font-montserrat mb-2">
                Chcesz sprawdzić, ile możesz zaoszczędzić?
              </p>
              <p className="text-warm-neutral-600 text-sm mb-4">
                Wypełnij krótki formularz — to zajmie mniej niż 2 minuty
              </p>
              <button
                onClick={() => navigate('/kalkulator-nowy')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-prestige-gold-400 to-prestige-gold-500 hover:from-prestige-gold-500 hover:to-prestige-gold-600 text-navy-900 font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <Sparkles className="w-4 h-4" />
                Rozpocznij krótki quiz
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Doradca;

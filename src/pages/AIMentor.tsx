import { useEffect, useRef, useState } from "react";
import { 
  GraduationCap, BookOpen, ArrowRightLeft, Briefcase,
  Building2, Gift, Bell, Users, Sparkles, TrendingUp, LogOut,
  Lightbulb, Target, Rocket, Brain, Puzzle, Award
} from 'lucide-react';

type Message = {
  role: "user" | "ai";
  text: string;
};



const AIMentor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hello 👋 I’m your AI Mentor. Ask me anything about skills, learning, or growth.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
  }

  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, loading]);


  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "I’m thinking about this thoughtfully.\n\n(This is a placeholder response. The real AI will be connected shortly.)",
        },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#20E3B2]/8 via-[#2CCCFF]/8 to-[#6A5AF9]/8 px-4">
    
    <div className="absolute top-28 left-80 opacity-[0.08] animate-float">
        <BookOpen className="w-24 h-24 text-primary" />
      </div>
      <div className="absolute top-52 left-10 opacity-[0.08] animate-float" style={{ animationDelay: '2.5s' }}>
        <Puzzle className="w-16 h-16 text-feature-quiz" />
      </div>
      <div className="absolute top-60 right-16 opacity-[0.08] animate-float" style={{ animationDelay: '3s' }}>
        <Rocket className="w-14 h-14 text-accent" />
      </div>
      <div className="absolute top-36 right-80 opacity-[0.08] animate-float" style={{ animationDelay: '0.5s' }}>
        <GraduationCap className="w-20 h-20 text-accent" />
      </div>
      <div className="absolute top-96 left-60 opacity-[0.08] animate-float" style={{ animationDelay: '1s' }}>
        <Lightbulb className="w-16 h-16 text-feature-learn" />
      </div>
      <div className="absolute top-96 right-60 opacity-[0.08] animate-float" style={{ animationDelay: '1.5s' }}>
        <Target className="w-20 h-20 text-feature-teach" />
      </div>
      <div className="absolute top-[600px] left-14 opacity-[0.08] animate-float" style={{ animationDelay: '2s' }}>
        <Brain className="w-14 h-14 text-feature-study" />
      </div>
      <div className="absolute top-[600px] right-16 opacity-[0.08] animate-float">
        <BookOpen className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute top-[850px] right-16 opacity-[0.08] animate-float" style={{ animationDelay: '2.5s' }}>
        <Puzzle className="w-16 h-16 text-feature-quiz" />
      </div>
      <div className="absolute top-[850px] left-16 opacity-[0.08] animate-float" style={{ animationDelay: '3s' }}>
        <Rocket className="w-14 h-14 text-accent" />
      </div>
      <div className="absolute top-[1150px] right-20 opacity-[0.08] animate-float" style={{ animationDelay: '3.5s' }}>
        <Award className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute top-[1100px] left-20 opacity-[0.08] animate-float"
        style={{ animationDelay: '4s' }}
      >
      <Brain className="w-20 h-20 text-feature-study" />
      </div>

      {/* HEADER */}
      <header className="pt-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#20E3B2] via-[#2CCCFF] to-[#6A5AF9] flex items-center justify-center shadow-sm">
            🤖
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-[#20E3B2] via-[#2CCCFF] to-[#6A5AF9] bg-clip-text text-transparent">
          AI Mentor
        </h1>

        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          A focused assistant to help you learn, decide, and grow with clarity.
        </p>
      </header>

      {/* CHAT AREA */}
      <main className="flex-1 w-full max-w-3xl mt-12 px-1 overflow-y-auto space-y-6">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 text-sm leading-relaxed rounded-xl ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm shadow-sm"
                  : "bg-white/80 backdrop-blur text-foreground rounded-bl-sm shadow-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/70 backdrop-blur px-4 py-3 rounded-xl text-sm text-muted-foreground shadow-sm animate-pulse">
              AI is thinking…
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      {/* INPUT ROW */}
      <footer className="w-full max-w-3xl pb-10 pt-6">
        <div className="flex items-center gap-3">

          <textarea
            rows={1}
            className="
              flex-1 resize-none rounded-xl
              border border-border/60
              px-4 py-2 text-sm
              bg-white/80 backdrop-blur
              focus:outline-none focus:ring-2 focus:ring-primary/40
            "
            placeholder="Ask a question…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            className="
              relative px-5 py-2 rounded-xl text-sm font-medium
              text-foreground bg-white/70 backdrop-blur
              border border-transparent
              before:absolute before:inset-0 before:rounded-xl
              before:bg-gradient-to-r before:from-[#20E3B2] before:via-[#2CCCFF] before:to-[#6A5AF9]
              before:opacity-60 before:-z-10
              hover:before:opacity-100
              transition
            "   
          >
            Send
          </button>

        </div>
      </footer>
    </div>
  );
};

export default AIMentor;

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Sparkles, Compass, RefreshCw, MessageSquare, Terminal } from "lucide-react";
import { GlassCard } from "./glass-card";

interface Message {
  id: string;
  sender: "user" | "springo";
  text: string;
  timestamp: string;
}

const ROADMAP_KNOWLEDGE: Record<string, string> = {
  frontend: `🎨 **Frontend Roadmap (Fast Track)**:
1. **HTML & Semantic Web**: Layouts, Accessibility, Forms.
2. **Modern CSS**: Flexbox, CSS Grid, Glassmorphic styling, Tailwind CSS v4.
3. **JavaScript Mastery**: ES6+, Async/Await, DOM Manipulation, Fetch API.
4. **React & Next.js/Vite**: Components, State, Hooks, Routing.
5. **Public Proof**: Build 5 real mini-projects & host them live!

SAMJHE BETAA....!!`,

  backend: `⚙️ **Backend Engineering Roadmap**:
1. **Core Language**: Node.js (TypeScript) or Python.
2. **REST & GraphQL APIs**: Routing, Middlewares, Validation.
3. **Databases**: PostgreSQL (Relational) & Redis (Caching).
4. **Authentication**: JWT, OAuth2, Session cookies.
5. **Deployment**: Docker, CI/CD pipelines, Cloud Hosting.

SAMJHE BETAA....!!`,

  ai: `🧠 **AI & Machine Learning Roadmap**:
1. **Python Foundations**: NumPy, Pandas, Data Wrangling.
2. **Math & Stats**: Linear Algebra, Probability, Calculus basics.
3. **Machine Learning**: Scikit-Learn, Regression, Classification.
4. **Deep Learning**: PyTorch or TensorFlow & Neural Networks.
5. **Modern GenAI**: OpenAI / Gemini APIs, Vector DBs (Chroma/Pinecone), RAG applications.

SAMJHE BETAA....!!`,

  devops: `🚀 **DevOps & Cloud Roadmap**:
1. **OS & Shell**: Linux terminal, Bash scripting.
2. **Version Control**: Git branching, PR reviews, GitHub Actions.
3. **Containerization**: Docker, Docker Compose.
4. **Orchestration**: Kubernetes fundamentals.
5. **Cloud Providers**: AWS or Google Cloud deployment pipelines.

SAMJHE BETAA....!!`,

  abtalks: `🔥 **ABTalks 60-Day Public Build Strategy**:
1. **Day 1**: Pick your stack (Frontend, Fullstack, AI) and set up a public GitHub repository.
2. **Daily 1 Hour Code**: Solve the unlocked daily task on your ABTalks dashboard.
3. **Commit & Post**: Push atomic Git commits & share a 3-bullet breakdown on LinkedIn with #ABTalks.
4. **Submit Proof**: Paste both URLs in your dashboard to grow your verified streak!

SAMJHE BETAA....!!`,
};

export function SpringoAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "springo",
      text: "Namaste! I am **Springo AI** 🚀 — your roadmap navigator and ABTalks challenge guide.\n\nAsk me for developer roadmaps (Frontend, Backend, AI/ML, DevOps) or tips to crush your 60-Day Challenge!\n\nSAMJHE BETAA....!!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Click outside listener to close modal when active
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const generateSpringoResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("front") || q.includes("react") || q.includes("css") || q.includes("web")) {
      return ROADMAP_KNOWLEDGE.frontend;
    }
    if (q.includes("back") || q.includes("node") || q.includes("api") || q.includes("db") || q.includes("sql")) {
      return ROADMAP_KNOWLEDGE.backend;
    }
    if (q.includes("ai") || q.includes("ml") || q.includes("python") || q.includes("model") || q.includes("llm")) {
      return ROADMAP_KNOWLEDGE.ai;
    }
    if (q.includes("devops") || q.includes("docker") || q.includes("cloud") || q.includes("aws")) {
      return ROADMAP_KNOWLEDGE.devops;
    }
    if (q.includes("challenge") || q.includes("abtalks") || q.includes("streak") || q.includes("proof") || q.includes("day 1")) {
      return ROADMAP_KNOWLEDGE.abtalks;
    }

    // Default intelligent response fallback always ending with SAMJHE BETAA....!!
    return `To master software development: focus on 1 project every day, commit your code to GitHub, share proof on LinkedIn, and never break your daily streak!\n\nCheck the roadmap options below or ask me about Frontend, Backend, AI/ML, or DevOps!\n\nSAMJHE BETAA....!!`;
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateSpringoResponse(text);
      const springoMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "springo",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, springoMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Background Blur Overlay when AI is Active */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="animate-fade-in fixed inset-0 z-40 bg-black/45 backdrop-blur-md transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Floating Trigger Button shifted higher and further left for ample margins */}
      <div className="fixed bottom-12 right-10 sm:bottom-14 sm:right-12 z-50">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="springo-btn shadow-[0_10px_35px_rgba(0,0,0,0.6)] active:scale-95"
          aria-label="Ask Springo AI Assistant"
        >
          <svg viewBox="0 0 24 24" height={22} width={22} xmlns="http://www.w3.org/2000/svg">
            <g fill="none">
              <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
              <path
                d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"
                fill="currentColor"
              />
            </g>
          </svg>
          <span>Ask Springo AI</span>
        </button>
      </div>

      {/* Glassmorphism & Neomorphism Springo AI Modal Window */}
      {isOpen && (
        <div
          ref={modalRef}
          className="animate-pop-in fixed inset-x-4 bottom-32 sm:bottom-32 sm:right-12 sm:left-auto sm:w-[430px] z-50 mx-auto max-w-lg"
        >
          <div className="relative flex h-[550px] flex-col overflow-hidden rounded-3xl border border-white/20 dark:border-primary/40 bg-background/35 p-0 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-3xl">
            {/* Top Specular Edge Highlight */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent"
            />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-background/30 px-4 py-3.5 backdrop-blur-xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-pink-400 to-blue-500 p-0.5 text-white shadow-lg ring-2 ring-white/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold tracking-wide text-foreground">Springo AI</h3>
                  <p className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Roadmap & ABTalks Guide
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary/70 hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs leading-relaxed">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 shadow-md ${
                      msg.sender === "user"
                        ? "liquid-glass-btn text-primary-foreground font-semibold rounded-br-none"
                        : "border border-white/15 bg-surface/30 backdrop-blur-xl text-foreground rounded-bl-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)] whitespace-pre-line"
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`mt-1.5 text-[9px] ${
                        msg.sender === "user" ? "text-primary-foreground/80" : "text-muted-foreground"
                      } text-right font-medium`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-white/15 bg-surface/30 backdrop-blur-xl p-3 text-muted-foreground flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 animate-spin text-primary" /> Springo AI is crafting answer...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Neomorphic Quick Prompt Chips */}
            <div className="border-t border-white/10 bg-background/20 px-3.5 py-2.5 flex items-center gap-2 overflow-x-auto text-[11px] backdrop-blur-md">
              <button
                type="button"
                onClick={() => handleSend("Frontend Developer Roadmap")}
                className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-foreground font-semibold hover:bg-emerald-400/20 transition-colors shadow-sm"
              >
                🎨 Frontend
              </button>
              <button
                type="button"
                onClick={() => handleSend("Backend Roadmap")}
                className="shrink-0 rounded-full border border-pink-400/30 bg-pink-400/10 px-3 py-1 text-foreground font-semibold hover:bg-pink-400/20 transition-colors shadow-sm"
              >
                ⚙️ Backend
              </button>
              <button
                type="button"
                onClick={() => handleSend("AI & Machine Learning Roadmap")}
                className="shrink-0 rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-foreground font-semibold hover:bg-purple-400/20 transition-colors shadow-sm"
              >
                🧠 AI / ML
              </button>
              <button
                type="button"
                onClick={() => handleSend("DevOps Roadmap")}
                className="shrink-0 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-foreground font-semibold hover:bg-blue-400/20 transition-colors shadow-sm"
              >
                🚀 DevOps
              </button>
            </div>

            {/* Neomorphic Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 border-t border-white/10 bg-background/40 p-3 backdrop-blur-xl"
            >
              <input
                type="text"
                placeholder="Ask Springo AI about roadmaps..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-2xl border border-white/15 bg-background/50 px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 shadow-inner"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-2xl liquid-glass-btn text-primary-foreground shadow-md hover:brightness-110 disabled:opacity-40 transition-all"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

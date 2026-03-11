import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import ReactMarkdown from "react-markdown"; // <-- ADDED THIS

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "PENTAXION AI SYSTEM INITIALIZED. HOW CAN I ASSIST YOU TODAY?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when a new message appears
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    
    // 1. Update UI with the user's message immediately
    const updatedMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      // 2. Send the conversation history to your new backend
      const response = await fetch("https://pentexion-1.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages.map(m => ({ role: m.role === "system" ? "assistant" : m.role, content: m.content })) }),
      });

      const data = await response.json();

      // 3. Update the UI with Penta_Core's real answer
      if (data.reply) {
        setMessages((prev) => [
          ...prev, 
          { role: "assistant", content: data.reply }
        ]);
      } else {
        throw new Error("Invalid response");
      }

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev, 
        { role: "assistant", content: "SYSTEM ERROR: Connection to Penta_Core severed. Please try again later." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* --- CHAT TOGGLE BUTTON --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#0a0a0a] border border-iron-red rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,31,31,0.4)] hover:shadow-[0_0_30px_rgba(255,31,31,0.8)] hover:scale-110 transition-all duration-300 group"
      >
        <div className="absolute inset-0 rounded-full bg-iron-red/20 animate-ping opacity-50" />
        <Icon 
            icon={isOpen ? "lucide:x" : "lucide:cpu"} 
            className="text-iron-red text-2xl group-hover:text-white transition-colors relative z-10" 
        />
      </button>

      {/* --- CHAT WINDOW --- */}
      <div 
        className={`fixed bottom-24 right-6 z-[99] w-[350px] sm:w-[400px] h-[500px] bg-black/95 backdrop-blur-xl border border-iron-red/50 shadow-[0_0_40px_rgba(255,31,31,0.2)] rounded-lg flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-iron-red/30 bg-gradient-to-r from-iron-red/10 to-transparent">
          <div className="flex items-center gap-3">
            <Icon icon="lucide:bot" className="text-iron-red text-xl animate-pulse" />
            <div>
                <h3 className="font-mono font-bold text-white text-sm tracking-widest uppercase">Penta_Core</h3>
                <p className="font-mono text-[9px] text-iron-red">STATUS: ONLINE</p>
            </div>
          </div>
        </div>

        {/* Message Area */}
<div 
  data-lenis-prevent="true" 
  className="flex-1 overflow-y-auto overscroll-contain p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-iron-red/50 scrollbar-track-transparent"
>          {messages.map((msg, idx) => (
            <div 
                key={idx} 
                className={`flex flex-col max-w-[90%] ${msg.role === "user" ? "self-end items-end" : "self-start items-start"}`}
            >
              <span className="font-mono text-[9px] text-gray-500 mb-1 tracking-widest uppercase">
                  {msg.role === "user" ? "USER_INPUT" : "SYSTEM_RESPONSE"}
              </span>
              <div 
                className={`p-3 rounded-md font-mono text-sm leading-relaxed ${
                    msg.role === "user" 
                    ? "bg-iron-red/20 border border-iron-red/50 text-white rounded-tr-none" 
                    : "bg-white/5 border border-white/10 text-gray-300 rounded-tl-none"
                }`}
              >
                {/* --- NEW: MARKDOWN RENDERER --- */}
                {msg.role === "user" ? (
                  msg.content
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      ul: ({...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                      ol: ({...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                      li: ({...props}) => <li className="pl-1" {...props} />,
                      strong: ({...props}) => <strong className="text-iron-red font-bold" {...props} />,
                      a: ({...props}) => <a className="text-iron-red underline underline-offset-2 hover:text-white transition-colors" target="_blank" rel="noreferrer" {...props} />,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="self-start flex items-center gap-1 p-3 bg-white/5 border border-white/10 rounded-md rounded-tl-none">
              <div className="w-1.5 h-1.5 bg-iron-red rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-iron-red rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-1.5 h-1.5 bg-iron-red rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 border-t border-iron-red/30 bg-black flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your query..."
            className="flex-1 bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-iron-red transition-colors"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-iron-red text-black p-2 rounded-md hover:bg-white disabled:opacity-50 disabled:hover:bg-iron-red transition-colors"
          >
            <Icon icon="lucide:send" className="text-xl" />
          </button>
        </form>

        {/* Top & Bottom Scanlines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-iron-red to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-iron-red to-transparent opacity-50" />
      </div>
    </>
  );
};

export default ChatBot;
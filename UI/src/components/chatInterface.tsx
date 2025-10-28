"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Bot } from "lucide-react";

export default function ChatInterface({
  title,
  description,
  onSend,
}: {
  title: string;
  description: string;
  onSend: (message: string) => Promise<string>;
}) {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<{ sender: string; message: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setChat((prev) => [...prev, { sender: "user", message: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const botReply = await onSend(userMessage);
      setChat((prev) => [...prev, { sender: "bot", message: botReply }]);
    } catch {
      setChat((prev) => [
        ...prev,
        { sender: "bot", message: "❌ Bot se jawab nahi mila." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-primary via-white to-primary flex flex-col items-center justify-center py-12 px-4">
      {/* Floating Header */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className=" bg-white/70 backdrop-blur-lg shadow-lg border border-indigo-100 px-6 py-3 rounded-full flex items-center gap-3 z-50"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="p-2 bg-indigo-600 text-white rounded-full shadow-lg"
        >
          <Bot className="w-5 h-5" />
        </motion.div>
        <div className="text-left">
          <h1 className="text-sm font-semibold text-indigo-700">{title}</h1>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </motion.div>

      {/* Chat Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-indigo-100 mt-10 overflow-hidden"
      >
        <div className="h-[480px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white via-indigo-50/40 to-white">
          {chat.map((entry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                entry.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow-sm ${
                  entry.sender === "user"
                    ? "bg-indigo-600 text-white rounded-br-none shadow-indigo-200"
                    : "bg-gray-100 text-gray-800 rounded-bl-none shadow-gray-200"
                }`}
              >
                <span className="block mb-1 text-xs opacity-70 font-semibold">
                  {entry.sender === "user" ? "You" : "AI"}
                </span>
                <p>{entry.message}</p>
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-gray-500 italic text-sm"
            >
              <Loader2 className="animate-spin w-4 h-4" /> Typing...
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-2 border-t border-gray-200 bg-white/70 p-4 backdrop-blur-sm">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus:ring-2 focus:border-primary outline-none text-sm"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-primary hover:bg-secondary text-white p-2 rounded-full transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send size={18} />}
          </button>
        </div>
      </motion.div>
    </section>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPaperPlane, FaRobot } from "react-icons/fa";
import { sendAIMessage } from "../../services/api";

function AIChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I can help you interpret your sales data, growth trends, and next actions." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await sendAIMessage(input);
      const aiMessage = {
        sender: "ai",
        text: result.answer || "Sorry, the assistant did not return a response."
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const aiMessage = {
        sender: "ai",
        text: "The AI service is temporarily unavailable. Please try again in a moment."
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            className="flex h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-blue-50 p-2 text-blue-600">
                  <FaRobot />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">AI assistant</h3>
                  <p className="text-sm text-slate-500">Ask about revenue, products, regions, and strategy.</p>
                </div>
              </div>
              <button onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Close assistant">
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-[22px] px-4 py-3 text-sm leading-6 ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-white text-slate-700 shadow-sm"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-[22px] bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                    AI is drafting a response...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>

            <div className="border-t border-slate-200 bg-white p-4">
              <div className="flex gap-2">
                <textarea
                  className="min-h-[44px] flex-1 resize-none rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-400"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your data..."
                  onKeyDown={handleEnterPress}
                  rows={1}
                />
                <button onClick={sendMessage} className="rounded-[18px] bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700" aria-label="Send message">
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AIChatModal;

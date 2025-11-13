import React, { useState } from "react";
import { motion } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";

const AISummarize: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! I can summarize your content. Paste a link or text below." },
  ]);
  const [loading, setLoading] = useState(false);
  const handleSend = async () => {
  if (!input.trim()) return; // prevent empty messages

  setMessages((prev) => [...prev, { role: "user", content: input }]);
  setInput("");
  setLoading(true);

  try {
    // Add user's message first
  // setMessages((prev) => [...prev, { role: "user", content: input }]);
  // setInput("");
  // setLoading(true);
    const response = await fetch("https://second-brain-backend-0p4j.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,         // must exist
        history: messages,            // optional; can include previous conversation
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Server error: ${text}`);
    }

    const data = await response.json();
    // console.log("AI Reply:", data.reply);
     // Append AI reply
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply || "No reply from AI." },
    ]);
    
    // update state to display AI reply
  


  // const handleSend = async () => {
  //   if (!input.trim()) return;

  //   const userMessage = { role: "user", content: input };
  //   setMessages((prev) => [...prev, userMessage]);
  //   setInput("");
  //   setLoading(true);

  //   try {
  //     const response = await fetch("http://localhost:5000/api/v1/ai/chat", {
  //       // ⚠️ Change this URL if your backend runs elsewhere
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ text: input }),
  //     });

  //     const data = await response.json();
  //     const aiMessage = {
  //       role: "assistant",
  //       content: data.summary || "Sorry, I couldn’t summarize that.",
  //     };

  //     setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Summarizer Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error connecting to AI service." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0b1221] px-4">
      <div className="bg-[#111a2b] p-8 rounded-3xl shadow-2xl w-full max-w-3xl text-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-[#a58bff]">AI Summarizer</h2>

        <div className="space-y-4 mb-4 max-h-[60vh] overflow-y-auto pr-2">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-2xl max-w-[85%] ${
                msg.role === "assistant"
                  ? "bg-[#1f2a44] self-start text-gray-100"
                  : "bg-[#6a5acd] self-end text-white ml-auto"
              }`}
            >
              {msg.content}
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 text-sm italic"
            >
              AI is thinking...
            </motion.div>
          )}
        </div>

        <div className="flex items-center bg-[#1a2236] rounded-full px-4 py-2 shadow-inner">
          <input
            type="text"
            placeholder="Enter text or link to summarize..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-gray-200 placeholder-gray-500 text-base"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="ml-2 text-[#a58bff] hover:text-[#c4b4ff] transition-colors"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISummarize;

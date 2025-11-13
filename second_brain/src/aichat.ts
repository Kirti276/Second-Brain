import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log("Gemini API Key Loaded:", !!GEMINI_API_KEY);

if (!GEMINI_API_KEY) {
  throw new Error("❌ Missing GEMINI_API_KEY. Please add it to your .env file.");
}

// Gemini model endpoint
const GEMINI_MODEL = "gemini-2.0-flash"; // You can use "gemini-1.5-pro" if you have access

router.post("/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Combine previous conversation for context
    const conversationContext = (history || [])
      .map((h: any) => `${h.role}: ${h.content}`)
      .join("\n");

    const inputText = conversationContext
      ? `${conversationContext}\nuser: ${message}\nassistant:`
      : `user: ${message}\nassistant:`;

    // ✅ Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: inputText }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return res.status(response.status).json({
        error: "Gemini API request failed.",
        details: data,
      });
    }

    // Extract the generated text safely
    let reply = "No response generated.";

const candidates = (data as any)?.candidates;
if (Array.isArray(candidates) && candidates[0]?.content?.parts?.[0]?.text) {
  reply = candidates[0].content.parts[0].text;
} else if (typeof (data as any)?.generated_text === "string") {
  reply = (data as any).generated_text;
}

reply = reply.trim();

    res.json({ reply: reply.trim() });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({
      error: "Chat request failed.",
      details: error.message,
    });
  }
});

export default router;


// src/utils/chatbot.ts
export async function sendChatMessage(
  message: string,
  history: { role: string; content: string }[] = []
) {
  const response = await fetch("http://localhost:3000/api/ai/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    throw new Error("Chat request failed");
  }

  const data = await response.json();
  return data.reply;
}

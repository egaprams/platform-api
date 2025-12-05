import { askGemini } from "../services/gemini.service.js";

export async function chatWithBot(req, res) {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = await askGemini(message);

    // Kirim response dengan format konsisten
    res.status(200).json({ reply });
  } catch (err) {
    console.error("[ChatController] Error:", err);
    res.status(500).json({
      error: "Failed to generate reply from Gemini",
      details: err.message,
    });
  }
}

import { GoogleGenAI } from "@google/genai"; 
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

let client = null;

if (!apiKey) {
  console.warn("[Gemini] GEMINI_API_KEY tidak ditemukan di .env");
} else {
  client = new GoogleGenAI({ apiKey });
}

export async function askGemini(message, modelName = "models/gemini-2.5-flash") {
  if (!client) throw new Error("Gemini API key belum diset di .env");

  try {
    const result = await client.models.generateContent({
      model: modelName,
      contents: message, // langsung string
    });

    return result.text ?? ""; // ambil teks output
  } catch (err) {
    console.error("[Gemini] Error generateContent:", err);
    throw new Error("Failed to generate reply from Gemini");
  }
}

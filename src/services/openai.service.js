import OpenAI from "openai";

// Inisialisasi client hanya jika API key tersedia,
// supaya server tidak langsung crash saat start.
// Cek beberapa nama env var umum: OPENAI_KEY dan OPENAI_API_KEY
const apiKey = process.env.OPENAI_KEY || process.env.OPENAI_API_KEY;

let client = null;
if (!apiKey) {
  console.warn(
    "[OpenAI] OPENAI_KEY / OPENAI_API_KEY tidak ditemukan di environment. Endpoint /api/chat akan mengembalikan error sampai key di-set."
  );
} else {
  client = new OpenAI({ apiKey });
}

export async function askGPT(message) {
  if (!client) {
    throw new Error(
      "OpenAI API key tidak terkonfigurasi. Set env OPENAI_KEY di file .env atau environment."
    );
  }

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: message }],
  });

  return response.choices[0].message.content;
}
